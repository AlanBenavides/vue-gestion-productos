<template>
    <div class="product-list">
        <div class="item-container">
            <h6>Nuevo Producto</h6>
            <div class="item-add">
                <img src="@/assets/add-product.png" alt="" width="340">
            </div>
        </div>
        
    </div>
</template>
<script>
export default {
    name: "ProductList",
}
</script>
<style>
.product-list{
    width: 96%;
    margin: 32px 2%;
    background-color:#D0D3D4;
    white-space: nowrap;
    overflow-x: scroll;
    overflow-y: hidden;
}

.item-container{
    margin-top: 20px;
}
.item-add{
    width: 350px;
    height: 500px;
    margin: 32px;
    margin-top: 5px;
    border-radius: 20px;
    background-color: #ECF0F1;
    display: inline-block;
}

.item-add > img
{
    position: relative;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
</style>