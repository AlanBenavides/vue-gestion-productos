<template>
    <section class="discount">
            <div class="disc_container">
                <h1 class="disc_header">Descuento:</h1>
                <ul class="no-bullets">
                    <li v-for="(dis, index) in disc" :key="index" class="disc_info">
                        <div class="disc_percent"> {{dis.porcentaje}}% </div>
                          por la compra de
                        <div class="disc_quant">{{dis.cantidad_req}} unidades</div>
                        <div class="disc_quant">Precio : {{((dis.precio_unid-(dis.precio_unid*dis.porcentaje/100))*dis.cantidad_req).toFixed(2)}} Bs.</div>
                        <div class="disc_quant">({{(dis.precio_unid-(dis.precio_unid*dis.porcentaje/100))}} Bs. c/u)</div>
                    </li>
                    </ul>
            </div>
    </section>
</template>

<script>

export default {
    name: "Discounts",
    props: ["disc"],
    data: function(){
        return {
        };
    },
 

};

</script>

<style scoped>
.discount {
  text-align: left;
  font-size: 1.1rem;
  font-weight: 700;
}
ul.no-bullets{
  list-style-type: none;
  margin: 0;
  padding: 0;
}
.disc_header{
    color:#7a7a7a;
    font-weight: 700;
    font-size: 1.7rem;
}
.disc_container {
  background-color: var(--background);
  padding: 0.5rem 2rem;
  padding-bottom: 3rem;
  border-radius: 15px;
}
.disc_percent{
    color: #ff3823;
    display: inline-flex;
}
.disc_quant{
    color: #232323;

}
.disc_info {
    text-align: left;
    font-size: 1.2rem;
    margin: 2rem;
    margin-left: 0;
    color: #7a7a7a;
    display: inline-flex;
}

</style>