<template>
    <div class="item card">
        <img src="@/assets/logo.png" alt=""/>
        <h5>{{nombre}}</h5>
        <p>{{precio}}</p>
        <p>Descripcion:<br>{{descripcion}}</p>
        <p>Añadido el {{fecha}}</p>
    </div>
</template>

<script>


export default {
    name: "Item",
    data: function(){
        return {
            nombre: "Sin nombre",
            precio: "Sin precio",
            descripcion: "Sin descripcion",
            fecha: "Sin fecha"
        }
    }
}
</script>

<style scoped>
    .item{
        width: 300px;
    }
</style>