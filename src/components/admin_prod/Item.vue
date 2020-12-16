<template>
  <div class="item">
    <router-link :to="clickeable ? '' : `/producto/${id_product}`">
      <img class="img-item" :src="imagen" :alt="nombre" />
    </router-link>
    <h5 class="one-line">{{ nombre }}</h5>
    <p>{{ precio }} Bs.</p>
    <p class="three-lines">Descripcion:<br />{{ descripcion }}</p>
    <p>Añadido el {{ parseDate() }}</p>
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
    "clickeable",
  ],
  data: function () {
    return {
      imagen: "",
    };
  },
  methods: {
    parseDate() {
      const date = new Date(this.fecha);
      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();
      return `${day}-${month}-${year}`;
    },
  },
  mounted: async function () {
    const response = await this.$http.get(
      `images/${this.id_product}?cantidad=1`
    );
    const imageURL = response.data.datos[0].imagen;
    this.imagen = "data:image/jpg;base64," + imageURL;
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
  text-decoration: none;
  color: var(--font-color-primary);
  white-space: normal;
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
</style>
