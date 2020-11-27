<template>
  <div class="item">
    <router-link to="">
      <img class="img-item" :src="imagen" :alt="nombre" />
    </router-link>
    <h5 class="one-line">{{ nombre }}</h5>
    <p>{{ precio }} Bs.</p>
    <p class="three-lines">Descripcion:<br />{{ descripcion }}</p>
    <p>Inicia el {{ parseDate("ini") }}</p>
    <p>Termina el {{ parseDate("fin") }}</p>
  </div>
</template>

<script>
export default {
  name: "ItemProm",
  props: [
    "id_prom",
    "nombre",
    "precio",
    "descripcion",
    "fecha_ini",
    "fecha_fin",
  ],
  data: function () {
    return {
      imagen: "",
    };
  },
  methods: {
    parseDate(type) {
      let date;
      if (type == "ini") {
        date = new Date(this.fecha_ini);
      } else {
        date = new Date(this.fecha_fin);
      }
      const day = date.getDate() + 1;
      const month = date.getMonth() + 1;
      const year = date.getFullYear();
      return `${day}-${month}-${year}`;
    },
  },
  mounted: async function () {
    const response = await this.$http.get(`promotions/image/${this.id_prom}`);
    const imageURL = response.data.datos[0].imagen_prom;
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
