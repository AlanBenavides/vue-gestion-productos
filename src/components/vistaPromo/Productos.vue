<template>
    <section >
        <div>
            <section class="promos_container">
            <div >
               <h2 class="abajo">Lista de productos:</h2></div>
                    <section class="listado">
                     <ul>
                    <li v-for="(prom, index) in proms.datos" :key="index" >
                        <router-link class="promos_list " to="/"> {{ prom.nombre_prod }}</router-link>
                        <label class="producto_tittle">Precio:{{prom.precio_unid}}</label>
                      
                        
                    </li>
                    </ul>
                   </section>
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





.abajo{
   
    text-align: left;
  color: var(--font-color-secondary);
  font-weight: 700;
  font-size: 1.5rem;
  display: block;
  text-overflow: ellipsis;
}

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


.listado{
   
  
  gap: 1rem;
  margin: 3rem 6rem;
  margin-top: 0;
  word-wrap: break-word;
   grid-template-rows: auto auto;
  grid-template-columns: 60% 40%;
}
.promos_list {
    text-align: left;
    font-size: 1rem;
    margin: 2rem;
    margin-left: 0;
  
   
   
}
.producto_tittle {
 grid-column: 2/3;
  grid-row: 2/3;
  text-align: right;
  color: var(--font-color-secondary);
 
 
  text-overflow: ellipsis;
}
</style>