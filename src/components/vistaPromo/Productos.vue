<template>
    <section class="prods">
            <div class="prods_cotainer">
               <h2 class="prod_header">Lista de productos:</h2>
                    <ul class="no-bullets">
                    <li v-for="(prod, index) in prods" :key="index">
                      <div class="prods_list">
                        <router-link :to="`/producto/${prod.cod_prod}`"> {{ prod.nombre_prod }} </router-link> 
                        <div class="price"> Precio:  <h3 class="price_value">  {{prod.precio_unid}}Bs. </h3></div>
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
    data: function(){
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
  
}
.prods_container {
  background-color: var(--background);
  padding: 0.5rem 2rem;
  padding-bottom: 3rem;
  border-radius: 15px;
}

ul.no-bullets{
  list-style-type: none;
  margin: 0;
  padding: 0;
}

.prods_list {
    background-color: var(--background);
    text-align: left;
    font-size: 1.2rem;
    margin: 2rem;
    margin-left: 0;
}

.price{
  color:#3b4754;
  background-color: var(--background);
  
    display: inline-flex;
    align-items: right;
    left:37%;
    position: absolute;
    font-weight: 600;
  font-size: 1rem;
  
  text-overflow: ellipsis;
}
.price_value{
  color:#444444;
  display: inline-flex;
  font-weight: 600;
  font-size: 1.5rem;
  margin-left:7%;
}
</style>