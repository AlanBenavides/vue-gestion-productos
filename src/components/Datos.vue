<template>
  <div class="datos">
    <h2 class="subtitulo">name{{ products.nombre_prod }}</h2>

    <p class="datos-info__label precio">Precio por unidad</p>
    <label for="" class="datos-info__recuperados precio"
      >10{{ datos.precio }}</label
    >

    <label for="" class="datos-info__recuperados t25" id="desc">9{{}}</label>
    <label for="" class="datos-info__label t25">Bs</label>
    <label for="" class="datos-info__recuperados t25">10{{}}</label>
    <label for="" class="datos-info__label t25">OFF</label>

    <label for="" class="datos-info__label">Peso:</label>
    <label for="" class="datos-info__recuperados t25">80{{}}</label>
    <label for="" class="datos-info__label t25">kg</label>

    <label for="" class="datos-info__label">Existencias:</label>
    <label for="" class="datos-info__recuperados t25">1{{}}</label>
    <label for="" class="datos-info__label t25">unidad/es</label>

    <p class="datos-info__label" v-if="products.fecha_venc != null">
      Fecha de vencimiento:
    </p>
    <label for="" class="datos-info__recuperados">{{}}</label>

    <label for="" class="datos-info__label descripcion"
      >Sobre este producto</label
    >
    <label for="" class="datos-info__recuperados descripcion">{{
      datos.descripcion
    }}</label>

    <label for="" class="datos-info__label pedido" id="cantidad"
      >Cantidad</label
    >
    <input type="number" class="pedido" />
    <label for="" class="datos-info__label pedido" id="unidades"
      >unidad/es</label
    >

    <button class="datos-info__button">Añadir al Carrito</button>
  </div>
</template>

<script>
export default {
  name: "Datos",
  data: function () {
    return {
      datos: { nombre: "leche", descripcion: "pil", precio: 6 },
      products: {},
      boleano: true,
    };
  },

  mounted: async function () {
    const response = await this.$http.get("/products/" + this.$route.params.id);
    this.products = response.data[0];
    console.log(this.products);
  },
};
</script>

<style scoped>
*,
*:before,
*:after {
  box-sizing: border-box;
}

.datos {
  display: flex;
  align-items: flex-start;
  justify-content: space-evenly;
  width: 45%;
  height: 700px;
  float: right;
  flex-wrap: wrap;
  border: 2px solid black;
  margin-right: 10px;
  background: #edf0f5;
}

.subtitulo {
  margin: 0;
  margin-bottom: 10px;
  text-align: center;
  width: 100%;
}

label {
  margin-top: 10px;
  margin-bottom: 10px;
  width: 50%;
  color: #798087;
}

.datos-info__label {
  padding-left: 50px;
  text-align: left;
}
.datos-info__recuperados {
  text-align: left;
}

.descripcion {
  padding-left: 50px;
  width: 100%;
}

.pedido {
  width: 25%;
}

.precio {
  padding-left: 50px;
  width: 100%;
}

.t25 {
  width: 25%;
}

#desc {
  padding-left: 50px;
}

#cantidad {
  width: 50%;
}

#unidades {
  text-align: left;
}

.datos-info__button {
  width: 33%;
  padding: 15px 35px;
  border: transparent;
  background: #696969;
  color: #e6e6fa;
  margin: 100px 10px 0px 300px;
  flex-basis: auto;
}
</style>
