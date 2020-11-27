<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Mi primera app en vue" />
    <!-- <modal><VistaPromo idP="2"></VistaPromo></modal>-->
  </div>
</template>

<script>
import HelloWorld from "@/components/HelloWorld.vue";
//import modal from "@/components/modal.vue";
//import VistaPromo from "@/views/VistaPromo.vue";

export default {
  name: "Home",
  components: {
    HelloWorld,
    //modal,
    //VistaPromo,
  },
  mounted() {},
};
</script>
