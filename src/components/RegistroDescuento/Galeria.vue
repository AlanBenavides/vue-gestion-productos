import Galeria from '@/components/Galeria.vue';
<template>
  <section class="galeria">
    <div>
      <div >
        <img
          class="galeria_image-principal imagen"
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
}

.galeria_image {
  border-radius: 15px;
  place-self: center;
}
.imagen{
   padding: 3px 10px;
  border: var(--background) 5px solid;
  border-radius: 20px;
}
</style>
