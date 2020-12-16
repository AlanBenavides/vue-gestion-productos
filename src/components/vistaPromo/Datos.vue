<template>
  <section class="datos">
    <div class="datos_container">
      <p class="datos_info">
        Precio:
        <span class="datos_resaltados datos_resaltados-block datos_precio"
          >{{ datos.precio_prom }}Bs.</span
        >
      </p>
      <p class="datos_info">
        Cantidad:
        {{ datos.cantidad_prom }}
        <span class="datos_resaltados"> paquete(s)</span>
      </p>
      <p class="datos_info">
        Valido Hasta:
        <span class="datos_resaltados">{{
          transformDate(datos.fecha_fin)
        }}</span>
      </p>
      <p class="datos_info">Descripcion:</p>
      <p class="datos_info datos_descripcion">
        {{ datos.descrip_prom }}
      </p>
      <div>
        <button class="formulario_button">Añadir al carrito</button>
      </div>
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
    transformDate(value) {
      const date = new Date(value);
      return `${date.getDate() + 1}/${
        date.getMonth() + 1
      }/${date.getFullYear()}`;
    },
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
  border-radius: var(--border-radius);
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
  background-color: var(--background);
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
  background-color: var(--color-btn);
  padding: 13px 100px;
  color: white;
  font-size: 20px;
  font-weight: 700;
}
</style>
