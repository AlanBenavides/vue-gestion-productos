import Galeria from '@/components/Galeria.vue';
<template>
  <section class="galeria">
    <div>
      <div class="galeria_carrusel-principal">
        <img
          class="galeria_image-principal"
          :src="imagenes.slice(0, 1)"
          height="360px"
          :alt="name"
        />
      </div>
      <div class="galeria_carrusel" v-if="imagenes.length > 1">
        <button class="galeria_button" @click="prev" :disabled="thereIsPrev">
          <img src="@/assets/keyboard_arrow_left-24px.svg" alt="prev" />
        </button>
        <img
          v-for="(value, index) in imagenes.slice(ini, fin)"
          :key="index"
          :src="value"
          :alt="name"
          class="galeria_image"
          height="200px"
        />
        <span v-if="imagenes.length == 1"></span>
        <span v-if="imagenes.length == 2"></span>
        <button class="galeria_button" @click="next" :disabled="thereIsNext">
          <img src="@/assets/keyboard_arrow_right-24px.svg" alt="next" />
        </button>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "Galeria",
  props: ["imagenes", "name"],
  data: function () {
    return {
      ini: 1,
      fin: 3,
    };
  },
  computed: {
    thereIsPrev() {
      if (this.ini == 2) return false;
      return true;
    },
    thereIsNext() {
      if (this.imagenes.length > this.fin) return false;
      return true;
    },
  },
  methods: {
    prev() {
      if (!this.thereIsPrev) {
        this.ini--;
        this.fin--;
      }
    },
    next() {
      if (!this.thereIsNext) {
        this.ini++;
        this.fin++;
      }
    },
  },
};
</script>

<style scoped>
.galeria {
  user-select: none;
}

.galeria_carrusel-principal {
  background-color: var(--background);
  height: 400px;
  border-radius: 15px;
  display: flex;
  margin-bottom: 1rem;
  justify-content: center;
  align-items: center;
}

.galeria_image-principal {
  border-radius: 15px;
  max-width:95%;
   height:auto;
    align-items: center;
}

.galeria_carrusel {
  border-radius: 15px;
  background-color: var(--background);
  display: grid;
  gap: 1rem;
  grid-template-columns: 50px 1fr 1fr 50px;
  padding: 0.5rem;
}

.galeria_image {
  border-radius: 15px;
  place-self: center;
  max-width:100%;
   height:auto;
    align-items: center;
}

.galeria_button {
  border: none;
  background-color: transparent;
  border-radius: 15px;
}
.galeria_button:disabled {
  cursor: not-allowed;
}
</style>
