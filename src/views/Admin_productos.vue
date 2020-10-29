<template>
  <section>
    <h1 class="admin_productos-title">Administración de productos</h1>
    <div class="admin_productos-container">
      <Options class="admin_productos-options" />
      <Short class="admin_productos-products" />
    </div>
  </section>
</template>

<script>
import Options from "@/components/admin_prod/Options.vue";
import Short from "@/components/admin_prod/Short.vue";

export default {
  name: "Admin_productos",
  components: {
    Options,
    Short,
  },
};
</script>

<style scoped>
.admin_productos-container {
  display: grid;
  grid-template-columns: 270px 1fr;
}

.admin_productos-title {
  font-size: 25px;
  font-weight: 700;
  color: var(--primary-color);
  margin-bottom: 4rem;
}
</style>
