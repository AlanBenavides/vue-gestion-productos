<template>
  <div>
    <h3>Lista de productos:</h3>
    <div>
      <h4>Ordenar por:</h4>
      <aside class="short-buttonlist">
        <button
          v-for="(button, index) in orderButtons"
          :key="index"
          @click="selectOrder(button.order, pagina)"
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
        v-for="producto in arrayProd1"
        :key="producto.cod_prod"
        :class="`short-product ${
          producto.cod_prod == produtSelect ? 'short-product_select' : ''
        }`"
        @click="selectProduct(producto.cod_prod)"
      >
        <Item
          :nombre="producto.nombre_prod"
          :precio="producto.precio"
          :desripcion="producto.descripcion"
          :fecha="producto.fecha_adic"
        />
      </div>
    </div>
    <nav aria-label="Page navigation example">
      <ul class="pagination justify-content-center">
        <li class="page-item" :class="previousEnabled">
          <a class="page-link" href="#" tabindex="-1" @click="pagina--"
            >Anterior</a
          >
        </li>
        <li
          class="page-item"
          v-for="i in pagCount"
          :key="i"
          :class="pagina == i ? 'active' : ''"
        >
          <a class="page-link" href="#" @click="pagina = i">{{ i }}</a>
        </li>
        <li class="page-item" :class="nextEnabled">
          <a class="page-link" href="#" @click="pagina++">Next</a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
import Item from "@/components/admin_prod/Item.vue";
import axios from "axios";

export default {
  name: "Short",
  components: {
    Item,
  },
  data: function () {
    return {
      pagina: 1,
      pagCount: 0,
      orden: "nombre_prod",
      produtSelect: -1,
      arrayProd1: [],
      arrayNext: [],
      arrayAnt: [],
      orderButtons: [
        {
          order: "nombre",
          type: "Alfabeticamente",
        },
        {
          order: "fecha",
          type: "Más recientes",
        },
        {
          order: "existencias",
          type: "Menor inventario",
        },
        {
          order: "precio",
          type: "Precio",
        },
      ],
    };
  },
  computed: {
    previousEnabled() {
      return {
        "": this.pagina > 1,
        disabled: this.pagina <= 1,
      };
    },
    nextEnabled() {
      return {
        "": this.pagina < this.pagCount,
        disabled: this.pagina >= this.pagCount,
      };
    },
    pageActive() {
      return {
        "": this.pagina == 2,
        active: this.pagina != 2,
      };
    },
  },
  methods: {
    selectOrder(order, page) {
      this.orden = order;
      this.pagina = page;
    },
    selectProduct(id) {
      this.produtSelect = id;
      console.log(id);
    },
    getProducts(pagina, orden) {
      let me = this;

      axios
        .get(
          "http://localhost:4000/products?criterio=" +
            orden +
            "&page=" +
            pagina +
            "&limit=" +
            6
        )
        .then(function (response) {
          var respuesta = response.data;
          this.arrayProd1 = respuesta.results;

          var arrayCount = respuesta.cant;
          if (((arrayCount[0].count * 1) / 6) % 10 == 0) {
            me.pagCount = (arrayCount[0].count * 1) / 6;
          } else {
            me.pagCount = (arrayCount[0].count * 1) / 6 + 1;
          }
          me.arrayNext = respuesta.next;
          me.arrayAnt = respuesta.previus;

          //me.pagina = me.arrayNext.page
          //me.pagina = me.arrayAnt.page
        });
    },
  },
  mounted: function () {
    this.getProducts(this.pagina, this.orden);
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
