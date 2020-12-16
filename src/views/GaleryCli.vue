<template>
  <section>
    <h1 class="admin_productos-title">Galeria de la Tienda</h1>
    <div class="admin_productos-container">
      <Short class="admin_productos-products" />
    </div>
  </section>
</template>

<script>
import Short from "@/components/galeriaCli/Short.vue";
export default {
  name: "GaleryCli",
  components: {
    Short,
  },
};
</script>

<style scoped>
.admin_productos-container {
  grid-template-columns: 270px 1fr;
}

.admin_productos-title {
  font-size: 2rem;
  font-weight: 600;
  color: #42b883;
  margin-bottom: 1rem;
}
</style>
