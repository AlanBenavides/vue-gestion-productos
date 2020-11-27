<template>
  <section class="producto">
    <h1 class="producto_tittle">{{ product.datos[0].nombre_prod }}:</h1>
    <Galeria
      class="producto_galeria"
      :name="product.datos[0].nombre_prod"
      :imagenes="images"
    />
    <Datos class="producto_datos" :datos="product.datos[0]" />
    <span v-if="discount.length!=0" class="producto_disc">
      <Descuentos class="producto_disc" :disc="discount" />
    </span>
    <span v-if="promos.length>=1" class="producto_promolist">
      <Promos class="producto_promolist" :proms="promos"/>
    </span>
    
  </section>
</template>

<script>
import Datos from "@/components/VistaProducto/Datos.vue";
import Galeria from "@/components/VistaProducto/Galeria.vue";
import Descuentos from "@/components/VistaProducto/Descuentos.vue";
import Promos from "@/components/VistaProducto/Promos.vue";

export default {
  name: "Producto",
  components: {
    Datos,
    Galeria,
    Promos,
    Descuentos
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
      discount: [1],
      promos: [1],
    };
  },
  mounted: async function () {
    const response1 = await this.$http.get(
      `/products/${this.$route.params.id}`
    );
    const response2 = await this.$http.get(
      `/images/${this.$route.params.id}?cantidad=1`
    );
    const response3 = await this.$http.get(
      `/discounts/${this.$route.params.id}`
    );
    const response4 = await this.$http.get(
      `/products/promotions/${this.$route.params.id}`
    );

    this.product = response1.data;
    this.images = response2.data.datos;
    this.convertToBase64();
    this.discount = response3.data.datos;
    this.promos = response4.data.datos;
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

.producto_galeria {
  grid-column: 1/2;
  grid-row: 2/3;
}

.producto_promolist {
  grid-column:1/3;
  grid-row: 4/3;
}
.producto_disc {
  grid-column:1/3;
  grid-row: 3/3;
}

</style>
