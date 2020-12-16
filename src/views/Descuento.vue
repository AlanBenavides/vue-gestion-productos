<template>
  <div>
    <h1 class="disconut-titulo">Registro de descuento</h1>
    <section class="producto">
      <Galeria
        class="discount_galery"
        :name="product.datos[0].nombre_prod"
        :imagenes="images"
      />
      <Datos class="discount-data" :datos="product.datos[0]" />
    </section>
  </div>
</template>

<script>
import Datos from "@/components/RegistroDescuento/Datos.vue";
import Galeria from "@/components/RegistroDescuento/Galeria.vue";
export default {
  name: "Descuento",
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
            cantidad: "",
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
  grid-template-rows: auto auto;
  grid-template-columns: 50% 50%;

  margin: 3rem 6rem;
  margin-top: 0;
  word-wrap: break-word;
}
.disconut-titulo {
  text-align: center;
  color: var(--color-title);
  font-weight: 600;
  font-size: 2rem;
  margin-bottom: 2rem;
}
.discount-data {
  grid-column: 2/3;
  grid-row: 2/3;
}
.discount_galery {
  grid-column: 1/2;
  grid-row: 2/3;
}
</style>
