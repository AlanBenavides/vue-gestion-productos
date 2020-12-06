<template>
    <div>
        <h2><strong>Registro de Promoción</strong></h2>
        <h3 class="left"><strong>Paquete de productos:</strong></h3>
        <ProductList></ProductList>
        <div class="formulario_check-error-center"
            v-if="isMoreThanTwo">
            Seleccione 2 productos como mínimo
        </div>
        <div>
            <ImageAdd class="inline-elem" @send-image="passImage($event)"></ImageAdd>
            <Form class="inline-elem" :image="imagen"></Form>
        </div>
    </div>
</template>
<script>
import Form from "@/components/reg_promocion/Form.vue";
import ProductList from "@/components/reg_promocion/ProductList.vue";
import ImageAdd from "@/components/reg_promocion/ImageAdd.vue";


export default {
    name: 'RegistroPromocion',
    components: {Form, ProductList, ImageAdd},
    data() {
        return {
            imagen:''
        }
    },
    methods:{
        passImage(newImage){
            this.imagen = newImage;
        }
    },
    computed: {
        isMoreThanTwo(){
            return Object.keys(this.$store.state.groupIDselected).length < 2
        }
    },
    destroyed() {
        this.$store.commit("updateGroup", {});
    }
}
</script>
<style scoped>
.inline-elem{
    display: inline-block;
    vertical-align: top;
}
.left{
    padding-left: 2%;
    text-align: left;
}
</style>
