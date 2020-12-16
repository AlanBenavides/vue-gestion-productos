<template>
  <div class="item">
    <router-link :to="this.route">
      <img class="img-item" :src="imagen" :alt="nombre" />
    </router-link>
    <h5 class="one-line">{{ nombre }}</h5>
    <p>{{ precio }} Bs.</p>
    <p v-if="porcentaje != null">
      {{ porcentaje }} % de descuento por {{ cantidad_req }} Ud.
    </p>
    <p v-if="porcentaje != null">
      <strike>{{ precio }} Bs.</strike>
      <strong id="precio-nuevo"
        >{{ (precio - precio * (porcentaje / 100)).toFixed(2) }} Bs</strong
      >
    </p>
    <p class="three-lines">Descripcion:<br />{{ descripcion }}</p>
  </div>
</template>

<script>
export default {
  name: "Item",
  props: [
    "id_product",
    "nombre",
    "precio",
    "descripcion",
    "fecha",
    "tipo",
    "porcentaje",
    "cantidad_req",
  ],
  data: function () {
    return {
      imagen: "",
      route: "",
    };
  },
  methods: {
    parseDate() {
      const date = new Date(this.fecha);
      const day = date.getDate() + 1;
      const month = date.getMonth() + 1;
      const year = date.getFullYear();
      return `${day}-${month}-${year}`;
    },
    abrirModal() {
      this.modal = 1;
    },
    cerrarModal() {
      this.modal = 0;
    },
  },
  mounted: async function () {
    let query =
      this.tipo == "producto" || this.tipo == "descuento"
        ? "images/"
        : "promotions/image/";
    query += `${this.id_product}?cantidad=1`;
    const response = await this.$http.get(query);

    const imageURL =
      this.tipo == "producto" || this.tipo == "descuento"
        ? response.data.datos[0].imagen
        : response.data.datos[0].imagen_prom;
    this.imagen = "data:image/jpg;base64," + imageURL;

    this.route =
      this.tipo == "producto" || this.tipo == "descuento"
        ? `/producto/${this.id_product}`
        : `/vista_promo/${this.id_product}`;
  },
};
</script>

<style scoped>
.item {
  font-size: 16px;
  padding: 1rem 2rem;
  display: flex;
  flex-direction: column;
  text-align: start;
  cursor: pointer;
  display: block;
  text-decoration: none;
  color: var(--font-color-primary);
}

strike {
  color: var(--font-discount-after);
}

.img-item {
  width: 300px;
  height: 300px;
  object-fit: contain;
}

.one-line {
  padding: 0.5rem;
  padding-left: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.three-lines {
  line-height: 1.5em;
  height: 4.5em;
  word-wrap: break-word;
  overflow: hidden;
}

#precio-nuevo {
  margin-left: 1rem;
  color: var(--font-discount-before);
}

.datos {
  text-align: left;
  font-size: 1.1rem;
  font-weight: 700;
}
</style>
