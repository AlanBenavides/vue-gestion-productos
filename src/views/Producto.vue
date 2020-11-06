<template>
  <section class="producto">
    <h1 class="producto_tittle">{{ product.datos[0].nombre_prod }}:</h1>
    <Galeria
      class="producto_galeria"
      :name="product.datos[0].nombre_prod"
      :imagenes="images"
    />
    <Datos class="producto_datos" :datos="product.datos[0]" />
  </section>
</template>

<script>
import Datos from "@/components/VistaProducto/Datos.vue";
import Galeria from "@/components/VistaProducto/Galeria.vue";

export default {
  name: "Producto",
  components: {
    Datos,
    Galeria,
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
      images: [1],
    };
  },
  mounted: async function () {
    const response1 = await this.$http.get(
      `/products/${this.$route.params.id}`
    );
    const response2 = await this.$http.get(
      `/images/${this.$route.params.id}?cantidad=1`
    );
    this.product = response1.data;
    this.images = response2.data.datos;
    this.convertToBase64();
  },
  methods: {
    convertToBase64() {
      this.images = this.images.map(
        (imagen) => `data:image/[jpg/png];base64,${imagen.imagen}`
      );
    },
  },
};
</script>

<style scoped>
.producto {
  display: grid;
  grid-template-rows: 50px auto;
  grid-template-columns: 60% 40%;
  gap: 1rem;
  margin: 3rem 6rem;
  margin-top: 0;
}

.producto_tittle {
  grid-column: 2/3;
  grid-row: 1/2;
  text-align: left;
  color: var(--font-color-secondary);
  font-weight: 700;
  font-size: 2rem;
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
}

.producto_datos {
  grid-column: 2/3;
  grid-row: 2/3;
}

.producto_galeria {
  grid-column: 1/2;
  grid-row: 2/3;
}
</style>
