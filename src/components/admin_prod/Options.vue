<template>
<<<<<<< HEAD
    <div class="options btn-group-vertical">
        <router-link type="button" class="btn btn-secondary" to="/about">REGISTRAR PRODUCTO</router-link>
        <router-link type="button" class="btn btn-secondary" to="/about">APLICAR DESCUENTO</router-link>
        <router-link type="button" class="btn btn-secondary" to="/about">EDITAR PRODUCTO</router-link>
        <router-link type="button" class="btn btn-secondary" to="/about">AÑADIR A PROMICIÓN</router-link>
        <router-link type="button" class="btn btn-secondary" to="/about">ELIMINAR PRODUCTO</router-link>
    </div>
=======
  <aside>
    <ul class="options btn-group-vertical">
      <button
        v-for="(button, index) in buttons"
        :key="index"
        type="button"
        class="button"
      >
        {{ button.name }}
      </button>
    </ul>
  </aside>
>>>>>>> 0df421b597a657d81bed7c2ddaffd34dac9b902d
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
<<<<<<< HEAD
    .options {
        padding-top: 100px;
        width: 25%;
        float: left;
    }
    .btn{
        margin: 20px 20px 20px 20px;
    }
</style>
=======
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
>>>>>>> 0df421b597a657d81bed7c2ddaffd34dac9b902d
