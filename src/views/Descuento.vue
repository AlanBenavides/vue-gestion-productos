<template>
  <section class="producto">
    <h1 class="producto_tittle">{{ product.datos[0].nombre_prod }}:</h1>
    
    <Datos class="producto_datos" :datos="product.datos[0]" />
  </section>
</template>

<script>
import Datos from "@/components/RegistroDescuento/Datos.vue";


export default {
  name: "Descuento",
  components: {
    Datos,
    
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
      
    };
  },
  mounted: async function () {
    const response2 = await this.$http.get(
      `/products/${this.$route.params.id}`
    );
    
    this.product = response2.data;
    console.log(this.product);
    
  },
  methods: {
    
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
</style>