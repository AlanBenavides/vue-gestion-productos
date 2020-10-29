<template>
  <aside>
    <ul class="options btn-group-vertical">
      <button
        v-for="(button, index) in buttons"
        :key="index"
        class="button"
        :disabled="index !== 0 && $store.state.idSelected === -1"
      >
        {{ button.name }}
      </button>
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
          name: "Registrar producto",
        },
        {
          name: "Aplicar descuento",
        },
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
};
</script>

<style scoped>
ul {
  padding: 0;
  position: fixed;
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
