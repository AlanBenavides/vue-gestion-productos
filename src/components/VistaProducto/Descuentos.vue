<template>
    <section class="discount">
            <div class="disc_container">
                <h1 class="disc_header">Descuento:</h1>
                <ul class="no-bullets">
                    <div v-for="(dis, index) in disc" :key="index" class="disc_info">
                        <label class="disc_percent"> {{dis.porcentaje}}% </label>   por la compra de: <label class="disc_quant">  {{dis.cantidad_req}} unidades</label>
                        <div class="disc_price_data">
                             Precio: <label class="disc_price"> {{((dis.precio_unid-(dis.precio_unid*dis.porcentaje/100))*dis.cantidad_req).toFixed(2)}} Bs.</label> <label class="disc_unit_price">({{(dis.precio_unid-(dis.precio_unid*dis.porcentaje/100))}} Bs. c/u)</label>
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
}

.disc_price_data{
    color:#232323;
    left:50%;
    position: absolute;
    font-weight: 600;
  font-size: 0.9rem;
  display: inline-block;
}
.disc_quant{
    color: #232323;
}
.disc_price{
    color:#629c44;
    font-weight: 600;
  font-size: 1.1rem;
  

}
.disc_unit_price{
    color:#444444;

}

.disc_info {
    text-align: left;
    font-size: 1.1rem;
    margin: 2rem;
    margin-left: 0;
    color: #7a7a7a;
}

</style>