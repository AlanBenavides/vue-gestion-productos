<template>
  <section class="prods">
    <div class="prods_cotainer">
      <h2 class="prod_header">Lista de productos:</h2>
      <ul class="no-bullets">
        <li v-for="(prod, index) in prods" :key="index">
          <div class="prods_item">
            <router-link :to="`/producto/${prod.cod_prod}`" class="prod_link">
              {{ prod.nombre_prod }}
            </router-link>
            <span class="price">
              Precio:
              <p class="price_value">{{ prod.precio_unid }}Bs.</p>
            </span>
          </div>
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
export default {
  name: "Productos",
  props: ["prods"],
  data: function () {
    return {};
  },
};
</script>
<style scoped>
.prods {
  background-color: var(--background);
  text-align: left;
  font-size: 1.1rem;
  font-weight: 700;
  padding: 2rem;
}

.prod_header {
  font-weight: 600;
  color: var(--font-color-primary);
}

.prods_container {
  padding: 0.5rem 2rem;
  border-radius: var(--border-radius);
}

ul.no-bullets {
  list-style-type: none;
  margin: 0;
  padding: 0;
}

.prods_item {
  text-align: left;
  font-size: 1.2rem;
  margin: 1rem;
  margin-left: 2rem;
}

.price {
  align-items: right;
  position: absolute;
  left: 50%;
  color: var(--font-color-primary);
  display: inline-flex;
  font-weight: 600;
  font-size: 1.5rem;
  text-overflow: ellipsis;
}
.price_value {
  color: var(--font-color-primary);
  display: inline-flex;
  align-items: right;
  left: 100%;
  position: absolute;
  font-weight: 600;
  font-size: 1.5rem;
  text-overflow: ellipsis;
}
.price_value {
  color: #444444;
  font-weight: 600;
  font-size: 1.5rem;
  margin-left: 7%;
}

.prod_link {
  font-weight: 600;
  font-size: 1.5rem;
}
</style>
