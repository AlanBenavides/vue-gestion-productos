<template>
    <div>
        <ProductList></ProductList>
        <div>
            <ImageAdd class="inline-elem"></ImageAdd>
            <Form class="inline-elem"></Form>
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
}
</script>
<style>
.inline-elem{
    display: inline-block;
}
</style>
