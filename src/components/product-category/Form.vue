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
      minlength="4"
      autocomplete="off"
      pattern="^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$"
    />
    <button class="formcategory-button">Confirmar</button>
    <Alert ref="alert"></Alert>
  </form>
</template>

<script>
import { closeOneModal } from "@/services/bootstrap";
import Alert from "@/components/Alert.vue";

export default {
  name: "formCategory",
  props: ["nombre_cat", "idModal", "cod_cat"],
  components: {Alert},
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
      try {
        if (this.cod_cat) await this.updateCategory();
        else await this.createCategory();
        this.$emit("get-categories");
      } catch (error) {
        this.alert("warning",error);
      } finally {
        closeOneModal(this.idModal);
      }
    },
    async updateCategory() {
      try {
        await this.$http.put(`categories/${this.cod_cat}`, {
          nombre_cat: this.nombre,
        });
      } catch (error) {
        throw new Error("La categoria ya existe");
      }
    },
    async createCategory() {
      try {
        await this.$http.post("categories", { nombre_cat: this.nombre });
      } catch (error) {
        throw new Error("La categoria ya existe");
      }
    },
    alert(alertType, alertMessage){
      this.$refs.alert.showAlert(alertType, alertMessage);
    }
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
