<template>
  <section class="datos">
  
    <div class="datos_container">
    <form>
      <p class="datos_info">
        Precio Actual:
        <span class="datos_resaltados datos_resaltados-block datos_precio"
          >{{ datos.precio_unid }}Bs.</span
        >
      </p>
      <div>
        <p>Descuento en porcentaje:</p>
        <input type="number"/> %
        <p>Unidades a comprar:</p>
        <input type="number"/> 
      </div>
      <p>Precio con descuento:</p>
      <button class="formulario_button">
        Aplicar descuento
      </button>
      </form>
    </div>
  </section>
</template>

<script>
export default {
  name: "Datos",
  props: ["datos"],
  data: function () {
    return {};
  },
  methods: {
   
  },
};
</script>

<style scoped>
.datos {
  text-align: left;
  font-size: 1.1rem;
  font-weight: 700;
}

.datos_info {
  margin: 2rem;
  margin-left: 0;
}

.datos_container {
  background-color: var(--background);
  padding: 0.5rem 2rem;
  padding-bottom: 3rem;
  border-radius: 15px;
}

.datos_resaltados {
  color: var(--font-color-secondary);
  font-weight: 700;
}

.datos_resaltados-block {
  display: block;
}

.datos_both {
  display: inline;
}

.datos_descripcion {
  background-color: #e8eaf6;
  color: var(--color-btn);
  border: 2px solid var(--color-btn);
  padding: 5px 10px;
  height: 200px;
  max-width: 100%;
  overflow-y: auto;
  word-wrap: break-word;
}

.datos_precio {
  margin: 10px;
  margin-left: 0;
  font-size: 1.4rem;
}
.formulario_button {
  margin: auto;
  display: block;
  background-color: rgb(51, 51, 51);
  padding: 13px 100px;
  color: white;
  font-size: 20px;
  font-weight: 700;
}
</style>
