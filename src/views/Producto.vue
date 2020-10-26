<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-6">
        <Galeria />
      </div>
      <div class="col-6">
        <Datos />
      </div>
    </div>
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

<style scoped></style>
