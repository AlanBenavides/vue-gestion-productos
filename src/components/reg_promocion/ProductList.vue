<template>
    <div class="product-list">
        <div class="it-container" v-for="(product, index) of IDproductos" :key="index">
            <h6>Producto {{index + 1}}</h6>
            <div class="it-add">
                <Item :id_product="product"></Item>
            </div>
        </div>
        <div class="it-container uper" v-if="this.IDproductos.length < 5">
            <h6>Nuevo Producto</h6>            
            <div class="it-add" @click="showProducts()">
                <img class="im-add" src="@/assets/add-product.png" alt="" width="340">
            </div>          
        </div>
        <ModalProduct v-if="this.showModal"></ModalProduct>
        <button class="ext-button" @click="showProducts()" v-if="this.showModal">X</button>
    </div>
</template>
<script>
import ModalProduct from "@/components/reg_promocion/ModalProduct.vue";
import Item from "@/components/admin_prod/Item.vue";

export default {
    name: "ProductList",
    components: {ModalProduct, Item},
    props: {IDproductos: Array},
    data: () => {
        return {
            showModal: false
        }
    },
    methods: {
        showProducts() {
            this.showModal = !this.showModal;
        }
    }
}
</script>
<style scoped>
.product-list{
    width: 96%;
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
    width: 350px;
    height: 500px;
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

.ext-button{
    z-index: 1;
    left: 0;
    top: 0;
    margin: 20px;
    width: 40px;
    height: 40px;
    position: fixed;
}

.uper {
    transform: translate(0px,-40px);
}
</style>