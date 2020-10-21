<template>
    <div>
        <header>
            <Nav></Nav>
        </header>
        <h1>Administración de productos</h1>
        <Options></Options>
        <Short></Short>
    </div>
</template>

<script>
import Nav from "@/components/Nav.vue"
import Options from "@/components/admin_prod/Options.vue"
import Short from "@/components/admin_prod/Short.vue"

export default {
    name: "Admin_productos",
    components: {
        Nav,
        Options,
        Short
    },
};
</script>

<style scoped>
</style>