<template>
  <div v-if="show">
    {{message}}
    <button @click="takeDecision(true)">Confirmar</button>
    <button @click="takeDecision(false)">Cancelar</button>
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
      
      
      return "estoy retonando";
    },
    takeDecision(decision){
      this.decision = decision;
      this.show = false;
    },
  }
}
</script>