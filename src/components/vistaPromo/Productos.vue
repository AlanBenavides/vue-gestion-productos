<template>
            <section class="prods">
            <div class="prods_cotainer">
               <h2 class="prod_header">Lista de productos:</h2></div>
                    <ul>
                    <li v-for="(prod, index) in prods" :key="index">
                      <div class="prods_list">
                        <router-link to="/"> {{ prod.nombre_prod }} </router-link> 
                        <div class="price"> Precio: {{prod.precio_unid}} </div>
                      </div>
                    </li>
                    </ul>
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
  text-align: left;
  font-size: 1.1rem;
  font-weight: 700;
}
.prod_header{
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

.prods_list {
    align-items: auto;
}
.price{
    column-span: 2;
    text-align: center;
    font-size: 1rem;
    display: inline-flex;
    align-items: center;
    left:30%;
    position: absolute;
}

</style>