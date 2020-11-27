<template>
  <nav class="navbar navbar-expand-xl navbar-light bg-light">
    <a href="#" class="navbar-brand"
      ><i class="fa fa-cube"></i>Online<b>Store</b></a
    >
    <div class="navbar-nav">
      <div>
        <button @click="changePass" class="nav-link">
          <img src="@/assets/logo.png" height="30px" width="30px" /> Paula
          Wilson <b class="caret"></b>
        </button>
      </div>
    </div>
  </nav>
</template>

<script>

export default {
  name: "Nav",
  methods: {
    changePass() {
      if (this.$store.state.auth) this.$store.commit("logout");
      else this.$store.commit("login");
    },
  },
};
</script>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
}

.nav-link {
  border: none;
  background: none;
}
</style>
