<template>
  <div>
    <h1 class="edit-prom-title">Editar Promoción</h1>
    <h2 class="left">Paquete de productos:</h2>
    <ProductList></ProductList>
    <div class="formulario_check-error-center" v-if="isMoreThanTwo">
      Seleccione 2 productos como mínimo
    </div>
    <div>
      <ImageAdd class="inline-elem" @send-image="passImage($event)"></ImageAdd>
      <Form class="inline-elem" :image="imagen"></Form>
    </div>
  </div>
</template>
<script>
import Form from "@/components/editPromocion/Form.vue";
import ProductList from "@/components/editPromocion/ProductList.vue";
import ImageAdd from "@/components/editPromocion/ImageAdd.vue";

export default {
  name: "EdicionPromocion",
  components: { Form, ProductList, ImageAdd },
  data() {
    return {
      imagen: "",
    };
  },
  methods: {
    passImage(newImage) {
      this.imagen = newImage;
    },
  },
  computed: {
    isMoreThanTwo() {
      return Object.keys(this.$store.state.groupIDselected).length < 2;
    },
  },
  destroyed() {
    this.$store.commit("updateGroup", {});
  },
};
</script>
<style scoped>
.inline-elem {
  display: inline-block;
  vertical-align: top;
}

.left {
  padding-left: 2%;
  text-align: left;
}

.edit-prom-title {
  color: var(--color-title);
  font-weight: 600;
  font-size: 2rem;
}
</style>
