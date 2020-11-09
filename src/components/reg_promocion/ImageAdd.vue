<template>
    <div class="image-container">
        <p>Foto de la promoción</p>
        <div class="image-add">
                <img src="@/assets/add-product.png" alt="" width="340">
        </div>
    </div>
</template>

<style>

.image-container{
    width: 600px;
    height: 500px;
    margin: 32px;
}
.image-add{
    width: 536px;
    height: 436px;
    margin-top: 5px;
    border-radius: 20px;
    background-color: #ECF0F1;
    display: inline-block;
}

.image-add > img
{
    display: block;
    position: relative;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
</style>