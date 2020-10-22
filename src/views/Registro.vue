<template>
    <div>
    <Nav />
        <Formulario />
    </div>
</template>

<script>
import Nav from "@/components/Nav.vue"
import Formulario from "@/components/Formulario.vue"

export default {
    name: "Registro",
    components: {
        Nav,
        Formulario,
    },
};
</script>

<style scoped>
</style>