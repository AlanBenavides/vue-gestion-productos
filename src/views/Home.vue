<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <InputSearch :contend="data" />
    <HelloWorld msg="Mi primera app en vue" />
  </div>
</template>

<script>
import HelloWorld from "@/components/HelloWorld.vue";
import InputSearch from "@/components/InputSearch.vue";

export default {
  name: "Home",
  components: {
    HelloWorld,
    InputSearch,
  },
  data: function () {
    return {
      data: [],
    };
  },
  mounted() {},
};
</script>
