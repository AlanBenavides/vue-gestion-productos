<template>
  <aside>
    <ul class="options btn-group-vertical">
      <router-link to="/registro_producto" class="button"
        >Registro de Producto
      </router-link>

      <button
        :disabled="$store.state.idSelected === -1"
        class="button"
        @click="hayCantidad"
      >
        Aplicar descuento
      </button>
      <button
        v-for="(button, index) in buttons"
        :key="index"
        class="button"
        :disabled="$store.state.idSelected === -1"
      >
        {{ button.name }}
      </button>
    </ul>
  </aside>
</template>

<script>
export default {
  name: "Options",
  props: ["id_product"],
  data: function () {
    return {
      buttons: [
        {
          name: "Editar producto",
        },
        {
          name: "Añadir a promocion",
        },
        {
          name: "Eliminar producto",
        },
      ],
    };
  },
  methods: {
    async hayCantidad() {
      const id = this.$store.state.idSelected;
      const cantidad = await this.obtenerCantidad(id);
      if (cantidad) {
        this.$router.push(`/descuento_producto/${id}`);
      } else {
        alert("No se puede aplicar un descuento a este producto.");
      }
    },
    async obtenerCantidad(id) {
      const response = await this.$http.get(`products/${id}`);
      return response.data.datos[0].cantidad;
    },
  },
  mounted:function(){
     this.$store.commit("changeSelection", -1);



  }
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
