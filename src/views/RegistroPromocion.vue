<template>
    <div>
        <ProductList></ProductList>
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
    }
}
</script>
<style>
.inline-elem{
    display: inline-block;
}
</style>
