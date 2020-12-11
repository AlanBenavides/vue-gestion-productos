<template>
  <div>
    <!-- Section for toggle modal -->
    <button
      v-if="value"
      type="button"
      data-toggle="modal"
      :data-target="`#${idModal}`"
    >
      {{ value }}
    </button>

    <img
      v-if="image == 'plus'"
      src="@/assets/plus-circle.svg"
      height="40px"
      data-toggle="modal"
      :data-target="`#${idModal}`"
    />

    <img
      v-if="image == 'edit'"
      src="@/assets/pen-solid.svg"
      height="20px"
      data-toggle="modal"
      :data-target="`#${idModal}`"
    />
    <!-- end section -->

    <div
      class="modal fade"
      :id="idModal"
      tabindex="-1"
      role="dialog"
      :aria-labelledby="`${idModal}Label`"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content border border-dark">
          <div class="modal-header">
            <h3>{{ title }}</h3>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body mb-3">
            <slot></slot>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["value", "title", "idModal", "image"],
  name: "modal",
};
</script>

<style scoped>
@media (min-width: 576px) {
  .modal-dialog {
    margin: 1.75rem auto;
  }
}

.modal-dialog {
  width: 400px;
  border-radius: var(--border-radius);
}
</style>
