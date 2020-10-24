import Galeria from '@/components/Galeria.vue';
<template>
  <div class="container">
    <div class="row cont-principal">
      <div class="col-12 text-center" >
        <img class="principal" src="../assets/logo.png" alt="valió :v " width="100%" height="400px">
      </div>
    </div>
          <div class="carousel">
            <div class="carousel slide" data-ride="carousel">
            <div class="carousel-inner">
              <div class="row">
                <div class="carousel-item active col-5">
                  <img class="d-block w-100" src="../assets/logojs.png" alt="First slide">
                </div>
                <div class="carousel-item active col-5">
                  <img class="d-block w-100" src="../assets/logojs.png" alt="Second slide">
                </div>
              </div>
             <button class="carousel-control-next col-2" data-slide="next"></button>
            </div>

          </div>

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

*{
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

.container{
  padding: 50px;
}

.cont-principal{
  padding: 50px;
  margin-bottom: 50px;
  height: 500px;
  background: var(--color);
}

.principal{
  height: 100;
  width: 100;
}

.carousel{
  height: 100%;
  max-height: 400px;
  background: var(--color);
}

.d-block{
  padding: 20px;
  background: var(--color);
  max-height: 400px;
}

.carousel-control-next{
  border: 1px solid var(--color-btn);
}

</style>
