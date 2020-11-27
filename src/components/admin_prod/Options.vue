<template>
  <aside>
    <ul class="options btn-group-vertical">
      <router-link to="/registro_producto" class="button" tag="button"
        >Registro de Producto
      </router-link>
      <router-link
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
      <router-link
        to=""
        class="button"
        tag="button"
        :disabled="this.$store.state.idSelected[0] == -1"
      >
        {{ buttons[2].name }}
      </router-link>
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
          name: "Crear promocion",
        },
        {
          name: "Eliminar",
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
      return this.$store.state.idSelected[1] == null;
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
    async obtenerCantidad(id) {
      const response = await this.$http.get(`products/${id}`);
      return response.data.datos[0].cantidad;
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
