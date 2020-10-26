import Galeria from '@/components/Galeria.vue';
<template>
  <div class="container">
    <!-- vista foto principal -->
    <div class="row cont-principal">
      <div class="col-12 text-center">
        <img class="principal" src="../assets/logojs.png" alt="valió :v " />
      </div>
    </div>
    <!-- carrusel de fotos (imagenes de prueba) -->
    <div
      id="carousel"
      class="carousel slide"
      data-ride="carousel"
      data-interval="false"
    >
      <div class="carousel-inner">
        <div class="carousel-item active">
          <div class="row">
            <div class="col-5">
              <img src="../assets/logo.png" class="img-responsive" alt="" />
            </div>
            <div class="col-5">
              <img src="../assets/logo.png" class="img-responsive" alt="" />
            </div>
          </div>
        </div>
        <div class="carousel-item">
          <div class="row">
            <div class="col-5">
              <img src="../assets/logojs.png" class="img-responsive" alt="" />
            </div>
            <div class="col-5">
              <img src="../assets/logojs.png" class="img-responsive" alt="" />
            </div>
          </div>
        </div>
        <div class="carousel-item">
          <div class="row">
            <div class="col-5">
              <img src="../assets/logojs.png" class="img-responsive" alt="" />
            </div>
            <div class="col-5">
              <img src="../assets/logojs.png" class="img-responsive" alt="" />
            </div>
          </div>
        </div>
      </div>
      <!-- boton siguiente  -->
      <a
        class="carousel-control-next"
        href="#carousel"
        role="button"
        data-slide="next"
      >
        <i class="fa fa-chevron-right"></i>
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="sr-only">Siguiente</span>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "Galeria",
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
  padding: 50px;
}

.cont-principal {
  padding: 50px;
  margin-bottom: 50px;
  height: 500px;
  background: var(--color);
}

.principal {
  width: 100%;
  height: 100%;
  max-height: 400px;
}

.carousel {
  height: 100%;
  min-height: 200px;
  max-height: 200px;
  background: var(--color);
}

img {
  width: 100%;
  height: 100%;
  max-height: 200px;
}

.carousel-control-next-icon {
  height: auto;
  width: auto;
  background-size: 100%, 100%;
  background-image: none;
}

.carousel-control-next-icon:after {
  content: ">";
  font-size: 40px;
  color: var(--color-btn);
}
</style>
