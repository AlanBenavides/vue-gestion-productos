<template>
    <div class="options btn-group-vertical">
        <router-link type="button" class="btn btn-secondary" to="/about">REGISTRAR PRODUCTO</router-link>
        <router-link type="button" class="btn btn-secondary" to="/about">APLICAR DESCUENTO</router-link>
        <router-link type="button" class="btn btn-secondary" to="/about">EDITAR PRODUCTO</router-link>
        <router-link type="button" class="btn btn-secondary" to="/about">AÑADIR A PROMICIÓN</router-link>
        <router-link type="button" class="btn btn-secondary" to="/about">ELIMINAR PRODUCTO</router-link>
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
    .btn{
        margin: 20px 20px 20px 20px;
    }
</style>