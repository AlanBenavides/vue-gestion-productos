<template>
  <aside>
    <ul class="options btn-group-vertical">
      <button
        v-for="(button, index) in buttons"
        :key="index"
        class="button"
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
          name: "Aplicar descuento",
        },
        {
          name: "Editar producto",
        },
        {
          name: "Añadir a promociones",
        },
        {
          name: "Eliminar productos",
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
