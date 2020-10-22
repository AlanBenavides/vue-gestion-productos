<template>
  <div id="product">
    <Galeria />
    <Datos />
  </div>
</template>

<script>
import Datos from "@/components/Datos.vue";
import Galeria from "@/components/Galeria.vue";

export default {
  name: "Producto",
  components: {
    Datos,
    Galeria,
  },
};
</script>

<style scoped>
*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.product {
  display: flex;
  justify-content: space-evenly;
}
</style>
