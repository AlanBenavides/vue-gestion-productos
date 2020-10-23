<template>
    <div class="short">
        <h5>Lista de productos</h5>
        <h6>Ordenar por:</h6>
        <div class="btn-group">
            <button type="button" class="btn" :class="orden=='nombre' ? 'btn-primary':'btn-light'" @click="orden='nombre'; pagina=1;">Alfabeticamente</button>
            <button type="button" class="btn" :class="orden=='fecha' ? 'btn-primary':'btn-light'" @click="orden='fecha'; pagina=1">Más recientes</button>
            <button type="button" class="btn" :class="orden=='existencias' ? 'btn-primary':'btn-light'" @click="orden='existencias'; pagina=1">Menor inventario</button>
            <button type="button" class="btn" :class="orden=='precio' ? 'btn-primary':'btn-light'" @click="orden='precio'; pagina=1">Precio</button>
        </div>
        <div class="list">
            <Item v-for="producto of productos" :key="producto.id"
            :product_id="producto.id" 
            :nombre="producto.nombre"
            :precio="producto.precio"
            :desripcion="producto.descripcion"
            :fecha="producto.fecha"></Item>
        </div>
        <nav aria-label="Page navigation example">
            <ul class="pagination justify-content-center">
                <li class="page-item" :class="previousEnabled">
                    <a class="page-link" tabindex="-1" @click="pagina--">Anterior</a>
                </li>
                <li class="page-item" v-for="i in pagCount" :key="i" :class="pagina == i ? 'active': ''">
                    <a class="page-link" @click="pagina=i">{{i}}</a>
                </li>
                <li class="page-item" :class="nextEnabled">
                    <a class="page-link" @click="pagina++">Next</a>
                </li>
            </ul>
        </nav>
    </div>
</template>

<script>
import Item from "@/components/admin_prod/Item.vue"

import {    
    getProducts,
    getPagesCount
    } from "./scripts/getProducts"

export default {
    name: "Short",
    components: {
        Item
    },
    data: function(){
        return {
            pagina: 1,
            pagCount: 0,
            orden: 'nombre',
        }
    },
    computed: {
        productos(){
            return getProducts(this.pagina, this.orden)
        },
        previousEnabled(){
            return {
                '' : this.pagina > 1,
                'disabled' : this.pagina <= 1
            }
        },
        nextEnabled(){
            return {
                '' : this.pagina < this.pagCount,
                'disabled' : this.pagina >= this.pagCount
            }
        }
    },
    mounted: function() {
        this.pagCount = getPagesCount()
    }
}
</script>

<style scoped>
    .short{
        width: 65%;
        float: right;
        margin-left: 5%;
        text-align: left;
    }
    .list {
        display: flex;
        flex-wrap: wrap;
        align-items: stretch;
    }
</style>