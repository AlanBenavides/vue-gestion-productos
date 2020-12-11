<template>
  <div class="search">
    <button
      class="search_button"
      :disabled="expresion.length == 0"
      @click="submit()"
    >
      <img src="@/assets/search-24px.svg" alt="search" />
    </button>
    <input
      spellcheck="false"
      class="search_input"
      maxlength="30"
      type="search"
      size="30"
      placeholder="Search"
      v-model="expresion"
      @keyup.enter="expresion.length > 0 ? submit() : ''"
    />
  </div>
</template>

<script>
export default {
  name: "inputSearch",
  data: function () {
    return {
      expresion: "",
      data: undefined,
    };
  },
  methods: {
    async submit() {
      const response = await this.$http.get(
        `search?expresion=${this.expresion}&page=1&limit=3&table=producto`
      );
      this.data = response.data;
      // console.log(this.data);
    },
  },
};
</script>

<style scoped>
input[type="search"]::-webkit-search-decoration,
input[type="search"]::-webkit-search-cancel-button,
input[type="search"]::-webkit-search-results-button,
input[type="search"]::-webkit-search-results-decoration {
  display: none;
}
.search {
  display: flex;
}
.search_input {
  border: 1px solid black;
  border-left: none;
  border-radius: var(--border-radius);
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  width: 100%;
  padding-left: 5px;
  background-color: #fff;
  outline: none;
}
.search_button {
  height: 40px;
  border: 1px solid black;
  border-right: none;
  background: transparent;
  border-top-left-radius: 15px;
  border-bottom-left-radius: 15px;
  background-color: #fff;
  padding-left: 5px;
}

.search_button:focus {
  outline: none;
  box-shadow: none;
  -webkit-box-shadow: none !important;
  box-shadow: none !important;
}

.search_button::-moz-focus-inner {
  border: 0;
}
</style>
