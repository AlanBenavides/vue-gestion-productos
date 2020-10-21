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
    </div>
</template>

<script>
export default {
    name: "Short"
}
</script>

<style scoped>
    .short{
        width: 65%;
        float: right;
        margin-left: 5%;
        text-align: left;
    }
</style>