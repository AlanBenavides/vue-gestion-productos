<template>
    <section class="promos">
            <div class="promos_container">
                <h1 class="promos_header">Promociones:</h1>
                    <ul class="no-bullets">
                    <li v-for="(prom, index) in proms" :key="index" class="promos_list">
                        <router-link :to="`/vista_promo/${prom.cod_prom}`"> {{ prom.nombr_prom }} </router-link>
                    </li>
                    </ul>
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
ul.no-bullets{
  list-style-type: none;
  margin: 0;
  padding: 0;
}
.promos_container {
  background-color: var(--background);
  padding: 0.5rem 2rem;
  padding-bottom: 3rem;
  border-radius: 15px;
}

.promos_list {
    text-align: left;
    font-size: 1.2rem;
    margin: 2rem;
    margin-left: 0;
}

</style>