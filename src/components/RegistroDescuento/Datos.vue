<template>
  <section class="datos"> 
 
    <div class="datos_container">
    <form  @submit.prevent="submitForm">
    
       <h2 class="producto_tittle">{{datos.nombre_prod }}:</h2>
      <p class="datos_info">
        Precio Actual:
        <span class="datos_resaltados datos_resaltados-block datos_precio"
          >{{ datos.precio_unid }}Bs.</span
        >
      </p>
      <div >
        <p>Descuento en porcentaje:</p>
        <input type="text" v-model="descuento.porcentaje"/> %
         
          <br/>
          <div class="formulario_check-error" 
            
            v-if="!$v.descuento.porcentaje.alpha2"
          >
            Ingrese un valor entero numérico.
          </div>
          <div class="formulario_check-error" 
            
            v-if="!$v.descuento.porcentaje.between"
          >
            Por favor, ingrese un valor entre (5-75)
          </div>
           <div class="formulario_check-error" 
            
            v-if="!$v.descuento.porcentaje.required"
          >
            Campo requerido
          </div><br/>
        
        <p>Unidades a comprar:</p>
        <input name="numero" type="text" v-model="descuento.cantidad" /> <br />
      
        <div class="formulario_check-error" 
            
            v-if="!$v.descuento.cantidad.required"
          >
            Campo requerido.
          </div>
          <div class="formulario_check-error" 
            
            v-if="!$v.descuento.cantidad.between"
          >
            Ingrese un valor entre(1-1000).
          </div>
          <div class="formulario_check-error" 
            
            v-if="!$v.descuento.cantidad.alpha2"
          >
            Ingrese un valor numerico.
          </div>
      </div>
      <div class="precio_descuento">
      <br />
      <label>Precio con descuento: </label>
      <span v-if="!this.$v.descuento.$invalid" >{{  
          transformPrice(datos.precio_unid)
        }} Bs.</span>
    </div>
      <div>
      <br/>
       <button :disabled="$v.descuento.$invalid" class="formulario_button">
        Aplicar descuento
      </button>
      </div>
     
      </form>
     {{descuento}}
    </div>
  </section>
</template>

<script>
import {
 between,helpers,required
} from "vuelidate/lib/validators";
const alpha2 = helpers.regex("alpha1", /^[0-9\s]*$/);

export default {
  name: "Datos",
  props: ["datos"],
  data: function () {
    return {
        descuento: {
        porcentaje:"",
        cantidad:null
      },
    };
  },
  validations:{
      descuento:{
         porcentaje:{
          between: between(5, 75),
          alpha2,
          required
       },
       cantidad:{
           between: between(1, 1000),
           alpha2,
           required
       }
      }
 
  },

  methods: {
    transformPrice(value) {
      const price = value;
      
      const newPrice=(price * this.descuento.porcentaje)/100; 
     
      console.log(` descuento${newPrice}`);
      const result=(price-newPrice).toFixed(2);
      return  `${result}`;
    },
    async submitForm() {
      try {
        if (!this.$v.descuento.$invalid) {
            //const productId = await this.sendDataDiscounts();??
            alert("Descuento creado exitosamente");
          
        } else {
          alert("Rellene todos los datos correctamente");
        }
      } catch (error) {
        alert(error);
      }
    },
    /*async sendDataDiscounts() {
      try {
        const response = await this.$http.post("discounts", {
          porcentaje:this.descuento.porcentaje,
          cantidad_req: this.descuento.cantidad
          
        });
        return response.data[0].cod_prod;
      } catch (error) {
        throw new Error("descuento rep");
      }
      console.log();
    },*/
    
   
  },
};
</script>

<style scoped>
.datos {
  text-align: left;
  font-size: 1.1rem;
  font-weight: 700;
}

.datos_info {
  margin: 2rem;
  margin-left: 0;
 
}

.datos_container {
  background-color: var(--background);
  padding: 0.5rem 2rem;
  padding-bottom: 3rem;
  border-radius: 15px;
}

.datos_resaltados {
  color: var(--font-color-secondary);
  font-weight: 700;
}

.datos_resaltados-block {
  display: block;
}

.datos_both {
  display: inline;
}

.datos_precio {
  margin: 10px;
  margin-left: 0;
  font-size: 1.4rem;
}
.formulario_button {
  margin:auto;
  display: block;
  background-color: rgb(51, 51, 51);
  padding: 13px 40px;
  color: white;
  font-size: 20px;
  font-weight: 700;
  text-align: right;
}
.formulario_check-error{
    color: red;
}
.precio_descuento{
    color: green;
}

.producto_tittle {
  grid-column: 2/3;
  grid-row: 1/2;
  text-align: left;
  color: var(--font-color-secondary);
  font-weight: 700;
  font-size: 2rem;
  display: block;
  text-overflow: ellipsis;
}


</style>
