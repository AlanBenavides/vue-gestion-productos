<template>
  <div class="registro">
    <h1 class="registro_tittle">Registro de Producto</h1>
    {{ images }}
    <div class="registro_container">
      <FormImage @sendimages="passImages($event)" />
      <Formulario class="registro_form" :images="images" />
    </div>
  </div>
</template>

<script>
import Formulario from "@/components/Formulario.vue";
import FormImage from "@/components/FormImage.vue";

export default {
  name: "RegistroProducto",
  components: {
    Formulario,
    FormImage,
  },
  data: function () {
    return {
      images: [],
    };
  },
  methods: {
    passImages(images) {
      this.images = images;
      console.log(this.images);
    },
  },
};
</script>

<style scoped>
.registro {
  margin: 2rem;
  margin-top: 0;
}

.registro_tittle {
  color: #8d8d8d;
  font-weight: 600;
}

.registro_container {
  display: grid;
  grid-template-columns: 1fr 0.6fr;
  gap: 2rem;
}

.registro_form {
  grid-column: 2 / 3;
}

.registro_image {
  grid-column: 1 / 2;
}
</style>
