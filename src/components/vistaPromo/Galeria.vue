import Galeria from '@/components/Galeria.vue';
<template>
  <section class="galeria">
    <div>
      <div class="galeria_fondo">
        <img
          class="galeria_image-principal"
          :src="imagenes"
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
  border-radius: var(--border-radius);
  max-width: 95%;
  max-height: auto;
  align-items: center;
}
.galeria_image {
  border-radius: var(--border-radius);
  place-self: center;
}
.galeria_fondo {
  background-color: var(--background);
  height: 400px;
  border-radius: var(--border-radius);
  display: flex;
  margin-bottom: 1rem;
  justify-content: center;
  align-items: center;
}
</style>
