<template>
  <div>
    <div class="contenedor">
      <h1>Registro de Producto</h1>
      <div class="contenido">
        <div class="imagenes">
          <h2>Fotos del producto:</h2>
          <br>
          <input type="file" id="files" ref="files" accept="image/*" multiple v-on:change="handleFilesUpload()"/>
          <div class="imagenes">
            <div class="grid-x">
              <div v-for="(file, key) in files" :key="key" class="file-listing">
                {{ file.name }}
                <img class="preview" v-bind:ref="'image'+parseInt( key )"/><br>
                <span class="remove-file" v-on:click="removeFile(key)">eliminar</span>
              </div>
            </div>
          </div>
          <br>
          <div class="imagenes">
            <button v-on:click="addFiles()">Añadir imagenes</button>
          </div>
          <br>
          <span class="error" v-if="!$v.files.required">Imagen requerida</span>
          <span class="error" v-if="!$v.files.maxLength">No se aceptan mas de 4 imagenes</span>
        </div>
        
        <div>
          <h2>Datos del producto:</h2>
          <form
            class="formulario"
            @submit.prevent="submitForm"
            autocomplete="off"
          >
            <div class="group">
              <label>Nombre Producto:</label>
              <input
                type="text"
                required
                v-model="producto.nombre_prod"
                id="nombre_prod"
              /><br />

              <span v-if="!$v.producto.nombre_prod.alpha" class="error"
                >No se aceptan caracteres especiales.</span
              >
              <span v-if="!$v.producto.nombre_prod.minLength" class="error"
                >Debe tener una longitud no menor a
                {{ $v.producto.nombre_prod.$params.minLength.min }}.</span
              >
              <span v-if="!$v.producto.nombre_prod.required" class="error"
                >Campo requerido.</span
              >
              <span v-if="!$v.producto.nombre_prod.maxLength" class="error"
                >Nombre muy largo maximo
                {{ $v.producto.nombre_prod.$params.maxLength.max }}
                caracteres.</span
              >
            </div>
            <label>decription:</label>
            <textarea
              v-model="producto.descripcion"
              cols="30"
              rows="10"
            ></textarea>

            <br />
            <span v-if="!$v.producto.descripcion.alpha" class="error"
              >No se aceptan caracteres especiales.</span
            >
            <span v-if="!$v.producto.descripcion.maxLength" class="error"
              >Descripcion muy larga.
              {{ $v.producto.descripcion.$params.maxLength.max }}.</span
            >
            <span v-if="!$v.producto.descripcion.required" class="error"
              >Campo requerido.</span
            ><br />

            <label for="categoria">Categoria:</label>
            <input
              list="categorias"
              name="categoria"
              id="categoria"
              v-model="producto.categoria"
            /><br />
            <span v-if="!$v.producto.categoria.required" class="error"
              >Campo requerido.</span
            ><br />
            <datalist id="categorias">
              <option value="Farmacia"></option>
              <option value="Electronicos"></option>
              <option value="Ropa"></option>
              <option value="Alimentos"></option>
              <option value="Entretenimiento"></option>
            </datalist>

            <label
              >Precio por unidad (Bs.):<input
                class="precio"
                type="number"
                v-model="producto.precio_unid"
              />
              <span v-if="!$v.producto.precio_unid.required" class="error"
                >Campo requerido.</span
              >
              <span v-if="!$v.producto.precio_unid.between" class="error"
                >Campo invalido (0-1000).</span
              ><span
                v-if="!$v.producto.precio_unid.validate_decimales"
                class="error"
                >Maximo 2 decimales!</span
              >
              <br />
            </label>

            <p>
              Cantidad:<br />

              <label
                ><input
                  type="radio"
                  value="unidades"
                  @click="clickable()"
                  v-model="producto.unidad"
                />Unidades</label
              ><br />
              <input
                class="cantidad"
                type="number"
                :disabled="producto.unidad === 'peso'"
                v-model="producto.cantidad"
              /><br />

              <span v-if="!$v.producto.cantidad.minValue" class="error"
                >Debe ser mayor a 0.</span
              >
              <span v-if="!$v.producto.cantidad.integer" class="error"
                >Solo se aceptan valores enteros.</span
              >

              <label
                ><input
                  type="radio"
                  value="peso"
                  @click="clickable()"
                  v-model="producto.unidad"
                />Peso</label
              ><br />
              <input
                class="peso"
                type="number"
                step="0.25"
                value="0.00"
                :disabled="producto.unidad === 'unidades'"
                v-model="producto.peso"
              />

              <select
                name="UNIDAD PESO"
                class="unidad"
                :disabled="producto.unidad === 'unidades'"
                v-model="producto.unidad_med"
              >
                <option selected value="">Elige una opción</option>
                <option value="Kilogramos">Kilogramos</option>
                <option value="Libras">Libras</option>
                <option value="Litros">Litros</option>
                <option value="Galones">Galones</option>
                <option value="Onzas">Onzas</option></select
              ><br />
              <span v-if="!$v.producto.peso.minValue" class="error"
                >Debe ser mayor a 0.</span
              >
              <span v-if="!$v.producto.peso.validate_decimales" class="error"
                >Maximo 2 decimales!</span
              >
            </p>

            <label for="start">Fecha de vencimiento del producto:</label>
            <input
              type="date"
              id="start"
              name="trip-start"
              value="DD/MM/AA"
              v-model="producto.fecha_venc"
            /><br />
            <span v-if="!$v.producto.fecha_venc.validate_date" class="error"
              >fecha invalida</span
            >

            <div>
              <button
                :disabled="$v.producto.$invalid"
                class="boton"
                @click="send"
              >
                Confirmar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  required,
  minLength,
  helpers,
  maxLength,
  between,
  minValue,
  integer,
} from "vuelidate/lib/validators";
const alpha = helpers.regex("alpha", /^[a-zA-Z\s]*$/);
const validate_date = (value) => {
  const date = new Date();
  const dd = date.getDate();
  const mm = date.getMonth() + 1;
  const yyyy = date.getFullYear();
  const yyvalue = parseInt(value.slice(0, 4));
  const mmvalue = parseInt(value.slice(5, 7));
  const ddvalue = parseInt(value.slice(8, 10));
  return (
    !helpers.req(value) || !(dd > ddvalue && mm >= mmvalue && yyyy >= yyvalue)
  );
};
const validate_decimales = (value) => {
  const datovalue = String(value);
  if (datovalue.indexOf(".") > 0) {
    const parts = datovalue.split("."); //array
    const dato = String(parts[1]);
    return !helpers.req(value) || !(dato.length > 2);
  } else {
    return true;
  }
};
export default {
  name: "Formulario",
  data() {
    return {
      files: [],
      producto: {
        nombre_prod: null,
        descripcion: null,
        categoria: null,
        precio_unid: null,
        unidad: null,
        cantidad: null,
        peso: "",
        unidad_med: null,
        fecha_venc: "",
      },
    };
  },
  validations: {
    producto: {
      nombre_prod: {
        required,
        minLength: minLength(2),
        maxLength: maxLength(30),
        alpha,
      },
      descripcion: {
        required,
        maxLength: maxLength(1000),
        alpha,
      },
      categoria: {
        required,
      },
      precio_unid: {
        required,
        between: between(0, 10000),
        validate_decimales,
      },
      cantidad: {
        minValue: minValue(1),
        integer,
      },
      peso: {
        minValue: minValue(0),
        validate_decimales,
      },
      fecha_venc: {
        validate_date,
      },
    },
    files: {
      required,
      maxLength: maxLength(4),
    }
  },
  methods: {
    send: function (event) {
      event.preventDefault();
      this.sendFiles();
      console.log(this.producto);
      console.log(this.files);
    },
    clickable() {
      // if somethin
      if (this.producto.unidad === "peso") {
        this.producto.peso = null;
        this.producto.unidad_med = null;
        return false;
      } else {
        if (this.producto.unidad === "unidades") {
          this.producto.cantidad = null;
          return true;
        }
      }
    },
    submitForm() {
      if (!this.$v.producto.$invalid) {
        console.log("datos correctos ", this.producto);
      } else {
        console.log("datos incorrectos");
      }
    },
    addFiles(){
      this.$refs.files.click();
    },
    handleFilesUpload(){
      let uploadedFiles = this.$refs.files.files;
      if (uploadedFiles[uploadedFiles.length-1].size > 1024*1024){
        alert('File too big (> 1MB)');
        return;
      }
      for( var i= 0; i < uploadedFiles.length; i++ ){
        this.files.push( uploadedFiles[i] );
      }
      console.log(uploadedFiles[uploadedFiles.length-1].width);
      this.getImagePreviews();
    },
    getImagePreviews(){
      for (let i = 0; i < this.files.length; i++){
        if ( /\.(jpe?g|png|gif)$/i.test( this.files[i].name ) ){
          let reader = new FileReader();
          reader.addEventListener("load", function(){
            this.$refs['image'+parseInt( i )][0].src = reader.result;
          }.bind(this), false);
          reader.readAsDataURL(this.files[i]);
        }
      }
    },
    removeFile( key ){
      this.files.splice(key, 1);
    },
    sendFiles(){
      const cant = this.files.length;
      for (let i=0; i<cant;i++){
        this.createBase64Image(this.files[i]);
      }
      this.files.splice(0, cant);
    },
    createBase64Image( fileObject ){
      const reader = new FileReader();
      reader.readAsDataURL(fileObject);
      reader.onload = (e) =>{
        this.files.push(e.target.result);
      }
    }
  },
};
</script>

