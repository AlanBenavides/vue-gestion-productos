<template>
    <div class="options btn-group-vertical">
        <button type="button" class="btn btn-secondary">APLICAR DESCUENTO</button>
        <button type="button" class="btn btn-secondary">EDITAR PRODUCTO</button>
        <button type="button" class="btn btn-secondary">AÑADIR A PROMICIÓN</button>
        <button type="button" class="btn btn-secondary">ELIMINAR PRODUCTO</button>
    </div>
</template>

<script>
export default {
    name: "Options"
}
</script>

<style scoped>
    .options {
        padding-top: 100px;
        width: 25%;
        float: left;
    }
    .options > button {
        margin: 20px 20px 20px 20px;
    }
</style>