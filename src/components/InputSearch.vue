<template>
  <div>
    <label> Busque el producto que desea</label>
    <input
      maxlength="30"
      type="search"
      placeholder="Ingresa el producto que quiere buscar"
    />
    <button>Buscar</button>
  </div>
</template>

<script>
export default {
  name: "inputSearch",
  props: ["contend"],
};
</script>

<style scoped></style>
