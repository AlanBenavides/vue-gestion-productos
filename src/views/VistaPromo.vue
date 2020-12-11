<template>
  <section class="producto">
    <Galeria class="producto_galeria" :imagenes="images" />
    <h1 class="producto_tittle">{{ promos.datos[0].nombr_prom }}:</h1>
    <Datos class="producto_datos" :datos="promos.datos[0]" />
    <Productos class="productolist_datos" :prods="products" />
  </section>
</template>

<script>
import Datos from "@/components/vistaPromo/Datos.vue";
import Productos from "@/components/vistaPromo/Productos.vue";
import Galeria from "@/components/vistaPromo/Galeria.vue";
export default {
  name: "VistaPromo",
  components: {
    Datos,
    Productos,
    Galeria,
  },
  props: ["idP"],
  data: function () {
    return {
      promos: {
        datos: [
          {
            nombr_prom: "",
          },
        ],
      },
      products: [1],
      images: [1],
    };
  },
  mounted: async function () {
    const idProm = this.$route.params.id || this.idP;
    const response1 = await this.$http.get(`/promotions/${idProm}`);
    this.promos = response1.data;
    const response3 = await this.$http.get(`/promotions/products/${idProm}`);
    this.products = response3.data.datos;
    const response2 = await this.$http.get(`/promotions/image/${idProm}`);
    this.images = response2.data.datos[0].imagen_prom;
    this.convertToBase64();
  },
  methods: {
    convertToBase64() {
      this.images = `data:image/[jpg/png];base64,${this.images}`;
    },
  },
};
</script>

<style scoped>
.producto {
  display: grid;
  grid-template-rows: auto auto;
  grid-template-columns: 60% 40%;
  gap: 1rem;
  margin: 3rem 6rem;
  margin-top: 0;
  word-wrap: break-word;
}

.producto_tittle {
  grid-column: 2/3;
  grid-row: 1/2;
  text-align: left;
  color: var(--font-color-secondary);
  font-weight: 700;
  font-size: 2rem;
  display: block;
  text-overflow: ellipsis;
}

.producto_datos {
  grid-column: 2/3;
  grid-row: 2/3;
}

.productolist_datos {
  grid-column: 1/3;
  grid-row: 3/3;
  background-color: var(--background);
  padding: 0.5rem 2rem;
  padding-bottom: 3rem;
  border-radius: var(--border-radius);
}

.producto_galeria {
  grid-column: 1/2;
  grid-row: 2/3;
}
</style>
