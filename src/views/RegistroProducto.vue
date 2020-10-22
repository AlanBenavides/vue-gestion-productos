<template>
  <div>
    <Nav />
    <Formulario />
  </div>
</template>

<script>
import Formulario from "@/components/Formulario.vue";
import Nav from "@/components/Nav.vue";
export default {
  name: "RegistroProducto",
  components: {
    Formulario,
    Nav,
  },
};
</script>

<style scoped></style>
