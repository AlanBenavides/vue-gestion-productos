<template>
  <nav class="navbar navbar-expand-xl navbar-light bg-light">
    <a href="#" class="navbar-brand"
      ><i class="fa fa-cube"></i>Online<b>Store</b></a
    >
    <div class="navbar-nav">
      <div>
        <a href="#" class="nav-link"
          ><img src="@/assets/logo.png" height="30px" width="30px" /> Paula
          Wilson <b class="caret"></b
        ></a>
      </div>
    </div>
  </nav>
</template>

<script>

export default {
  name: "Nav"
};
</script>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
}

</style>
