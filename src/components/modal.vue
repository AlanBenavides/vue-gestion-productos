<template>
  <div>
  <div type="button" class="button" data-toggle="modal" data-target="#exampleModal">
 {{value}}
</div>

<div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
  
      <slot></slot>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
        
      </div>
    </div>
  </div>
</div>
  </div>
</template>

<script>

export default {
    props:["value"],
  name: "example",
   
};
</script>

<style scoped>

@media (min-width: 576px){
.modal-dialog {
    max-width: 1100px;
    margin: 1.75rem auto;
}
}
.button{
    border:1px solid black;

}
</style>