<template>
    <div class="short">
        <h5>Lista de productos</h5>
        <h6>Ordenar por:</h6>
        <div class="btn-group">
            <button type="button" class="btn btn-secondary">Alfabeticamente</button>
            <button type="button" class="btn btn-secondary">Más recientes</button>
            <button type="button" class="btn btn-secondary">Menor inventario</button>
            <button type="button" class="btn btn-secondary">Precio</button>
        </div>
        <div class="list">
            <Item></Item>
            <Item></Item>
            <Item></Item>
            <Item></Item>
        </div>
    </div>
</template>

<script>
import Item from "@/components/admin_prod/Item.vue"

export default {
    name: "Short",
    components: {
        Item
    },
    data: function(){
        return{
            productos: [
                {id: 1, nombre: "laptop"},
                {id: 2, nombre: "licuadora"},
                {id: 3, nombre: "sandias"}
            ]
        }
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
        align-items: stretch;
    }
</style>