<template>
  <div>
    <h3>Lista de productos:</h3>
    <div>
      <h4>Ordenar por:</h4>
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
          :nombre="product.nombre_prod"
          :precio="product.precio_unid"
          :descripcion="product.descripcion"
          :fecha="product.fecha_adic"
        />
      </div>
    </div>
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
          <a class="page-link" href="#" @click="nextPag">Next</a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
import Item from "@/components/admin_prod/Item.vue";

export default {
  name: "Short",
  components: {
    Item,
  },
  data: function () {
    return {
      pagina: 1,
      pagCount: 1,
      orden: "nombre_prod",
      produtSelect: -1,
      products: [],
      arrayNext: [],
      arrayAnt: [],
      orderButtons: [
        {
          order: "nombre_prod",
          type: "Alfabeticamente",
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
    };
  },
  methods: {
    selectOrder(order) {
      this.orden = order;
      this.pagina = 1;
      this.getProducts();
    },
    selectProduct(id) {
      this.produtSelect = id;
      this.$store.commit("changeSelection", id);
    },
    async getProducts() {
      const response = await this.$http.get(
        `products?criterio=${this.orden}&page=${this.pagina}&limit=${6}`
      );

      const data = response.data;
      const arrayCount = parseInt(data.cant[0].count);

      if ((arrayCount / 6) % 10 == 0)
        this.pagCount = Math.trunc(arrayCount / 6);
      else this.pagCount = Math.trunc(arrayCount / 6) + 1;

      this.arrayNext = data.next;
      this.arrayAnt = data.previus;

      this.products = data.results;
    },

    prevPag() {
      this.pagina--;
      this.getProducts();
    },
    nextPag() {
      this.pagina++;
      this.getProducts();
    },
    setPage(index) {
      this.pagina = index;
      this.getProducts();
    },
  },
  mounted: async function () {
    await this.getProducts(this.pagina, this.orden);
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
  text-align: start;
  font-size: 1rem;
  color: var(--font-color);
}

.short-buttonlist {
  display: flex;
  margin-bottom: 2rem;
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
  display: grid;
  grid-template-columns: 400px 400px;
  gap: 3rem;
  padding-right: 2rem;
  padding-bottom: 2rem;
  justify-content: center;
}

.short-product {
  border: 2px solid var(--primary-color);
  border-radius: 20px;
  transition: 0.1s;
}

.short-product_select {
  box-shadow: 0px 0px 10px 0px blue !important;
}

.short-product:hover {
  box-shadow: 1px 1px 1px 1px #888;
}
</style>
