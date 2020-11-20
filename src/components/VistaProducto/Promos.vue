<template>
    <section class="promos">
            <div class="promos_container">
                <h1 class="promos_header">Promociones:</h1>
                <p v-if="proms.length >= 1" class="datos_promo">
                    <ul>
                    <li v-for="(prom, index) in proms" :key="index" class="promos_list">
                        <router-link to="/"> {{ prom.nombr_prom }} </router-link>
                    </li>
                    </ul>
                </p>
            </div>
    </section>
</template>

<script>

export default {
    name: "Promos",
    props: ["proms"],
    data: function(){
        return {
        };
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