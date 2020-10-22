import Galeria from '@/components/Galeria.vue';
<template>
  <div class="galeria">
    <h2 class="subtitulo">Galeria</h2>
    <div class="principal">
      <img src="" alt="" />
    </div>
    <div class="secundario">
      <img src="" alt="" />
      <img src="" alt="" />
    </div>
  </div>
</template>

<script>
export default {
  name: "Galeria",
};
</script>

<style scoped>
*,
*:before,
*:after {
  box-sizing: border-box;
}

.galeria {
  display: flex;
  align-items: flex-start;
  justify-content: space-evenly;
  width: 45%;
  height: 700px;
  float: left;
  flex-wrap: wrap;
  border: 2px solid black;
  margin-left: 10px;
  background: #edf0f5;
}

.subtitulo {
  margin: 0;
  margin-bottom: 10px;
  text-align: center;
  width: 100%;
  height: 20px;
}

.galeria img {
  margin: 10px;
  box-shadow: 3px gray;
  max-width: 200px;
}

.principal {
  border: 1px solid black;
  width: 100%;
  height: 50%;
}

.secundario {
  border: 1px solid black;
  width: 100%;
  height: 35%;
}
</style>
