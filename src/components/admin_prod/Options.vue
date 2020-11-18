<template>
  <aside>
    <ul class="options btn-group-vertical">
      <router-link to="/registro_producto" class="button" tag="button"
        >Registro de Producto
      </router-link>
      <router-link to="" class="button" tag="button" :disabled="this.$store.state.idSelected[0] == -1">
            {{buttons[0].name}}
      </router-link>
      <router-link to="" class="button" tag="button" :disabled="this.$store.state.idSelected[0] == -1">
            {{buttons[1].name}}
      </router-link>
      <router-link to="/registro_promocion" class="button" tag="button" :disabled="canAddToProm">
            {{buttons[2].name}}
      </router-link>
      <router-link to="" class="button" tag="button" :disabled="this.$store.state.idSelected[0] == -1">
            {{buttons[3].name}}
      </router-link>
    </ul>
  </aside>
</template>

<script>
export default {
  name: "Options",
  data: function () {
    return {
      buttons: [
        {
          name: "Aplicar descuento",
        },
        {
          name: "Editar",
        },
        {
          name: "Añadir a promocion",
        },
        {
          name: "Eliminar",
        },
      ],
    };
  },
  computed: {
    canAddToProm(){
      if (this.$store.state.idSelected[0] == -1){
        return false;
      }

      return this.$store.state.idSelected[1] == null;
    }
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
