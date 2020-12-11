<template>
  <div v-if="show" class="confirm-background">
    <div class="confirm-dialog">
      <p class="confirm-message">{{message}}</p>
      <div class="confirm-buttons">
        <button class="ok confirm-button" @click="takeDecision(true)">Confirmar</button>
        <button class="cancel confirm-button" @click="takeDecision(false)">Cancelar</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Confirm",
  data(){
    return {
      show: false,
      message: '',
      decision: null
    }
  },
  methods: {
    showConfirm(confirmMessage){
      this.message = confirmMessage;
      this.show = true;
    },
    takeDecision(decision){
      if(this.show){
        this.decision = decision;
        this.show = false;
        this.$emit("taken-decision", this.decision);
      }
    },
  }
}
</script>

<style scoped>
.confirm-background {
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  padding-top: 50px;
  position: fixed;
  background-color: rgba(0, 0, 0, 0.4);
  overflow: scroll;
}

.confirm-dialog{
  position: relative;
  top: 20%;
  left: 50%;
  max-width: 500px;
  max-height: 500px;
  padding: 10px;
  transform: translate(-50%);
  background-color: white;
  border-radius: 10px;
}

.confirm-message {
  text-align: center;
}

.confirm-buttons {
  display: flex;
  justify-content: center;
}

.confirm-button {
  width: 100px;
  height: 40px;
  margin: 10px;
  border-color: white;
  border-radius: 10px;
}

.confirm-button:hover {
  border-color: gray;
}

.ok {
  background-color: #4CAF50;
  color: white;
}

</style>