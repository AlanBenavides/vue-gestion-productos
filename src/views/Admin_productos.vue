<template>
  <section>
    <h1 class="admin_productos-title">Administración de productos</h1>
    <div class="admin_productos-container">
      <Options
        class="admin_productos-options"
        @reload-page="reloadPage()"
        :itemtype="itemTypeSelected"
      />
      <Short
        class="admin_productos-products"
        @itemtype="itemTypeSelected = $event"
      />
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
  data() {
    return {
      itemTypeSelected: "",
    };
  },
  methods: {
    reloadPage() {
      location.reload();
    },
  },
};
</script>

<style scoped>
.admin_productos-container {
  display: grid;
  grid-template-columns: 270px 1fr;
}

.admin_productos-title {
  font-size: 40px;
  font-weight: 700;
  color: #42b983;
  margin-bottom: 4rem;
}
</style>
