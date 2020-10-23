<template>
    <div class="item card"  
    :class="selected"
    @click="$store.commit('change_selection', product_id)"
    >
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
    props: ['product_id', 'nombre', 'precio', 'descripcion', 'fecha'],
    computed: {
        selected(){
            return this.$store.state.id_selected == this.product_id ? 'selected' : ''
        }
    }
}
</script>

<style scoped>
    .item{
        width: 300px;
    }
    .selected {
        border-color: blue;
        border-width: 5px;
    }
</style>