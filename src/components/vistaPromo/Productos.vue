<template>
    <section class="prods" >
        <div class="prods_container">
        
            <div >
               <h2 class="titulo">Lista de productos:</h2></div>
                    <section class="listado">
                     <ul>
                    <li v-for="(prod, index) in proms" :key="index" >
                        <router-link class="promos_list " to="/"> {{ prod.nombre_prod }}</router-link>
                        <label class="producto_tittle">Precio:{{prod.precio_unid}}</label>
                      
                        
                    </li>
                    </ul>
                 </section>
        
        </div>
    </section>
</template>

<script>

export default {
    name: "Productos",
    props: ["proms"],
    data: function(){
        return {
            
            
        };
      
    },
    
};

</script>
<style scoped>



.prods_container {
  background-color: var(--background);
  padding: 0.5rem 2rem;
  padding-bottom: 3rem;
  border-radius: 15px;
  
}

.prods {
  text-align: default;
  font-size: 1.1rem;
  font-weight: 700;
 
}

.titulo{
   
    text-align: left;
  color: var(--font-color-secondary);
  font-weight: 700;
  font-size: 1.5rem;
  display: block;
  text-overflow: ellipsis;
}





.listado{
   
  
  gap: 1rem;
  margin: 3rem 6rem;
  margin-top: 0;
  word-wrap: break-word;
   grid-template-rows: auto auto;
  grid-template-columns: 60% 40%;
}
.promos_list {
    text-align:left;
    font-size: 1rem;
    margin: 2rem;
    margin-left: 0;
  grid-column: 1/2;
  grid-row: 2/3;
   
   
}
.producto_tittle {
 grid-column: 2/3;
  grid-row: 2/3;
  text-align: right;
  color: var(--font-color-secondary);
 
 
  text-overflow: ellipsis;
}
</style>