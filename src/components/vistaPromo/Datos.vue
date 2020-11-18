<template>
  <section class="datos">
    <div class="datos_container">
      <p class="datos_info">
        Precio:
        <span class="datos_resaltados datos_resaltados-block datos_precio"
          >{{ datos.precio_prom }}Bs.</span
        >
        
     </p>
     <p class="datos_info">
        Cantidad:
        {{ datos.cantidad_prom }}
        <span class="datos_resaltados"> paquete(s)</span>
      </p>
     <p class="datos_info">
        Valido Hasta:
        <span class="datos_resaltados">{{
          transformDate(datos.fecha_fin)
        }}</span>
      </p>
      
      <p class="datos_info">Descripcion:</p>
      <p class="datos_info datos_descripcion">
        {{ datos.descrip_prom }}
      </p>
      <div>
       <button  class="formulario_button">
            Añadir al carrito
          </button>
      </div>

     
      
    </div>
  </section>
</template>

<script>


export default {
  
  name: "Datos",
  props: ["datos"],
  data: function () {
    return {};
  },
  
  methods: {
        transformDate(value) {
      const date = new Date(value);
      return `${date.getDate() + 1}/${
        date.getMonth() + 1
      }/${date.getFullYear()}`;
    },
  
    /*async submitForm() {
      try {
        if (!this.$v.descuento.$invalid) {
          await this.sendDataDiscounts();
          alert("Descuento creado exitosamente");
        } else {
          alert("Rellene todos los datos correctamente");
        }
      } catch (error) {
        alert(error);
      }
    },*/
    
  },
  
};
</script>