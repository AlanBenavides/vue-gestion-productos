<template>
  <article class="item">
    <h4>{{ category.nombre_cat }}</h4>
    <div class="item-icons">
      <Modal
        title="Actualizar categoría"
        image="edit"
        :idModal="`${category.nombre_cat}-${category.cod_cat}`"
      >
        <Form
          @get-categories="$emit('get-categories')"
          :idModal="`${category.nombre_cat}-${category.cod_cat}`"
          :nombre_cat="category.nombre_cat"
          :cod_cat="category.cod_cat"
        />
      </Modal>
      <img
        src="@/assets/trash-solid.svg"
        height="20px"
        @click="handlerDeleteCategory()"
      />
    </div>
  </article>
</template>

<script>
import Form from "@/components/product-category/Form.vue";
import Modal from "@/components/Modal.vue";

export default {
  name: "categoryItem",
  props: ["category"],
  components: {
    Form,
    Modal,
  },
  methods: {
    async handlerDeleteCategory() {
      const containElements = (await this.getProductByCategory()).length == 0;
      if (containElements) {
        if (confirm("¿Seguro que quiere eliminar esta categoría?")) {
          await this.$http.delete(`categories/${this.category.cod_cat}`);
          this.$emit("get-categories");
        }
      } else
        alert(
          "Esta categoría tiene productos asignados, elimine o edite los productos para poder borrar satisfactoriamente la categoría"
        );
    },
    async getProductByCategory() {
      const response = await this.$http.get(
        `products?criterio=nombre_prod&categoria=${this.category.nombre_cat}&page=1&limit=1`
      );
      return response.data.results;
    },
  },
};
</script>

<style scoped>
.item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid #777;
  border-radius: 12px;
  margin: 1rem;
}

.item h4 {
  margin: 0;
  margin-left: 3rem;
  margin-bottom: 0.5rem;
  margin-top: 0.5rem;
}

.item-icons {
  display: flex;
  align-items: center;
}

.item-icons img {
  margin-right: 2rem;
  margin-left: 3rem;
}
</style>

// this.$emit("sendimages", this.image64); // @sendimages="passImages($event)"
