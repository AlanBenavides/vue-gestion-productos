<template>
    <div class="product-list">
        <div class="it-container" v-for="(product, index) of this.products" :key="index">
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
            </div>
        </div>
        <div class="it-container" :class="translate"
        v-if="this.products.length < 5">
            <h6>Nuevo Producto</h6>            
            <div class="it-add" @click="showProducts()">
                <img class="im-add" src="@/assets/add-product.png" alt="" width="340">
            </div>          
        </div>
        <ModalProduct v-if="this.showModal"></ModalProduct>
        <button class="modl-button term" @click="showProducts(); getProducts()" v-if="this.showModal">Añadir productos</button>
    </div>
</template>
<script>
import ModalProduct from "@/components/reg_promocion/ModalProduct.vue";
import Item from "@/components/admin_prod/Item.vue";

export default {
    name: "ProductList",
    components: {ModalProduct, Item},
    props: ["IDpreSelect"],
    data: () => {
        return {
            showModal: false,
            products: []
        }
    },
    methods: {
        showProducts() {
            this.showModal = !this.showModal;
        },
        async getProducts(){
            let newProducts = [];
            for(let productID of this.$store.state.groupIDselected){
                const response = await this.$http.get(
                    `products/${productID}`
                );
                newProducts.push(response.data.datos[0]);
            }
            this.products = newProducts;
        },
        deleteProduct(id){
            this.$store.commit("deleteID", id);
            this.getProducts();
        }
    },
    computed: {
        translate(){
            return {
                '':  this.products.length < 1,
                'uper': this.products.length > 0
            }
        }
    },
    mounted(){
        if(this.IDpreSelect){
            this.$store.commit("addID", parseInt(this.IDpreSelect));
            this.getProducts();
        }
    }
}
</script>
<style scoped>
.product-list{
    width: 96%;
    height: 700px;
    margin: 32px 2%;
    background-color:#D0D3D4;
    white-space: nowrap;
    overflow-x: scroll;
    overflow-y: hidden;
}

.it-container{
    margin-top: 20px;
    display: inline-block;
}
.it-add{
    width: 370px;
    height: 600px;
    margin: 32px;
    margin-top: 5px;
    border-radius: 20px;
    background-color: #ECF0F1;
    
}

.im-add
{
    position: relative;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

.term{
    bottom: 60px;
    left: 50%;
    transform: translate(-80%);
}
.modl-button{
    z-index: 1;
    margin: 20px;
    position: fixed;
}

.del-button{
    position: relative;
    left: 40%;
    top: 2%;
    height: 40px;
    width: 40px;
    border-radius: 100%;
}
.uper {
    transform: translate(0px,-80px);
}
</style>