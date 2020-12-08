<template>
  <div>
    <h3>Lista de productos:</h3>
    <div>
      <h4>Ordenar por:</h4>
      <aside class="short-buttonlist">
        <button
          v-for="(button, index) in sortButtons"
          :key="index"
          @click="selectOrder(index)"
          :class="`short-button ${
            currentSort == button.productSort || currentSort == button.promotionSort? 'short-button_select' : ''
          }`"
        >
          {{ button.type }}
        </button>
      </aside>
      <h4 v-if="!showOnlyProductsWithUnits">Mostrar:</h4>
      <aside class="short-buttonlist" v-if="!showOnlyProductsWithUnits">
        <button class="short-button"
          @click="selectShow('products')"
        >Productos</button>
        <button class="short-button"
          @click="selectShow('promotions')"
        >Promociones</button>
      </aside>
    </div>
    <div class="short-list" v-if="show == 'products'">
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
          :clickeable="showOnlyProductsWithUnits"
        />
      </div>
    </div>
    <div class="short-list" v-if="show == 'promotions'">
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
        <li class="" :class="`page-item ${this.currentPage <= 1 ? 'disabled' : ''}`">
          <a class="page-link" href="#" @click="prevPag">Anterior</a>
        </li>
        <div class="scrollable-pages">
          <li
            class="page-item"
            v-for="index in pagCount"
            :key="index"
            :class="currentPage == index ? 'active' : ''"
          >
            <a class="page-link" href="#" @click="setPage(index)">{{ index }}</a>
          </li>
        </div>
        <li
          :class="`page-item ${this.currentPage >= this.pagCount ? 'disabled' : ''}`"
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
  props: ["allowMultipleSelect", "showOnlyProductsWithUnits"],
  components: {
    Item, ItemProm
  },
  data: function () {
    return {
      currentPage: 1,
      pagCount: 1,
      currentSort: "nombre_prod",
      show: "products",
      productSelected: -1,
      products: [],
      promotions: [],
      arrayNext: [],
      arrayAnt: [],
      sortButtons: [
        {
          productSort: "nombre_prod",
          promotionSort: "nombr_prom",
          type: "Alfabéticamente",
        },
        {
          productSort: "fecha_adic",
          promotionSort: "fecha_ini",
          type: "Más recientes",
        },
        {
          productSort: "cantidad",
          promotionSort: "cantidad_prom",
          type: "Menor inventario",
        },
        {
          productSort: "precio_unid",
          promotionSort: "precio_prom",
          type: "Precio",
        },
      ],
    };
  },
  methods: {
    selectOrder(sortButtonIndex) {
      this.currentSort = this.show == "products" ? this.sortButtons[sortButtonIndex].productSort : this.sortButtons[sortButtonIndex].promotionSort;
      this.currentPage = 1;
      this.selectProduct(-1,0,true);
      this.getProducts();
    },
    selectShow(showOption){
      if(this.show == showOption){
        return;
      }
      this.show = showOption;
      this.$emit("itemtype", this.show)

      for(let order_select of this.sortButtons){
        if(order_select.productSort == this.currentSort){
          this.currentSort = order_select.promotionSort;
        }else if(order_select.promotionSort == this.currentSort){
          this.currentSort = order_select.productSort;
        }
      }

      this.currentPage = 1;
      this.selectProduct(-1,0,true);
      this.getProducts();
    },
    selectProduct(productSelectedId, productSelectedCount, isChangingPage) {
      if(this.allowMultipleSelect){
        if(isChangingPage){
          return;
        }
        if(productSelectedId in this.$store.state.groupIDselected){
          this.$store.commit("deleteID", productSelectedId);
        }else{
          this.$store.commit("addID", [productSelectedId, productSelectedCount]);
        }
      }else{
        if(this.productSelected[0] == productSelectedId){
          this.productSelected = [-1,0];
        }else{
          this.productSelected = [productSelectedId,productSelectedCount];
        }
        this.$store.commit("changeSelection", this.productSelected);
      }
    },
    itemSelected(id){
      if(this.allowMultipleSelect){
        return id in this.$store.state.groupIDselected ? 'short-product_select' : '';
      }else{
        return id == this.productSelected[0] ? 'short-product_select' : '';
      }
    },
    async getProducts() {
      let query = `${this.show}?criterio=${this.currentSort}&page=${this.currentPage}&limit=10`;
      if(this.show == "products" && this.showOnlyProductsWithUnits){
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

      if(this.show == "products"){
        this.products = data.results;
      }else{
        this.promotions = data.results;
      }
      
    },

    prevPag() {
      this.currentPage--;
      this.selectProduct(-1,0,true);
      this.getProducts();
    },
    nextPag() {
      this.currentPage++;
      this.selectProduct(-1,0,true);
      this.getProducts();
    },
    setPage(index) {
      this.currentPage = index;
      this.selectProduct(-1,0,true);
      this.getProducts();
    }
  },
  mounted: async function () {
    this.$emit("itemtype", this.show)
    await this.getProducts(this.currentPage, this.currentSort);
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
  border-radius: 3px;
}
</style>
