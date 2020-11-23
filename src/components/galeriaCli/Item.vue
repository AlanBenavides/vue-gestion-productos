<template>
  <div class="item">
    <router-link :to="this.route">
      <img class="img-item" :src="imagen" :alt="nombre"/>
    </router-link>
    <h5 class="one-line">{{ nombre }}</h5>
    <p v-if="tipo == 'descuento'">{{porcentaje}} % de descuento</p>
    <p v-if="tipo != 'descuento'">{{ precio }} Bs.</p>
    <p v-if="tipo == 'descuento'">
      <strike>{{ precio }} Bs.</strike>
    </p>
    <p id="precio-nuevo" v-if="tipo == 'descuento'"> {{ precio - (precio * (porcentaje/100)) }} Bs</p>
    <p class="three-lines">Descripcion:<br/>{{ descripcion }}</p>
  </div>
</template>

<script>
//import { Router } from 'express';
export default {
  name: "Item",
  props: ["tipo", "id_product", "nombre", "precio", "descripcion", "fecha", "porcentaje"],
  data: function () {
    return {
      imagen: "",
      route: ""
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
    let query = this.tipo == "producto" || this.tipo == "descuento" ? "images/": "promotions/image/"
    query += `${this.id_product}?cantidad=1`;
    const response = await this.$http.get(query);

    const imageURL = this.tipo == "producto" || this.tipo == "descuento" ? response.data.datos[0].imagen : response.data.datos[0].imagen_prom;
    this.imagen = "data:image/jpg;base64," + imageURL;

    this.route = this.tipo == "producto" || this.tipo == "descuento" ? `/producto/${this.id_product}` : `/vista_promo/${this.id_product}`
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
  color: black;
}

strike {
  color: red;
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

.three-lines{
  line-height: 1.5em;
  height: 4.5em;
  word-wrap: break-word;
  overflow: hidden;
}

#precio-nuevo{
  color: #2AC817;
}
</style>
