<template>
  <div class="registro">
    <h1 class="registro_tittle">Registro de Producto</h1>
    <!-- imagenes -->
    <div class="registro_container">
      <section class="registro_image"></section>
      <Formulario class="registro_form" />
    </div>
  </div>
</template>

<script>
import Formulario from "@/components/Formulario.vue";
export default {
  name: "RegistroProducto",
  components: {
    Formulario,
  },
};
</script>

<style scoped>
.registro {
  margin: 2rem;
  margin-top: 0;
}

.registro_tittle {
}

.registro_container {
  display: grid;
  grid-template-columns: 1fr 0.7fr;
  gap: 2rem;
}

.registro_form {
  grid-column: 2 / 3;
}

.registro_image {
  grid-column: 1 / 2;
}
</style>
