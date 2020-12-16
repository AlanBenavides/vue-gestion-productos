<template>
    <div class="product-list">
        <div class="it-container" v-for="(product, index) of this.products" :key="product.cod_prod">
            <h6>Producto {{index + 1}}</h6>
            <div class="it-add">
                <button class="del-button" @click="deleteProduct(product.cod_prod)">X</button>
                <Item 
                    :id_product="product.cod_prod"
                    :nombre="product.nombre_prod"
                    :precio="product.precio_unid"
                    :descripcion="product.descripcion"
                    :fecha="product.fecha_adic">
                </Item>
                <label>Cantidad: </label>
                <input type="number" min="1" 
                :max="product.cantidad"
                v-model.number="cant_products[product.cod_prod][0]"
                @change="upCounts(product.cod_prod)"
                onkeydown="return false"
                />
            </div>
        </div>
        <div class="it-container" v-if="this.products.length < 5">
            <h6>Nuevo Producto</h6>            
            <div class="it-add" @click="showModal=!showModal;">
                <img class="im-add" src="@/assets/add-product.png" alt="" width="340">
            </div>          
        </div>
        <ModalProduct v-if="this.showModal"></ModalProduct>
        <button class="modl-button term" @click="addProducts()" v-if="this.showModal">Añadir productos</button>
        <button class="modl-button ext" @click="updateProducts()" v-if="this.showModal">X</button>
        <Alert ref="alert"></Alert>
    </div>
    <div class="it-container" v-if="this.products.length < 5">
      <h6>Nuevo Producto</h6>
      <div class="it-add" @click="showModal = !showModal">
        <img class="im-add" src="@/assets/plus-circle.svg" height="120" />
      </div>
    </div>
    <ModalProduct v-if="this.showModal"></ModalProduct>
    <button
      class="modl-button term"
      @click="addProducts()"
      v-if="this.showModal"
    >
      Añadir productos
    </button>
    <button
      class="modl-button ext"
      @click="updateProducts()"
      v-if="this.showModal"
    >
      X
    </button>
  </div>
</template>
<script>
import ModalProduct from "@/components/reg_promocion/ModalProduct.vue";
import Item from "@/components/admin_prod/Item.vue";
import Alert from "@/components/Alert.vue";

export default {
    name: "ProductList",
    components: {ModalProduct, Item, Alert},
    data: () => {
        return {
            showModal: false,
            products: [],
            cant_products: {},
        }
    },
    methods: {
        addProducts(){
            if(Object.keys(this.$store.state.groupIDselected).length > 0){
                this.getProducts();
                this.showModal = !this.showModal;
                this.alert("success","Productos añadidos.");
            }else{
                this.alert("warning","No tienes productos seleccionados.");
            }
        },
        async getProducts(){
            let newProducts = [];
            let newCantProducts = {};
            for(let productID in this.$store.state.groupIDselected){
                const response = await this.$http.get(
                    `products/${productID}`
                );
                newProducts.push(response.data.datos[0]);
                newCantProducts[productID] = [this.$store.state.groupIDselected[productID][0],
                response.data.datos[0].cantidad];
            }
            this.products = newProducts;
            this.cant_products = newCantProducts;
        },
        deleteProduct(id){
            this.$store.commit("deleteID", id);
            this.getProducts();
        },
        updateProducts(){
            this.$store.commit('updateGroup', this.cant_products);
            this.showModal = !this.showModal;
        },
        upCounts(id){
            this.$store.state.groupIDselected[id] = this.cant_products[id]
        },
        alert(alertType, alertMessage){
            this.$refs.alert.showAlert(alertType, alertMessage);
        }
    },
    updateProducts() {
      this.$store.commit("updateGroup", this.cant_products);
      this.showModal = !this.showModal;
    },
    upCounts(id) {
      this.$store.state.groupIDselected[id] = this.cant_products[id];
    },
  },
    async mounted(){
        const response = await this.$http.get(`/promotions/${this.$store.state.idSelected[0]}`);
        const datos = response.data.prod;
        let product_previus = {};
        for(let dato of datos){
            product_previus[dato.cod_prod] = [dato.cant_prod, dato.cantidad]
        }
        this.$store.commit("updateGroup", product_previus);
        this.getProducts();

    }
    this.$store.commit("updateGroup", product_previus);
    this.getProducts();
  },
};
</script>
<style scoped>
.product-list {
  width: 96%;
  height: 750px;
  margin: 32px 2%;
  background-color: var(--background);
  white-space: nowrap;
  overflow-x: auto;
}

.it-container {
  margin-top: 20px;
  display: inline-block;
  vertical-align: top;
}
.it-add {
  width: 370px;
  height: 650px;
  margin: 32px;
  margin-top: 5px;
  border-radius: var(--border-radius);
  background-color: var(--background);
  border: 2px solid var(--color-border);
}

.im-add {
  position: relative;
  top: 40%;
  cursor: pointer;
}

.term {
  bottom: 20px;
  left: 50%;
  transform: translate(-80%);
}

.ext {
  top: 0px;
  right: 60px;
  border-radius: 100px;
  height: 60px;
  width: 60px;
  background-color: white;
  border: none;
}

.modl-button {
  z-index: 1;
  margin: 20px;
  position: fixed;
  padding: 4px;
  border: 1px solid var(--color-border);
}

.del-button {
  background-color: transparent;
  border: none;
  position: relative;
  font-weight: 600;
  font-size: 1.2rem;
  left: 40%;
  top: 10px;
  height: 40px;
  width: 40px;
  border-radius: 100%;
}
</style>
