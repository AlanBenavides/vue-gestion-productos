<template>
  <div class="editar">
    <h1 class="edicion_tittle">Editar Producto</h1>

    <div class="edicion_container">
      <EditForm class="edicion_form"  :datos="product.datos[0]" />
      <EditImages @sendimages="passImages($event)" />
    </div>
  </div>
</template>

<script>
import EditForm from "@/components/edit_prod/EditForm.vue";
import EditImages from "@/components/edit_prod/EditImages.vue";

export default {
  name: "EditarProducto",
  components: {
    EditForm,
    EditImages
  },
  data: function () {
    return {
      product: {
        datos: [
          {
            nombre_prod: "",
          },
        ],
      },
      images: [],
    };
  },
  methods: {
    passImages(images) {
      this.images = images;
    },
  },
}
</script>

<style scoped>
.editar {
  margin: 2rem;
  margin-top: 0;
}

.edicion_tittle {
  color: #8d8d8d;
  font-weight: 600;
}

.edicion_container {
  display: grid;
  grid-template-columns: 1fr 0.6fr;
  gap: 2rem;
}

.edicion_form {
  grid-column: 2 / 3;
  grid-row:1/3;
}

.edicion_image {
  grid-column: 1 / 2;
  grid-row:1/3;
}
</style>