<style scope>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
a {
  text-decoration: none;
  font-size: 15px;
}
:root {
  --color-principal: white;
  --color: #f5f5f5;
}
label {
  width: 100%;
  display: block;
  margin: 0.5em 0 0 0;
  display: table;
}
h1 {
  text-align: center;
}
.select,
#categoria {
  border: #e6e6fa 1px solid;
}
.unidad {
  margin: 0 30px;
  border: #e6e6fa 1px solid;
}
.contenedor {
  padding: 50px;
  margin: 20 px auto;
  width: 100%;
  height: 90%;
}
.contenido {
  display: flex;
  width: 100%;
  overflow: hidden;
  background: var(--color-principal);
}
.contenido .imagenes,
.contenido .fomulario {
  width: 60%;
}
/* Estilos formulario*/
.formulario {
  padding: 40px;
  background: var(--color);
}
.formulario input[type="text"],
.formulario textarea {
  width: 90%;
  margin-bottom: 15px;
  padding: 15px 10px;
  border: 1px solid #e6e6fa;
  outline: 0;
  height: 10px;
}
.formulario input[type="number"] {
  border: #e6e6fa 1px solid;
  width: 30%;
}
.precio {
  border: #e6e6fa 1px solid;
  display: block;
}
.peso {
  border: #e6e6fa 1px solid;
  display: inline-block;
}
.formulario input[type="date"],
.cantidad {
  max-width: 50%;
}
.formulario input[type="text"]:focus,
.formulario textarea:focus,
.formulario input[type="number"]:focus {
  border: 1px solid #00ff00;
}
.formulario textarea {
  max-width: 100%;
  min-width: 100%;
  min-height: 50px;
  max-height: 120px;
}
.boton {
  padding: 15px 35px;
  border: transparent;
  background: #696969;
  color: #e6e6fa;
  margin: 20px 70px 20px 200px;
}
span {
  color: red;
}
#preview {
  display: flex;
  justify-content: center;
  align-items: center;
}
#preview img {
  min-width: 640px;
  min-height: 360px;
  max-width: 1366px;
  max-height: 768px;
}
input[type="file"]{
  position: absolute;
  top: -500px;
}
div.file-listing img{
  max-width: 90%;
}
span.remove-file{
  color: red;
  cursor: pointer;
  float: right;
}
</style>
