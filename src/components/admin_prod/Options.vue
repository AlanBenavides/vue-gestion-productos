<template>
  <aside>
    <ul class="options btn-group-vertical">
      <router-link to="/registro_producto" class="button" tag="button"
        >Registro de Producto
      </router-link>
      <router-link
        v-if="itemtype == 'promotions'"
        to="/editar_promocion"
        class="button"
        tag="button"
        :disabled="$store.state.idSelected[0] == -1"
      >
        Editar promoción
      </router-link>
      <router-link
        v-if="itemtype == 'products'"
        to="/registro_promocion"
        class="button"
        tag="button"
        :disabled="canAddToProm"
      >
        {{ buttons[1].name }}
      </router-link>
      <router-link
        to=""
        class="button"
        tag="button"
        :disabled="$store.state.idSelected[0] == -1"
      >
        {{ buttons[0].name }}
      </router-link>
      <button :disabled="canAddToProm" class="button" @click="hayCantidad">
        Aplicar descuento
      </button>
      <button class="button" :disabled="!isProduct" @click="handlerDelete()">
        Eliminar Producto
      </button>
      <button class="button" :disabled="canDeleteProm" @click="eliminarProm">
        Eliminar Promocion
      </button>
      <router-link to="/product-category" class="button" tag="button">
        Administrar categorías
      </router-link>
    </ul>
  </aside>
</template>

<script>
export default {
  name: "Options",
  props: ["itemtype"],
  data: function () {
    return {
      buttons: [
        {
          name: "Editar producto",
        },
        {
          name: "Añadir a promocion",
        },
      ],
    };
  },
  mounted: function () {
    this.$store.commit("changeSelection", [-1, 0]);
  },
  computed: {
    canAddToProm() {
      if (this.$store.state.idSelected[0] == -1) return false;
      else if (this.itemtype == "promotions") return true;
      return this.$store.state.idSelected[1] == null;
    },
    canDeleteProm() {
      if (this.$store.state.idSelected[0] == -1) return true;
      else if (this.tipo == "products") return true;
      return this.$store.state.idSelected[1] == null;
    },
    isProduct() {
      if (this.$store.state.idSelected[0] != -1 && this.itemtype === "products")
        return true;
      return false;
    },
  },
  methods: {
    async hayCantidad() {
      const id = this.$store.state.idSelected[0];

      if (id != -1) {
        this.$router.push(`/descuento_producto/${id}`);
      } else {
        alert("Seleccione un producto");
      }
    },
    async eliminarProm() {
      const idprom = this.$store.state.idSelected[0];

      if (idprom != -1) {
        var opcion = confirm("Esta seguro que desea eliminar esta promocion");
        if (opcion == true) {
          await this.$http.delete(`promotions/${idprom}`);
          alert("La promocion fue eliminada");
        } else {
          alert("Se Cancelo la eliminacion");
        }
      } else {
        alert("Seleccione una promocion");
      }
    },
    async obtenerCantidad(id) {
      const response = await this.$http.get(`products/${id}`);
      return response.data.datos[0].cantidad;
    },
    async handlerDelete() {
      const idProduct = this.$store.state.idSelected[0];
      const promotions = await this.getPromotions(idProduct);
      const disconunt =
        (await this.getDiscount(idProduct)).length != 0 ? true : false;
      const promotionMessage =
        promotions.length != 0 ? this.renderPromotions(promotions) : "";
      if (confirm(this.getFormatedMessage(disconunt, promotionMessage))) {
        await this.deleteProduct(idProduct);
        this.$emit("reload-page");
      }
    },
    async deleteProduct(idProduct) {
      await this.$http.delete(`products/${idProduct}`);
    },
    async getDiscount(idProduct) {
      return (await this.$http.get(`discounts/${idProduct}`)).data.datos;
    },
    async getPromotions(idProduct) {
      return (await this.$http.get(`products/promotions/${idProduct}`)).data
        .datos;
    },
    renderPromotions(promotions) {
      return promotions.reduce(
        (acc, promotions) => `${acc} ${promotions.nombr_prom}`,
        ""
      );
    },
    getFormatedMessage(disconunt, promotionMessage) {
      const message = "¿Estas seguro de quieres eliminarlo?";
      if (disconunt && promotionMessage)
        return `Este producto tiene registrado un descuento y esta en las promociones de${promotionMessage}. ${message}`;
      else {
        if (disconunt) return `Este producto tiene un descuento. ${message}`;
        else if (promotionMessage)
          return `Este producto tiene registrado las promociones de${promotionMessage}. ${message}`;
        else return message;
      }
    },
  },
};
</script>

<style scoped>
ul {
  padding: 0;
  position: fixed;
  top: 50%;
  transform: translate(0, -50%);
  left: 0;
}

div {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

.button {
  text-transform: uppercase;
  font-size: 14px;
  background: none;
  border: 1.4px solid grey;
  border-radius: 5px;
  width: 230px;
  padding: 16px;
  margin: 1rem;
}
</style>
