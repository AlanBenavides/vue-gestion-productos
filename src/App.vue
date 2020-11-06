<template>
  <div id="app">
    <Nav />
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/Admin_productos">Productos</router-link>
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
  --color-fondo: white;
  --color: #edf0f5;
  --color-btn: #2a323d;
  --color-fuente: #a09bb0;
  --background: #e8ecf1;
  --font-color-secondary: #7a7a7a;
  --font-color-primary: #3b4754;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
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

:root {
  --primary-color: rgb(192, 192, 192);
  --secondary-color: rgb(216, 216, 216);
  --font-color: black;
}
</style>
