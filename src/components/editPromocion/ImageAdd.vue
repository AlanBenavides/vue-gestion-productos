<template>
    <div class="image-container">
        <p>Foto de la promoción</p>
        <div class="image-add">
            <img class="img-prom" :src="imagen" alt="">
            <img class="edit-icon" src="@/assets/edit-imagen.png"  @click="addFiles()" alt="">
        </div>
        <input
            type="file"
            id="files"
            ref="files"
            accept="image/*"
            class="images_input"
            @change="getImage()"
        />
        <span class="formulario_check-error" v-if="!$v.image.required">
            Coloque una fotografia
        </span>
        <Alert ref="alert"></Alert>
    </div>
</template>

<script>
import Alert from "@/components/Alert.vue";
import { required } from "vuelidate/lib/validators";

export default {
    name: "ImageAdd",
    components: {Alert},
    data() {
        return {
            image: ''
        }
    },
    validations: {
        image: {
            required
        }
    },
    methods: {
        addFiles() {
            this.$refs.files.click();
        },
        getImage(){
            let uploadedFile = this.$refs.files.files;
            let arch = uploadedFile[0];
            if(arch == undefined){
                return;
            }
            if (/\.(jpe?g|png)$/i.test(arch.name)) {
            
                if (arch.size > 1024 * 1024) {
                    this.alert("warning",arch.name + " es muy pesado (> 1MB)");
                    return;
                } else {
                    let reader = new FileReader();
                    reader.addEventListener('load', (event) => {
                        let img = new Image();
                        img.onload = () => {
                            if (img.width < 640 || img.width > 1366) {
                                this.alert("warning",
                                    "El ancho de " +
                                    arch.name +
                                    " debe estar entre 640px y 1366px"
                                );
                                return;
                            } else if (img.height < 360 || img.height > 768) {
                                this.alert("warning",
                                    "El alto de " +
                                    arch.name +
                                    " debe estar entre 360px y 768px"
                                );
                                return;
                            }else{
                                this.image = event.target.result;
                                this.$emit("send-image", this.image);
                            }
                        }
                        img.src = event.target.result;
                    });
                    reader.readAsDataURL(arch);
                }
            } else {
                this.alert("warning",arch.name + " no es un archivo jpg o png");
            }
        },
        alert(alertType, alertMessage){
            this.$refs.alert.showAlert(alertType, alertMessage);
        }
    },
    computed: {
        imagen() {
            if(this.image == ''){
                return require("@/assets/add-product.png");
            }else{
                return this.image;
            }
        }
    },
    async mounted(){
        const response = await this.$http.get(`/promotions/image/${this.$store.state.idSelected[0]}`);
        this.image = "data:image/[jpg/png];base64,"+response.data.datos[0].imagen_prom;
        this.$emit("send-image", response.data.datos[0].imagen_prom);
    }
}
</script>

<style>

.image-container{
    width: 600px;
    height: 550px;
    margin: 32px;
}
.image-add{
    position: relative;
    height: 436px;
    border-radius: 20px;
    background-color: #ECF0F1;
}

.img-prom
{
    display: block;
    position: relative;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    max-width: 500px;
    max-height: 400px;
    cursor: pointer;
}

.images_input{
    display: none;
}

.edit-icon {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    max-width: 500px;
    max-height: 400px;
    z-index: 1;
    border-radius: 20px;
    opacity: 0;
    background-color: rgba(255, 255, 255, 0.3);
    transition: opacity 0.5s;
}

.edit-icon:hover {
    opacity: 1;
}

.button-img {
    margin: 10px;
    border-radius: 100%;
}
</style>