<template>
  <div class="modal-produc">
    <Short
      class="modal-pcontent"
      :allowMultipleSelect="true"
      :showOnlyProductsWithUnits="true"
    ></Short>
  </div>
</template>
<script>
import Short from "@/components/admin_prod/Short.vue";
export default {
  name: "ModalProduct",
  components: { Short },
};
</script>
<style scoped>
.modal-produc {
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  padding-top: 50px;
  padding-bottom: 60px;
  position: fixed;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  overflow: scroll;
}

.modal-pcontent {
  background-color: white;
  width: 80%;
  padding: 20px;
  border-radius: var(--border-radius);
  overflow-y: scroll;
}
</style>
