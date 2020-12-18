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
      <button :disabled="canEditProducts" class="button" @click="editProduct">
        Editar producto
      </button>

      <button :disabled="canAddToProm" class="button" @click="hayCantidad">
        Aplicar descuento
      </button>
      <button
        class="button"
        :disabled="!isProduct"
        @click="handlerConfirmProductDeletion()"
      >
        Eliminar Producto
      </button>
      <button
        class="button"
        :disabled="canDeleteProm"
        @click="handlerConfirmPromotionDeletion()"
      >
        Eliminar Promocion
      </button>
      <router-link to="/product-category" class="button" tag="button">
        Administrar categorías
      </router-link>
    </ul>
    <Alert ref="alert"></Alert>
    <Confirm
      ref="confirm"
      @taken-decision="executeAction($event, eliminarProm)"
    ></Confirm>
    <Confirm
      ref="confirm1"
      @taken-decision="executeAction($event, deleteProduct)"
    ></Confirm>
  </aside>
</template>

<script>
import Alert from "@/components/Alert.vue";
import Confirm from "@/components/Confirm.vue";

export default {
  name: "Options",
  props: ["itemtype"],
  components: { Alert, Confirm },
  data: function () {
    return {
      buttons: [
        {
          name: "Editar producto",
        },
        {
          name: "Crear promocion",
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
    canEditProducts() {
      if (this.$store.state.idSelected[0] == -1) return true;
      else if (this.itemtype == "promotions") return true;
      return this.$store.state.idSelected[1] == true;
    },
    canDeleteProm() {
      if (
        this.$store.state.idSelected[0] == -1 &&
        this.itemtype === "promotions"
      )
        return true;
      else if (this.itemtype === "products") return true;
      return false;
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
        this.alert("warning", "Seleccione un producto");
      }
    },
    async editProduct() {
      const id = this.$store.state.idSelected[0];

      if (id != -1) {
        this.$router.push(`/editar_producto/${id}`);
      } else {
        alert("Seleccione un producto");
      }
    },
    handlerConfirmPromotionDeletion() {
      const idprom = this.$store.state.idSelected[0];

      if (idprom != -1) {
        this.confirm(
          "Esta seguro que desea eliminar esta promocion",
          "confirm"
        );
      } else {
        this.alert("warning", "Seleccione una promocion");
      }
    },
    async eliminarProm() {
      const idprom = this.$store.state.idSelected[0];
      await this.$http.delete(`promotions/${idprom}`);
      this.alert("success", "La promocion fue eliminada");
      this.$emit("reload-page");
    },
    async obtenerCantidad(id) {
      const response = await this.$http.get(`products/${id}`);
      return response.data.datos[0].cantidad;
    },
    async handlerConfirmProductDeletion() {
      const idProduct = this.$store.state.idSelected[0];
      const promotions = await this.getPromotions(idProduct);
      const disconunt =
        (await this.getDiscount(idProduct)).length != 0 ? true : false;
      const promotionMessage =
        promotions.length != 0 ? this.renderPromotions(promotions) : "";

      this.confirm(
        this.getFormatedMessage(disconunt, promotionMessage),
        "confirm1"
      );
    },
    async deleteProduct() {
      const idProduct = this.$store.state.idSelected[0];
      await this.$http.delete(`products/${idProduct}`);
      this.alert("success", "El producto fue eliminado");
      this.$emit("reload-page");
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
    alert(alertType, alertMessage) {
      this.$refs.alert.showAlert(alertType, alertMessage);
    },
    confirm(confirmMessage, confirmRefId) {
      this.$refs[confirmRefId].showConfirm(confirmMessage);
    },
    executeAction(takenDecision, functionToExecute) {
      if (takenDecision) {
        functionToExecute();
      } else {
        this.alert("success", "se cancelo la eliminacion");
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
  border: 1px solid var(--color-border);
  border-radius: var(--border-radius);
  width: 230px;
  padding: 16px;
  margin: 1rem;
}
</style>
