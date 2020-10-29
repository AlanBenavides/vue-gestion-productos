<template>
  <div class="item">
    <img src="@/assets/logo.png" :alt="nombre" />
    <h5>{{ nombre }}</h5>
    <p>{{ precio }} Bs.</p>
    <p>
      Descripcion:<br />Lorem ipsum dolor sit amet consectetur adipisicing elit.
      Molestiae non error ad nihil qui iure modi laboriosam dolorum. Amet
      distinctio veritatis vitae rerum doloribus labore sequi non quidem ducimus
      aperiam!.
    </p>
    <p>Añadido el {{ parseDate() }}</p>
  </div>
</template>

<script>
export default {
  name: "Item",
  props: ["nombre", "precio", "descripcion", "fecha"],
  methods: {
    parseDate() {
      const date = new Date(this.fecha);
      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();
      return `${day}-${month}-${year}`;
    },
  },
};
</script>

<style scoped>
.item {
  font-size: 16px;
  padding: 1rem 2rem;
  display: flex;
  flex-direction: column;
  text-align: start;
  cursor: pointer;
}

.item > img {
  margin-bottom: 1rem;
}

.item > h5 {
  padding: 0.5rem;
  padding-left: 0;
}
</style>
