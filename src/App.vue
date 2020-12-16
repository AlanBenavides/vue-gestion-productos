<template>
  <div id="app">
    <Nav />
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/Admin_productos">Productos</router-link> |
      <router-link to="/GaleryCli">Galeria Cliente</router-link>
    </div>
    <router-view />
  </div>
</template>

<script>
import Nav from "@/components/Nav.vue";

export default {
  name: "App",
  components: {
    Nav,
  },
};
</script>

<style>
:root {
  --color-title: #42b983;
  --color-subtitle: #7a7a7a;
  --color-btn: #2a323d;
  --color-btn-disable: #727272;
  --color-border: #7a7a7a;

  --background: #e8ecf1;

  --font-color-primary: #3b4754;
  --font-color-secondary: #7a7a7a;
  --font-color-error: #ff4b4b;
  --font-color-accept: #4caf50;
  --font-discount-after: #ff4b4b;
  --font-discount-before: #2ac817;
  --border-radius: 5px;
}

* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  min-height: 100vh;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
