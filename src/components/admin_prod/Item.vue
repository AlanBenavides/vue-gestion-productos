<template>
  <div class="item">
    <router-link :to="`/producto/${id_product}`">
      <img :src="imagen" :alt="nombre" width="300" />
    </router-link>
    <h5>{{ nombre }}</h5>
    <p>{{ precio }} Bs.</p>
    <p>Descripcion:<br />{{ descripcion }}</p>
    <p>Añadido el {{ parseDate() }}</p>
  </div>
</template>

<script>
export default {
  name: "Item",
  props: ["id_product", "nombre", "precio", "descripcion", "fecha"],
  data: function () {
    return {
      imagen: "",
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
  color: black;
  white-space:normal;
}

.item > img {
  margin-bottom: 1rem;
}

.item > h5 {
  padding: 0.5rem;
  padding-left: 0;
}
</style>
