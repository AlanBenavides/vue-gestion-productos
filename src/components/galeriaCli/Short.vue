<template>
  <div>
    <div class="options-inline">
      <div>
        <p>Categorias:</p>
        <!-- lista de categorias -->
      </div>
      <div>
        <p style="text-align: right">Ordenar por:</p>
        <aside>
          <button
          v-for="(button, index) in orderButtons"
          :key="index"
          @click="selectOrder(button.order)"
          :class="`short-button ${
              orden == button.order ? 'short-button_select' : ''
          }`"
          >
          {{ button.type }}
          </button>
        </aside>
      </div>
    </div>
      <div class="options-inline">
        <aside>
          <button
          v-for="(button2, index) in tipeButtons"
          :key="index"
          @click="selectTipe(button2.order)"
          :class="`short-button ${
              tipo == button2.order ? 'short-button_select' : ''
          }`"
          >
          {{ button2.type }}
          </button>
        </aside>
        <div class="search">
          <button
            class="search_button"
            @click="search()"
          >
            <img src="@/assets/search-24px.svg" alt="search" />
          </button>
          <input
            spellcheck="false"
            class="search_input"
            maxlength="30"
            type="search"
            size="30"
            placeholder="Buscar"
            v-model="expresion"
            @keyup.enter="search()"
          />
        </div>
      </div>
    
    <template v-if="products">
    <div class="short-list">
        <div
            v-for="product in products"
            :key="product.cod_prod"
            class="short-product"
        >
            <Item
            tipo="producto"
            :id_product="product.cod_prod"
            :nombre="product.nombre_prod"
            :precio="product.precio_unid"
            :descripcion="product.descripcion"
            />
        </div>
    </div>
    </template>
    <template v-if="promos">
    <div class="short-list">
        <div
            v-for="product in promos"
            :key="product.cod_prom"
            class="short-product"
        >
            <Item
            tipo="promocion"
            :id_product="product.cod_prom"
            :nombre="product.nombr_prom"
            :precio="product.precio_prom"
            :descripcion="product.descrip_prom"
            />
        </div>
    </div>
    </template>
    <template v-if="descount">
    <div class="short-list">
        <div
            v-for="product in descount"
            :key="product.cod_prod"
            class="short-product"
        >
            <Item
            tipo="descuento"
            :id_product="product.cod_prod"
            :nombre="product.nombre_prod"
            :precio="product.precio_unid"
            :descripcion="product.descripcion"
            />
        </div>
    </div>
    </template>
    <nav aria-label="Page navigation example">
      <ul class="pagination justify-content-center">
        <li class="" :class="`page-item ${this.pagina <= 1 ? 'disabled' : ''}`">
          <a class="page-link" href="#" @click="prevPag">Anterior</a>
        </li>
        <li
          class="page-item"
          v-for="index in pagCount"
          :key="index"
          :class="pagina == index ? 'active' : ''"
        >
          <a class="page-link" href="#" @click="setPage(index)">{{ index }}</a>
        </li>
        <li
          :class="`page-item ${this.pagina >= this.pagCount ? 'disabled' : ''}`"
        >
          <a class="page-link" href="#" @click="nextPag">Siguiente</a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
import Item from "@/components/galeriaCli/Item.vue";

export default {
  name: "Short",
  components: {
    Item
  },
  data: function () {
    return {
      pagina: 1,
      pagCount: 1,
      orden: "nombre_prod",
      tipo:"producto",
      produtSelect: -1,
      products: [],
      promos: [],
      descount: [],
      expresion: "",
      searchResults: undefined,
      //arrayNext: [],
      //arrayAnt: [],
      orderButtons: [
        {
          order: "nombre_prod",
          type: "Alfabéticamente",
        },
        {
          order: "fecha_adic",
          type: "Más recientes",
        },
        {
          order: "cantidad",
          type: "Menor inventario",
        },
        {
          order: "precio_unid",
          type: "Precio",
        },
      ],
      tipeButtons: [
        {
          order: "producto",
          type: "Productos",
        },
        {
          order: "promocion",
          type: "Promociones",
        },
        {
          order: "descuento",
          type: "Descuentos",
        },
      ],
    };
  },
  methods: {
    selectOrder(order) {
      this.orden = order;
      this.pagina = 1;
      if(this.tipo == "producto"){
      
        this.getProducts();
      }
      else if(this.tipo == "promocion"){
        
        this.getPromos();
      }
      else{
        
        this.getDesc();
      }
    },
    selectTipe(tipo) {
      this.tipo = tipo;
      this.pagina = 1;

      if(this.tipo == "producto"){
      
        this.getProducts();
      }
      else if(this.tipo == "promocion"){
        
        this.getPromos();
      }
      else{

        this.getDesc();
      }
    },
    async getProducts() {
      let response = null;
      if(this.expresion == ''){
        response = await this.$http.get(
          `products?criterio=${this.orden}&tipo=productos&page=${this.pagina}&limit=${15}`
        );
      }else{
        response = await this.$http.get(
          `search?expresion=${this.expresion}&page=${this.pagina}&limit=15&table=producto`
        );
      }
      this.pagCount = 1;
      //this.arrayNext= [];
      //this.arrayAnt= [];
      const data = response.data;
      const arrayCount = parseInt(data.cant[0].count);

      this.setPageInterval(arrayCount, 15);

      //this.arrayNext = data.next;
      //this.arrayAnt = data.previus;

      this.products = data.results;
      this.promos = [];
      this.descount = [];
    },
    async getPromos() {
      let response = null;
      if(this.expresion == ''){
        response = await this.$http.get(
          `promociones?criterio=${this.orden}&tipo=promociones&page=${this.pagina}&limit=${15}`
        );
      }else{
        response = await this.$http.get(
          `search?expresion=${this.expresion}&page=${this.pagina}&limit=15&table=promocion`
        );
      }
      this.pagCount = 1;
      //this.arrayNext= [];
      //this.arrayAnt= [];
      const data = response.data;
      const arrayCount = parseInt(data.cant[0].count);

      this.setPageInterval(arrayCount,15);

      //this.arrayNext = data.next;
      //this.arrayAnt = data.previus;

      this.promos = data.results;
      this.descount = [];
      this.products = [];
    },
    async getDesc() {
      let response = null;
      if(this.expresion == ''){
        response = await this.$http.get(
          `descuentos?criterio=${this.orden}&tipo=descuentos&page=${this.pagina}&limit=${15}`
        );
      }else{
        response = await this.$http.get(
          `search?expresion=${this.expresion}&page=${this.pagina}&limit=15&table=descuento`
        );
      }
      this.pagCount = 1;
      //this.arrayNext= [];
      //this.arrayAnt= [];
      const data = response.data;
      const arrayCount = parseInt(data.cant[0].count);

      this.setPageInterval(arrayCount, 15);

      //this.arrayNext = data.next;
      //this.arrayAnt = data.previus;

      this.descount = data.results;
      this.promos = [];
      this.products = [];
    },
    prevPag() {
      this.pagina--;
      if(this.tipo == "producto"){
      
        this.getProducts();
      }
      else if(this.tipo == "promocion"){
        
        this.getPromos();
      }
      else{
        
        this.getDesc();
      }
    },
    nextPag() {
      this.pagina++;
      if(this.tipo == "producto"){
      
        this.getProducts();
      }
      else if(this.tipo == "promocion"){
        
        this.getPromos();
      }
      else{
        
        this.getDesc();
      }
    },
    setPage(index) {
      this.pagina = index;
      if(this.tipo == "producto"){
      
        this.getProducts();
      }
      else if(this.tipo == "promocion"){
        
        this.getPromos();
      }
      else{
        
        this.getDesc();
      }
    },
    setPageInterval(cant, limit){
      if ((cant / limit) % limit == 0)
        this.pagCount = Math.trunc(cant / limit);
      else this.pagCount = Math.trunc(cant / limit) + 1;
    },
    showResults(searchResults){
      if(this.tipo == "producto"){
        this.products = searchResults;
        this.promos = [];
        this.descount = [];
      }else if(this.tipo == "promocion"){
        this.promos = searchResults;
        this.products = [];
        this.descount = [];
      }else{
        this.descount = searchResults;
        this.promos = [];
        this.products = [];
      }
    },
    async search() {
      this.pagina = 1;
      if(this.tipo == "producto"){
      
        this.getProducts();
      }
      else if(this.tipo == "promocion"){
        
        this.getPromos();
      }
      else{
        
        this.getDesc();
      }
    }
  },
  mounted: async function () {
    await this.getProducts();
  },
};
</script>

<style scoped>

h3 {
  text-align: start;
  font-size: 1rem;
  color: var(--font-color);
}
h4 {
  text-align: right;
  margin-right: 2rem;
  font-size: 1rem;
  color: var(--font-color);
}

.short-button {
  background: none;
  border: 2px solid var(--primary-color);
  border-left: none;
  padding: 5px 1rem;
}

.short-button:first-child {
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  border-left: 2px solid var(--primary-color);
}
.short-button:last-child {
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
}

.short-button:focus {
  outline: none;
}

.short-button_select {
  background-color: var(--secondary-color);
}

.short-list { 
  margin: 1em;
  display: grid;
  grid-template-columns: 250px 250px 250px 250px 250px;
  gap: 1rem;
}

.short-product {
  border: 2px solid var(--primary-color);
  border-radius: 20px;
  transition: 0.1s;
}

.short-product_select {
  box-shadow: 0px 0px 10px 0px #888;
}

.cont label{
    color:#797d7f;
    font-size:12.9px;
}

.options-inline {
    margin: 1em;
    display: flex;
    justify-content: space-between;
}

input[type="search"]::-webkit-search-decoration,
input[type="search"]::-webkit-search-cancel-button,
input[type="search"]::-webkit-search-results-button,
input[type="search"]::-webkit-search-results-decoration {
  display: none;
}
.search {
  display: flex;
}
.search_input {
  border: 1px solid black;
  border-left: none;
  border-radius: 15px;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  width: 100%;
  padding-left: 5px;
  background-color: #fff;
  outline: none;
}
.search_button {
  height: 40px;
  border: 1px solid black;
  border-right: none;
  background: transparent;
  border-top-left-radius: 15px;
  border-bottom-left-radius: 15px;
  background-color: #fff;
  padding-left: 5px;
}

.search_button:focus {
  outline: none;
  box-shadow: none;
  -webkit-box-shadow: none !important;
  box-shadow: none !important;
}

.search_button::-moz-focus-inner {
  border: 0;
}
</style>
