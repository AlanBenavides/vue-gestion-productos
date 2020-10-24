<template>
<<<<<<< HEAD
    <div class="item card"  
    :class="selected"
    @click="$store.commit('change_selection', product_id)"
    >
        <img src="@/assets/logo.png" alt=""/>
        <h5>{{nombre}}</h5>
        <p>{{precio}}</p>
        <p>Descripcion:<br>{{descripcion}}</p>
        <p>Añadido el {{fecha}}</p>
    </div>
</template>

<script>

export default {
    name: "Item",
    props: ['product_id', 'nombre', 'precio', 'descripcion', 'fecha'],
    computed: {
        selected(){
            return this.$store.state.id_selected == this.product_id ? 'selected' : ''
        }
    }
}
</script>

<style scoped>
    .item{
        width: 300px;
    }
    .selected {
        border-color: blue;
        border-width: 5px;
    }
</style>
=======
  <div class="item">
    <img src="@/assets/logo.png" alt="" />
    <h5>{{ nombre }}</h5>
    <p>{{ precio }} Bs.</p>
    <p>
      Descripcion:<br />Lorem ipsum dolor sit amet consectetur adipisicing elit.
      Molestiae non error ad nihil qui iure modi laboriosam dolorum. Amet
      distinctio veritatis vitae rerum doloribus labore sequi non quidem ducimus
      aperiam!.
    </p>
    <p>Añadido el {{ fecha }}</p>
  </div>
</template>

<script>
export default {
  name: "Item",
  props: ["nombre", "precio", "descripcion", "fecha"],
};
</script>

<style scoped>
.item {
  font-size: 16px;
  padding: 1rem 2rem;
  display: flex;
  flex-direction: column;
  text-align: start;
  cursor: pointer;
}

.item > img {
  margin-bottom: 1rem;
}

.item > h5 {
  padding: 0.5rem;
  padding-left: 0;
}
</style>
>>>>>>> 0df421b597a657d81bed7c2ddaffd34dac9b902d
