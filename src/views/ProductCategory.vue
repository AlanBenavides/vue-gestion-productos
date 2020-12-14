<template>
  <section class="category">
    <div class="category-header">
      <h1 class="category-title">Categorías</h1>
      <Modal
        title="Crear categoría"
        image="plus"
        idModal="createCategory-modal"
      >
        <Form
          @get-categories="getCategories()"
          nameCategory=""
          idModal="createCategory-modal"
        />
      </Modal>
    </div>
    <hr />
    <div>
      <Item
        v-for="value of categories"
        :key="value.cod_cat"
        :category="value"
        @get-categories="getCategories()"
      />
    </div>
  </section>
</template>

<script>
import Form from "@/components/product-category/Form.vue";
import Item from "@/components/product-category/Item.vue";
import Modal from "@/components/Modal.vue";

export default {
  name: "ProductCategory",
  components: {
    Form,
    Modal,
    Item,
  },
  data: function () {
    return {
      categories: [],
    };
  },
  mounted: async function () {
    await this.getCategories();
  },
  methods: {
    async getCategories() {
      this.categories = (await this.$http.get("categories")).data;
    },
  },
};
</script>

<style scoped>
.category {
  margin: 2rem;
}

.category-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-right: 1rem;
}

.category-title {
  color: var(--color-title);
  font-size: 2rem;
  font-weight: 600;
}
</style>
