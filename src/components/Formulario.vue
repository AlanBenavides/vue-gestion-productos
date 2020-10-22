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
            <form  class="formulario">
              <label
                >Nombre del Producto:<input type="text" required v-model="nombre"></label>
                
              <label
                >decription:<textarea cols="30" rows="10"></textarea>
              </label>
              <label>Categoria:</label>
              <select name="CATEGORIA">
                <option selected value="0">Elige una opción</option>
                <option value="Farmacia">Farmacia</option>
                <option value="Electronicos">Electronicos</option>
                <option value="Ropa">Ropa</option>
                <option value="Alimentos">Alimentos</option>
                <option value="Entretenimiento">Entretenimieto</option>
              </select>
              <label
                >Precio por unidad (Bs.):<input class="precio" type="number"
              /></label>

              <p>
                Cantidad:<br />

                <label
                  ><input
                    type="radio"
                    name="cantidad"
                    value="unidades"
                  />Unidades</label
                ><br />
                <input type="number" />

                <label
                  ><input
                    type="radio"
                    name="cantidad"
                    value="peso"
                  />Peso</label
                ><br />
                <input class="peso" type="number" />
                <select name="UNIDAD PESO" class="unidad">
                  <option selected value="0">Elige una opción</option>
                  <option value="1">Kilogramos</option>
                  <option value="2">Libras</option>
                  <option value="3">Litros</option>
                  <option value="4">Galones</option>
                  <option value="5">Onzas</option>
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
              />

              <div>
                <ion-col text-rigth>
                  <button class="boton" @click="crear">Confirmar</button>
                </ion-col>
              </div>
            </form>
            {{ nombre}}
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
        
      },
      nombre:""
    };
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
.unidad {
  margin: 0 30px;
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
</style>
