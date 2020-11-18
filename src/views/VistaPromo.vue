<template>
  <div>
   
    <section class="producto">
     <h1 class="producto_tittle">{{ promos.datos[0].nombr_prom }}:</h1>

      <Datos class="producto_datos" :datos="promos.datos[0]" />

    </section>
    <section>
    <div class="abajo">
    <h2>Lista de productos:</h2>
    </div>
    </section>
  </div>
</template>

<script>
import Datos from "@/components/vistaPromo/Datos.vue";

//import Galeria from "@/components/RegistroDescuento/Galeria.vue";
export default {
  name: "VistaPromo",
  components: {
   Datos,
    //Galeria,
  },
  data: function () {
    return {
      promos: {
        datos: [
          {
          
            nombr_prom:""
          },
        ],
      },
    //  images: [1],
    };
  },
  mounted: async function () {
    const response1 = await this.$http.get(
      `/promotions/${this.$route.params.id}`
    );
    this.promos = response1.data;
    //'/promotions/:id',
   /* const response2 = await this.$http.get(
      `/images/${this.$route.params.id}?cantidad=1`
    );
    this.product = response1.data;
    this.images = response2.data.datos;
    this.convertToBase64();*/
  },
  methods: {
    /*convertToBase64() {
      this.images = this.images.map(
        (imagen) => `data:image/[jpg/png];base64,${imagen.imagen}`
      );
    },*/
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

/*.producto_galeria {
  grid-column: 1/2;
  grid-row: 2/3;
}*/
.abajo{
   
    text-align: left;
  color: var(--font-color-secondary);
  font-weight: 700;
  font-size: 1.5rem;
  display: block;
  text-overflow: ellipsis;
}
</style>
