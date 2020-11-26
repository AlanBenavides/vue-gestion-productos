import Galeria from '@/components/Galeria.vue';
<template>
  <section class="galeria">
    <div>
      <div>
        <img
          class="galeria_image-principal"
          :src="imagenes.slice(0, 1)"
          height="360px"
          :alt="name"
        />
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "Galeria",
  props: ["imagenes", "name"],
};
</script>

<style scoped>
.galeria {
  user-select: none;
}

.galeria_image-principal {
  border-radius: 15px;
  max-width:95%;
    max-height:95%;
    align-items: center;
}

.galeria_image {
  border-radius: 15px;
  place-self: center;
}
</style>
