<template>
  <section class="discount">
    <div class="disc_container">
      <h1 class="disc_header">Descuento:</h1>
      <ul class="no-bullets">
        <div v-for="(dis, index) in disc" :key="index" class="disc_info">
          <label class="disc_percent"> {{ dis.porcentaje }}% </label> por la
          compra de:
          <label class="disc_quant"> {{ dis.cantidad_req }} unidades</label>
          <div class="disc_price_data">
            Precio:
            <span class="disc_price">
              {{
                (
                  (dis.precio_unid - (dis.precio_unid * dis.porcentaje) / 100) *
                  dis.cantidad_req
                ).toFixed(2)
              }}Bs.
            </span>
            <span>
              ({{
                (
                  dis.precio_unid -
                  (dis.precio_unid * dis.porcentaje) / 100
                ).toFixed(2)
              }}Bs. c/u)
            </span>
          </div>
        </div>
      </ul>
    </div>
  </section>
</template>

<script>
export default {
  name: "Discounts",
  props: ["disc"],
  data: function () {
    return {};
  },
};
</script>

<style scoped>
.discount {
  text-align: left;
  font-size: 1.1rem;
  font-weight: 700;
}
ul.no-bullets {
  list-style-type: none;
  margin: 0;
  padding: 0;
}
.disc_header {
  color: var(--font-color-primary);
  font-weight: 700;
  font-size: 1.7rem;
}
.disc_container {
  background-color: var(--background);
  padding: 1rem;
  border-radius: var(--border-radius);
}
.disc_percent {
  color: var(--font-discount-after);
}

.disc_price_data {
  color: var(--font-color-primary);
  left: 50%;
  position: absolute;
  font-weight: 600;
  display: inline-block;
}
.disc_quant {
  color: var(--font-color-primary);
}
.disc_price {
  color: var(--font-discount-before);
  font-weight: 600;
  font-size: 1.1rem;
}

.disc_info {
  text-align: left;
  font-size: 1.1rem;
  margin: 1rem;
  margin-left: 0;
  color: var(--font-color-secondary);
}
</style>
