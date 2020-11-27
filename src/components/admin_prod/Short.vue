<template>
  <div>
    <h3>Lista de productos:</h3>
    <div>
      <h4>Ordenar por:</h4>
      <aside class="short-buttonlist">
        <button
          v-for="(button, index) in orderButtons"
          :key="index"
          @click="selectOrder(index)"
          :class="`short-button ${
            orden == button.order || orden == button.orderProm? 'short-button_select' : ''
          }`"
        >
          {{ button.type }}
        </button>
      </aside>
      <h4 v-if="!onlyUnits">Mostrar:</h4>
      <aside class="short-buttonlist" v-if="!onlyUnits">
        <button class="short-button"
          @click="selectMostrar('products')"
        >Productos</button>
        <button class="short-button"
          @click="selectMostrar('promotions')"
        >Promociones</button>
      </aside>
    </div>
    <div class="short-list" v-if="mostrar == 'products'">
      <div
        v-for="product in products"
        :key="product.cod_prod"
        :class="`short-product ${itemSelected(product.cod_prod)}`"
        @click="selectProduct(product.cod_prod, product.cantidad)"
      >
        <Item
          :id_product="product.cod_prod"
          :nombre="product.nombre_prod"
          :precio="product.precio_unid"
          :descripcion="product.descripcion"
          :fecha="product.fecha_adic"
          :clickeable="onlyUnits"
        />
      </div>
    </div>
    <div class="short-list" v-if="mostrar == 'promotions'">
      <div
        v-for="prom in promotions"
        :key="prom.cod_prom"
        :class="`short-product ${itemSelected(prom.cod_prom)}`"
        @click="selectProduct(prom.cod_prom, prom.cantidad_prom)"
      >
        <ItemProm
          :id_prom="prom.cod_prom"
          :nombre="prom.nombr_prom"
          :precio="prom.precio_prom"
          :descripcion="prom.descrip_prom"
          :fecha_ini="prom.fecha_ini"
          :fecha_fin="prom.fecha_fin"
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
          <a class="page-link" href="#" @click="nextPag">Siguiente</a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
import Item from "@/components/admin_prod/Item.vue";
import ItemProm from "@/components/admin_prod/ItemProm.vue";


export default {
  name: "Short",
  props: ["multipleSelect", "onlyUnits"],
  components: {
    Item, ItemProm
  },
  data: function () {
    return {
      pagina: 1,
      pagCount: 1,
      orden: "nombre_prod",
      mostrar: "products",
      produtSelect: -1,
      products: [],
      promotions: [],
      arrayNext: [],
      arrayAnt: [],
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
    };
  },
  methods: {
    selectOrder(index) {
      this.orden = this.mostrar == "products" ? this.orderButtons[index].order : this.orderButtons[index].orderProm;
      this.pagina = 1;
      this.selectProduct(-1,0,true);
      this.getProducts();
    },
    selectMostrar(show){
      if(this.mostrar == show){
        return;
      }
      this.mostrar = show;
      this.$emit("tipo", this.mostrar)

      for(let order_select of this.orderButtons){
        if(order_select.order == this.orden){
          this.orden = order_select.orderProm;
        }else if(order_select.orderProm == this.orden){
          this.orden = order_select.order;
        }
      }

      this.pagina = 1;
      this.selectProduct(-1,0,true);
      this.getProducts();
    },
    selectProduct(id, cantidad, changePage) {
      if(this.multipleSelect){
        if(changePage){
          return;
        }
        if(id in this.$store.state.groupIDselected){
          this.$store.commit("deleteID", id);
        }else{
          this.$store.commit("addID", [id, cantidad]);
        }
      }else{
        if(this.produtSelect[0] == id){
          this.produtSelect = [-1,0];
        }else{
          this.produtSelect = [id,cantidad];
        }
        this.$store.commit("changeSelection", this.produtSelect);
      }
    },
    itemSelected(id){
      if(this.multipleSelect){
        return id in this.$store.state.groupIDselected ? 'short-product_select' : '';
      }else{
        return id == this.produtSelect[0] ? 'short-product_select' : '';
      }
    },
    async getProducts() {
      let query = `${this.mostrar}?criterio=${this.orden}&page=${this.pagina}&limit=10`;
      if(this.mostrar == "products" && this.onlyUnits){
        query += "&filter=1";
      }
      const response = await this.$http.get(query);

      const data = response.data;
      const arrayCount = parseInt(data.cant[0].count);

      if (arrayCount%10 == 0)
        this.pagCount = Math.trunc(arrayCount / 10);
      else this.pagCount = Math.trunc(arrayCount / 10) + 1;

      this.arrayNext = data.next;
      this.arrayAnt = data.previus;

      if(this.mostrar == "products"){
        this.products = data.results;
      }else{
        this.promotions = data.results;
      }
      
    },

    prevPag() {
      this.pagina--;
      this.selectProduct(-1,0,true);
      this.getProducts();
    },
    nextPag() {
      this.pagina++;
      this.selectProduct(-1,0,true);
      this.getProducts();
    },
    setPage(index) {
      this.pagina = index;
      this.selectProduct(-1,0,true);
      this.getProducts();
    }
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
  box-shadow: 0px 0px 10px 0px #888;
}
</style>
