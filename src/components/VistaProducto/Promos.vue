<template>
  <section class="promos">
    <div class="promos_container">
      <h1 class="promos_header">Promociones:</h1>
      <ul class="no-bullets">
        <li v-for="(prom, index) in proms" :key="index" class="promos_list">
          <router-link :to="`/vista_promo/${prom.cod_prom}`">
            {{ prom.nombr_prom }}
          </router-link>
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
export default {
  name: "Promos",
  props: ["proms"],
  data: function () {
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
ul.no-bullets {
  list-style-type: none;
  margin: 0;
  padding: 0;
}
.promos_header {
  color: var(--font-color-primary);
  font-weight: 700;
  font-size: 1.7rem;
}
.promos_container {
  background-color: var(--background);
  border-radius: var(--border-radius);
  padding: 1rem;
}

.promos_list {
  text-align: left;
  font-size: 1.2rem;
  margin: 1rem;
  margin-left: 0;
}
</style>
