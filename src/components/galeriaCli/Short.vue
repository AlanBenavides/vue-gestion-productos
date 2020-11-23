<template>
  <div>
    <h3>Categoria:</h3>

    <div class="short-selectlist">
        <select class="form-control" v-model="categoria" @change="selectCategoria(categoria)">
            <option value="">Todos</option>
            <!--<option v-for="cate in arrayCategoria" :key="cate.id" :value="cate.id" v-text="cate.nombre"></option>
            -->
            <option value="Farmacia">Farmacia</option>
            <option value="Entretenimiento">Entretenimiento</option>
            <option value="Alimentos">Alimentos</option>
            <option value="Electronicos">Electronicos</option>
            <option value="Ropa">Ropa</option>
        </select>                                        
    </div>

    <div>
      <aside class="short-buttonlist">
        
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

      <div>
      <aside class="short-buttontipe">
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
    </div>
     <nav>
          <div class="cont">
              <label>Buscar</label>
              <input type="search" placeholder="en la tienda" title="Buscar">
          </div>
      </nav>
    <template v-if="products">
    <div class="short-list">
      <div
        v-for="product in products"
        :key="product.cod_prod"
        :class="`short-product ${
          product.cod_prod == produtSelect ? 'short-product_select' : ''
        }`"
        @click="selectProduct(product.cod_prod)"
      >
        <Item
          :id_product="product.cod_prod"
          :nombre="product.nombre_prod"
          :precio="product.precio_unid"
          :descripcion="product.descripcion"
          :fecha="product.fecha_adic"
          :tipo="tipo"
        />
      </div>
    </div>
    </template>
    <template v-if="promos">
    <div class="short-list">
      <div
        v-for="product in promos"
        :key="product.cod_prom"
        :class="`short-product ${
          product.cod_prom == produtSelect ? 'short-product_select' : ''
        }`"
        @click="selectProduct(product.cod_prom)"
      >
        <Item
          :id_product="product.cod_prom"
          :nombre="product.nombr_prom"
          :precio="product.precio_prom"
          :descripcion="product.descrip_prom"
          :fecha="product.fecha_ini"
          :tipo="tipo"
        />
      </div>
    </div>
    </template>
    <template v-if="descount">
    <div class="short-list">
      <div
        v-for="product in descount"
        :key="product.cod_prod"
        :class="`short-product ${
          product.cod_prod == produtSelect ? 'short-product_select' : ''
        }`"
        @click="selectProduct(product.cod_prod)"
      >
        <Item
          :id_product="product.cod_prod"
          :nombre="product.nombre_prod"
          :precio="product.precio_unid"
          :descripcion="product.descripcion"
          :fecha="product.fecha_adic"
          :tipo="tipo"
          :porcentaje="product.porcentaje"
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
    Item,
  },
  data: function () {
    return {
      pagina: 1,
      pagCount: 1,
      categoria: '',
      orden: "nombre_prod",
      tipo:"productos",
      produtSelect: -1,
      products: [],
      promos: [],
      descount: [],
      arrayNext: [],
      arrayAnt: [],
      arrayCategoria:[],
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
          order: "productos",
          type: "Productos",
        },
        {
          order: "promociones",
          type: "Promociones",
        },
        {
          order: "descuentos",
          type: "Descuentos",
        },
      ],
    };
  },
  methods: {
    selectCategoria(){
      if(this.tipo == 'productos'){
      this.getProducts();
      }else if(this.tipo == 'descuentos'){
        this.getDesc();
      }
    },
    selectOrder(order) {
      this.orden = order;
      this.pagina = 1;
      this.selectProduct(-1);
      if(this.tipo == "productos"){
      
        this.getProducts();
      }
      else if(this.tipo == "promociones"){
        if(this.orden == 'cantidad'){
          this.orden = 'cantidad_prom'
        }else if(this.orden == 'precio_unid'){
          this.orden = 'precio_prom'
        }
        this.getPromos();
      }
      else{
        
        this.getDesc();
      }
    },
    selectProduct(id) {
      this.produtSelect = id;
      this.$store.commit("changeSelection", id);
    },
    selectTipe(tipo) {
      this.tipo = tipo;
      if(this.tipo == "productos"){
      
        this.getProducts();
      }
      else if(this.tipo == "promociones"){
        if(this.orden == 'cantidad'){
          this.orden = 'cantidad_prom'
        }else if(this.orden == 'precio_unid'){
          this.orden = 'precio_prom'
        }
        this.getPromos();
      }
      else{
        
        this.getDesc();
      }
    },
    async getProducts() {
      const response = await this.$http.get(
        `products?criterio=${this.orden}&categoria=${this.categoria}&page=${this.pagina}&limit=${15}`
      );
      this.pagCount = 1;
      this.arrayNext= [];
      this.arrayAnt= [];
      const data = response.data;
      const arrayCount = parseInt(data.cant[0].count);

      console.log(arrayCount % 15);

      if (arrayCount % 15 == 0)
        this.pagCount = Math.trunc(arrayCount / 15);
      else this.pagCount = Math.trunc(arrayCount / 15) + 1;

      this.arrayNext = data.next;
      this.arrayAnt = data.previus;

      this.products = data.results;
      this.promos = [];
      this.descount = [];
      
    },
    async getPromos() {
      const response = await this.$http.get(
        `promotions?criterio=${this.orden}&tipo=${this.tipo}&page=${this.pagina}&limit=${15}`
      );
      this.pagCount = 1;
        this.arrayNext= [];
        this.arrayAnt= [];
      this.categoria = ''; 
      const data = response.data;
      const arrayCount = parseInt(data.cant[0].count);


      if (arrayCount % 15 == 0)
        this.pagCount = Math.trunc(arrayCount / 15);
      else this.pagCount = Math.trunc(arrayCount / 15) + 1;

      this.arrayNext = data.next;
      this.arrayAnt = data.previus;

      this.promos = data.results;
      this.descount = [];
      this.products = [];
      if(this.orden == 'cantidad_prom'){
          this.orden = 'cantidad'
        }else if(this.orden == 'precio_prom'){
          this.orden = 'precio_unid'
        }
    },
    async getDesc() {
      const response = await this.$http.get(
        `discounts?criterio=${this.orden}&categoria=${this.categoria}&page=${this.pagina}&limit=${15}`
      );
        this.pagCount = 1;
        this.arrayNext= [];
        this.arrayAnt= [];
      const data = response.data;
      const arrayCount = parseInt(data.cant[0].count);

      if (arrayCount % 15 == 0)
        this.pagCount = Math.trunc(arrayCount / 15);
      else this.pagCount = Math.trunc(arrayCount / 15) + 1;

      this.arrayNext = data.next;
      this.arrayAnt = data.previus;

      this.descount = data.results;
      this.promos = [];
      this.products = [];
    },
    prevPag() {
      this.pagina--;
      this.selectProduct(-1);
      if(this.tipo == "productos"){
      
        this.getProducts();
      }
      else if(this.tipo == "promociones"){
        
        this.getPromos();
      }
      else{
        
        this.getDesc();
      }
    },
    nextPag() {
      this.pagina++;
      this.selectProduct(-1);
      if(this.tipo == "productos"){
      
        this.getProducts();
      }
      else if(this.tipo == "promociones"){
        
        this.getPromos();
      }
      else{
        
        this.getDesc();
      }
    },
    setPage(index) {
      this.pagina = index;
      this.selectProduct(-1);
      if(this.tipo == "productos"){
      
        this.getProducts();
      }
      else if(this.tipo == "promociones"){
        
        this.getPromos();
      }
      else{
        
        this.getDesc();
      }
    },
  },
  mounted: async function () {
    await this.getProducts(this.pagina, this.orden);
  },
};
</script>

<style scoped>
h3 {
  margin-left: 4rem;
  text-align: left;
  font-size: 1rem;
  color: var(--font-color);
}
h4 {
  text-align: right;
  margin-right: 2rem;
  font-size: 1rem;
  color: var(--font-color);
}
.short-selectlist {
  float: left;
  margin-right: 2rem;
  margin-left: 4rem;
}

.short-buttonlist {
  clear: left;
  float: right;
  margin-right: 2rem;
  margin-bottom: 2rem;
  
}
.short-buttontipe {
  clear: right;
  float: left;
  margin-bottom: 2rem;
  margin-left: 4rem;
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
  clear: left;
  display: grid;
  grid-template-columns: 250px 250px 250px 250px 250px;
  gap: 1rem;
  padding-right: 4rem;
  padding-bottom: 2rem;
  justify-content: center;
}

.short-product {
  border: 2px solid var(--primary-color);
  border-radius: 20px;
  transition: 0.1s;
}

.short-product_select {
  box-shadow: 0px 0px 10px 0px #888;
}

nav{
    width:100%;
    height:60px;
    border-bottom:4px;
    
}

.cont{
    height:100%;
    padding-top:0px;
    float:right;
    margin-right: 2rem;
}
.cont label{
    color:#797d7f;
    font-size:12.9px;
}

input[type="search"]{
    width:170px;
    margin:10px;
    padding:10px 16px;
    border-radius:32px;
    outline:none;
    border:2px solid #ccd1d1;
    /*background:#aeb6bf;*/
    transition:all 0.5s;
}
input[type="search"]:focus{
    background:#fff;
    width:300px;
}
</style>
