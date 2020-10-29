<template>
  <div>
    <head>
      <title>Registro de Productos</title>
    </head>
    <body>
      <div class="contenedor">
        <h1>Registro de Producto</h1>
        <div class="contenido">
          <div class="imagenes">
            <h2>Fotos del producto:</h2>
            <!--imagenes del producto-->
          </div>

          <div>
            <h2>Datos del producto:</h2>
            <form class="formulario">
              <label
                >Nombre del Producto:
                <input type="text" required v-model="producto.nombre_prod"
              /></label>

              <label
                >decription:<textarea
                  v-model="producto.descripcion"
                  cols="30"
                  rows="10"
                ></textarea>
              </label>

              <label for="categoria">Categoria:</label>
              <input
                list="categorias"
                name="categoria"
                id="categoria"
                v-model="producto.categoria"
              />
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
              /></label>

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
                />

                <label
                  ><input
                    type="radio"
                    name="cantidad"
                    value="peso"
                    @click="clickable()"
                    v-model="producto.unidad"
                  />Peso</label
                ><br />
                <input
                  class="peso"
                  type="number"
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
                  <option value="Onzas">Onzas</option>
                </select>
              </p>

              <label for="start">Fecha de vencimiento del producto:</label>
              <input
                type="date"
                id="start"
                name="trip-start"
                value="DD/MM/AA"
                min="2020-01-01"
                max="2025-12-31"
                v-model="producto.fecha_venc"
              />

              <div>
                <ion-col text-rigth>
                  <button class="boton" @click="send">Confirmar</button>
                </ion-col>
              </div>
            </form>
            {{ producto }}
          </div>
        </div>
      </div>
    </body>
  </div>
</template>

<script>
export default {
  name: "Formulario",
  data: function () {
    return {
      producto: {
        nombre_prod: null,
        descripcion: null,
        categoria: null,
        precio_unid: null,
        unidad: null,
        peso: null,
        unidad_med: null,
        fecha_venc: null,
      },
    };
  },
  methods: {
    send: function (event) {
      event.preventDefault();
      console.log(this.producto);
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
.formulario input[type="number"]:focus{
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
</style>
