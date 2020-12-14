<template>
  <div>
    <div class="options-inline">
      <div>
        <p style="text-align: left">Categoria:</p>

        <div class="short-selectlist">
          <select
            class="form-control"
            v-model="categoria"
            @change="selectCategoria(categoria)"
            :disabled="tipo == 'promocion'"
          >
            <option value="">Todos</option>
            <option
              v-for="cate of arrayCategoria"
              :key="cate.index"
              :value="cate.nombre_cat"
              v-text="cate.nombre_cat"
            ></option>
          </select>
        </div>
      </div>
      <div>
        <p style="text-align: right">Ordenar por:</p>
        <aside class="short-buttonlist">
          <button
            v-for="(button, index) in orderButtons"
            :key="index"
            @click="selectOrder(button.order, button.orderProm)"
            :class="`short-button ${
              orden == button.order || orden == button.orderProm
                ? 'short-button_select'
                : ''
            }`"
          >
            {{ button.type }}
          </button>
        </aside>
      </div>
    </div>
    <div class="options-inline">
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
      <div class="search">
        <button class="search_button" @click="search()">
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
            :porcentaje="product.porcentaje"
            :cantidad_req="product.cantidad_req"
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
            :porcentaje="product.porcentaje"
            :cantidad_req="product.cantidad_req"
          />
        </div>
      </div>
    </template>
    <div v-if="!hayResultados">
      <p>No se encontraron resultados para tu búsqueda</p>
      <p>Intente con una palabra o expresión diferente</p>
    </div>
    <nav aria-label="Page navigation example">
      <ul class="pagination justify-content-center">
        <li class="" :class="`page-item ${this.pagina <= 1 ? 'disabled' : ''}`">
          <a class="page-link" href="#" @click="prevPag">Anterior</a>
        </li>
        <div class="scrollable-pages">
          <li
            class="page-item"
            v-for="index in pagCount"
            :key="index"
            :class="pagina == index ? 'active' : ''"
          >
            <a class="page-link" href="#" @click="setPage(index)">{{
              index
            }}</a>
          </li>
        </div>
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
      categoria: "",
      orden: "nombre_prod",
      tipo: "producto",
      produtSelect: -1,
      products: [],
      promos: [],
      descount: [],
      expresion: "",
      hayResultados: true,
      arrayCategoria: [],
      //arrayAnt: [],
      orderButtons: [
        {
          order: "nombre_prod",
          orderProm: "nombr_prom",
          type: "Alfabéticamente",
        },
        {
          order: "fecha_adic",
          orderProm: "fecha_ini",
          type: "Más recientes",
        },
        {
          order: "cantidad",
          orderProm: "cantidad_prom",
          type: "Menor inventario",
        },
        {
          order: "precio_unid",
          orderProm: "precio_prom",
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
    async getCategoriaCli() {
      const response = await this.$http.get(`categories`);
      const respuesta = response.data;
      this.arrayCategoria = respuesta;
    },
    selectCategoria() {
      if (this.tipo == "producto") {
        this.getProducts();
      } else if (this.tipo == "descuento") {
        this.getDesc();
      }
    },
    selectOrder(order, orderProm) {
      this.pagina = 1;
      if (this.tipo == "producto") {
        this.orden = order;
        this.getProducts();
      } else if (this.tipo == "promocion") {
        this.orden = orderProm;
        this.getPromos();
      } else {
        this.orden = order;
        this.getDesc();
      }
    },
    selectTipe(tipo) {
      if (this.tipo == tipo) {
        return;
      }
      this.tipo = tipo;
      this.pagina = 1;

      if (this.tipo == "producto") {
        for (let order_select of this.orderButtons) {
          if (order_select.orderProm == this.orden) {
            this.orden = order_select.order;
          }
        }
        this.getProducts();
      } else if (this.tipo == "promocion") {
        for (let order_select of this.orderButtons) {
          if (order_select.order == this.orden) {
            this.orden = order_select.orderProm;
          }
        }
        this.getPromos();
      } else {
        for (let order_select of this.orderButtons) {
          if (order_select.orderProm == this.orden) {
            this.orden = order_select.order;
          }
        }
        this.getDesc();
      }
    },
    async getProducts() {
      let response = null;
      if (this.expresion == "") {
        response = await this.$http.get(
          `products?criterio=${this.orden}&categoria=${this.categoria}&page=${
            this.pagina
          }&limit=${15}&usr=1234`
        );
      } else {
        this.categoria = "";
        response = await this.$http.get(
          `search?expresion=${this.expresion}&page=${this.pagina}&limit=15&table=producto`
        );
        this.verSiHayResultados(response.data.results);
      }
      this.pagCount = 1;
      const data = response.data;
      const arrayCount = parseInt(data.cant[0].count);

      this.setPageInterval(arrayCount, 15);

      this.products = data.results;
      this.promos = [];
      this.descount = [];
    },
    async getPromos() {
      let response = null;
      if (this.expresion == "") {
        response = await this.$http.get(
          `promotions?criterio=${this.orden}&page=${
            this.pagina
          }&limit=${15}&usr=1234`
        );
      } else {
        response = await this.$http.get(
          `search?expresion=${this.expresion}&page=${this.pagina}&limit=15&table=promocion`
        );
        this.verSiHayResultados(response.data.results);
      }
      this.pagCount = 1;
      this.categoria = "";

      const data = response.data;
      const arrayCount = parseInt(data.cant[0].count);

      this.setPageInterval(arrayCount, 15);

      this.promos = data.results;
      this.descount = [];
      this.products = [];
      if (this.orden == "cantidad_prom") {
        this.orden = "cantidad";
      } else if (this.orden == "precio_prom") {
        this.orden = "precio_unid";
      }
    },
    async getDesc() {
      let response = null;
      if (this.expresion == "") {
        response = await this.$http.get(
          `discounts?criterio=${this.orden}&categoria=${this.categoria}&page=${
            this.pagina
          }&limit=${15}&usr=1234`
        );
      } else {
        response = await this.$http.get(
          `search?expresion=${this.expresion}&page=${this.pagina}&limit=15&table=descuento`
        );
        this.verSiHayResultados(response.data.results);
      }
      this.pagCount = 1;

      const data = response.data;
      const arrayCount = parseInt(data.cant[0].count);

      this.setPageInterval(arrayCount, 15);

      this.descount = data.results;
      this.promos = [];
      this.products = [];
    },
    prevPag() {
      this.pagina--;
      if (this.tipo == "producto") {
        this.getProducts();
      } else if (this.tipo == "promocion") {
        this.getPromos();
      } else {
        this.getDesc();
      }
    },
    nextPag() {
      this.pagina++;
      if (this.tipo == "producto") {
        this.getProducts();
      } else if (this.tipo == "promocion") {
        this.getPromos();
      } else {
        this.getDesc();
      }
    },
    setPage(index) {
      this.pagina = index;
      if (this.tipo == "producto") {
        this.getProducts();
      } else if (this.tipo == "promocion") {
        this.getPromos();
      } else {
        this.getDesc();
      }
    },
    setPageInterval(cant, limit) {
      if ((cant / limit) % limit == 0) this.pagCount = Math.trunc(cant / limit);
      else this.pagCount = Math.trunc(cant / limit) + 1;
    },
    async search() {
      this.pagina = 1;
      if (this.tipo == "producto") {
        this.getProducts();
      } else if (this.tipo == "promocion") {
        this.getPromos();
      } else {
        this.getDesc();
      }
    },
    verSiHayResultados(resultadosDeBusqueda) {
      if (resultadosDeBusqueda.length == 0) {
        this.hayResultados = false;
      } else {
        this.hayResultados = true;
      }
    },
  },
  mounted: async function () {
    await this.getProducts();
    this.getCategoriaCli();
  },
};
</script>

<style scoped>
.form-control {
  border: 1px solid var(--color-border);
  border-radius: var(--border-radius);
}

.short-button {
  background: none;
  border: 1px solid var(--color-border);
  border-left: none;
  padding: 5px 1rem;
}

.short-button:first-child {
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  border-left: 1px solid var(--color-border);
}
.short-button:last-child {
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
}

.short-button:focus {
  outline: none;
}

.short-button_select {
  background-color: var(--background);
}

.short-list {
  margin: 3em;
  display: grid;
  grid-template-columns: 400px 400px 400px;
  gap: 2rem;
}

.short-product {
  border: 2px solid var(--color-border);
  border-radius: var(--border-radius);
}

nav {
  width: 100%;
  height: 60px;
  border-bottom: 4px;
}

.options-inline {
  margin: 2em 3em;
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
  background-color: transparent;
  border: 1px solid var(--color-border);
  border-left: none;
  border-top-right-radius: var(--border-radius);
  border-bottom-right-radius: var(--border-radius);
  padding-left: 5px;
  outline: none;
  width: 100%;
}
.search_button {
  background: transparent;
  border: 1px solid var(--color-border);
  border-top-left-radius: var(--border-radius);
  border-bottom-left-radius: var(--border-radius);
  border-right: none;
  height: 40px;
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

.scrollable-pages {
  max-width: 500px;
  display: flex;
  overflow-x: scroll;
  overflow-y: hidden;
}

.scrollable-pages::-webkit-scrollbar {
  height: 6px;
}

.scrollable-pages::-webkit-scrollbar-button {
  display: none;
}

.scrollable-pages::-webkit-scrollbar-thumb {
  background-color: #007bff;
  border-radius: var(--border-radius);
}
</style>
