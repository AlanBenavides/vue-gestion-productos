<template>
  <div class="container">
    <div class="nombre">{{ products.nombre_prod }}</div>
    <div class="datos">
      <!-- precio -->
      <div class="row">
        <div class="col-12">Precio por unidad</div>
        <div class="col-3" v-if="products.desc == null">
          {{ products.precio_unid }}(Bs.)
        </div>
        <div class="col-3" id="precio_desc" v-if="products.desc != null">
          {{ products.precio_unid }} (Bs.)
        </div>
      </div>
      <!-- la base de datos actual no trabaja con descuento, por lo que  valor products.precio_desc es null; no muestra nada -->
      <div class="row">
        <div class="col-3">{{ products.precio_desc }} (Bs.)</div>
        <div class="col-9">{{ products.precio_desc }} % OFF</div>
      </div>
      <!-- peso -->
      <div class="row">
        <div class="col-3">Peso:</div>
        <div class="col-9">{{ products.peso }} {{ products.unidad_med }}</div>
      </div>
      <!-- Existencias -->
      <div class="row">
        <div class="col-3">Existencias:</div>
        <div class="col-9">{{ products.cantidad }}</div>
      </div>
      <!-- Fecha -->
      <div class="row" v-if="products.fecha_venc != null">
        <div class="col-3">Fecha de vencimiento:</div>
        <div class="col-9">{{ products.fecha_venc }}</div>
      </div>
      <!-- Descripcion -->
      <div class="row" v-if="products.descripcion != null">
        <div class="col-3">Sobre este Producto:</div>
      </div>
      <div class="row">
        <div class="col-12" id="descripcion">{{ products.descripcion }}</div>
      </div>
      <!-- Cantidad de productos a comprar, sin funcionalidad, ya es parte de otro subsistema-->
      <div class="row">
        <div class="col-3">Cantidad:</div>
        <div class="col-3"><input class="w-50" type="number" /></div>
        <div class="col-3">unidad/es</div>
      </div>
      <br />
      <!-- Boton de añadir al carrito -->
      <div class="row">
        <div class="col-4"></div>
        <div class="col-4"></div>
        <div class="col-4 d-flex justify-content-end">
          <button type="button" class="btn-lg carrito">
            Añadir al carrito
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Datos",

  data: function () {
    return {
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
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

.container {
  height: 700px;
  width: auto;
  padding: 50px;
}

.col-9,
.col-3,
.col-4,
.col-12 {
  text-align: left;
  padding: 10px 10px;
}

.datos {
  padding: 30px;
  width: 100%;
  height: auto;
  background: var(--color);
}

.nombre {
  font-size: 35px;
  color: var(--color-fuente);
}
.carrito {
  width: 100%;
  color: white;
  background: var(--color-btn);
}

#precio_desc {
  text-decoration: line-through;
}
</style>
