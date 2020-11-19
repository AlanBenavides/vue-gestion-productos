<template>
    <section class="promos">
        <div>
            <div class="promos_container">
                <h1 class="promos_header">Promociones:</h1>
                <p v-if="datos[0].nombr_prom" class="datos_promo">
                    <span v-for="datos in items" :key="datos[0]" class="promos_list">
                    {{key.nombr_prom}}
                    </span>
                </p>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    name: "Promos",
    props: ["datos"],
    data: function(){
        return {};
    },
};
</script>

<style scoped>
.promos {
  text-align: left;
  font-size: 1.1rem;
  font-weight: 700;
}

.promos_container {
  background-color: var(--background);
  padding: 0.5rem 2rem;
  padding-bottom: 3rem;
  border-radius: 15px;
}

.promos_list {
    text-align: left;
    font-size: 1rem;
    margin: 2rem;
    margin-left: 0;
}
</style>