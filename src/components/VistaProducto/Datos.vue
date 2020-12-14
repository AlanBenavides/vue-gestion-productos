<template>
  <section class="datos">
    <div class="datos_container">
      <p v-if="datos.peso" class="datos_info">
        Precio por {{ datos.unidad_med.slice(0, datos.unidad_med.length - 1) }}:
        <span class="datos_unids datos_resaltados-block datos_precio">
          {{ datos.precio_unid }}Bs.
        </span>
      </p>
      <p v-if="datos.cantidad" class="datos_info">
        Precio por unidad:
        <span class="datos_unids datos_resaltados-block datos_precio">
          {{ datos.precio_unid }}Bs.
        </span>
      </p>
      <div>
        <p v-if="datos.peso" class="datos_info datos_both">
          Peso:
          <span class="datos_resaltados datos_unids">{{ datos.peso }}</span>
          <span v-if="datos.unidad_med" class="datos_resaltados">
            {{ datos.unidad_med }}
          </span>
        </p>
      </div>
      <p v-if="datos.cantidad" class="datos_info">
        Cantidad:
        <span class="datos_unids">{{ datos.cantidad }}</span>
        <span class="datos_resaltados"> unidad/es</span>
      </p>
      <p v-if="datos.fecha_venc" class="datos_info">
        Valida hasta:
        <span class="datos_resaltados">
          {{ transformDate(datos.fecha_venc) }}
        </span>
      </p>
      <p class="datos_info">
        Categoría: <span class="datos_resaltados">{{ datos.nombre_cat }}</span>
      </p>
      <p class="datos_info">Sobre este producto:</p>
      <p class="datos_info datos_descripcion">
        {{ datos.descripcion }}
      </p>
      <div v-if="isClient" class="datos_container-button">
        <button class="datos_button">Añadir al carrito</button>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "Datos",
  props: ["datos"],
  data: function () {
    return {
      isClient: false,
    };
  },
  mounted: function () {
    this.isClient = localStorage.getItem("session-vue") == "true";
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
  margin: 2rem 0;
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
  margin-bottom: 0;
  margin-left: 0;
  font-size: 1.4rem;
}

.datos_unids {
  color: #49494b !important;
  font-size: 20px;
}

.datos_container-button {
  display: flex;
  flex-direction: row-reverse;
}

.datos_button {
  background-color: var(--color-btn);
  border: none;
  border-radius: var(--border-radius);
  color: white;
  padding: 1rem 2rem;
  margin-right: 0;
}
</style>
