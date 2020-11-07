<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h3>Integrantes</h3>
    <ul>
      <li>Alan Benavides</li>
      <li>Victor Abasto</li>
      <li>William Arce</li>
      <li>Juan Carlos Arevalo</li>
      <li>Geovanny Encinas</li>
      <li>Britany Torrico</li>
      <li>Gabriel Zurita</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
};
</script>

<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: block;
  margin: 10px;
}
</style>
