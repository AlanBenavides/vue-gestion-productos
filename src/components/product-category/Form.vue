<template>
  <form @submit.prevent="hadlerSubmit()" class="formcategory">
    <input
      class="formcategory-input"
      name="name-category"
      placeholder="Ingrese nombre de categoria"
      v-model="nombre"
      type="text"
      required
      maxlength="20"
      minlength="5"
      autocomplete="off"
    />
    <button class="formcategory-button">Confirmar</button>
  </form>
</template>

<script>
import { closeOneModal } from "@/services/bootstrap";

export default {
  name: "formCategory",
  props: ["nombre_cat", "idModal", "cod_cat"],
  data: function () {
    return {
      nombre: "",
    };
  },
  mounted: function () {
    this.nombre = this.nombre_cat;
  },
  methods: {
    async hadlerSubmit() {
      if (this.cod_cat) await this.updateCategory();
      else await this.createCategory();
      closeOneModal(this.idModal);
      this.$emit("get-categories");
    },
    async updateCategory() {
      await this.$http.put(`categories/${this.cod_cat}`, {
        nombre_cat: this.nombre,
      });
    },
    async createCategory() {
      await this.$http.post("categories", { nombre_cat: this.nombre });
    },
  },
};
</script>

<style scoped>
.formcategory {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.formcategory-input {
  width: 16rem;
  margin-bottom: 2rem;
  padding: 3px 10px;
  margin: 1.8rem 50px;
}

.formcategory-button {
  background: none;
  border-radius: 12px;
  border: 1px solid black;
  padding: 7px 60px;
  outline: none;
}
</style>
