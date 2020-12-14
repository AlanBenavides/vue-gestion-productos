<template>
  <div class="image-container">
    <p>Foto de la promoción</p>
    <div class="image-add">
      <img class="img-prom" :src="imagen" @click="addFiles()" height="120" />
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
  </div>
</template>

<script>
import { required } from "vuelidate/lib/validators";

export default {
  name: "ImageAdd",
  data() {
    return {
      image: "",
    };
  },
  validations: {
    image: {
      required,
    },
  },
  methods: {
    addFiles() {
      this.$refs.files.click();
    },
    getImage() {
      let uploadedFile = this.$refs.files.files;
      let arch = uploadedFile[0];
      if (arch == undefined) {
        return;
      }
      if (/\.(jpe?g|png)$/i.test(arch.name)) {
        if (arch.size > 1024 * 1024) {
          alert(arch.name + " es muy pesado (> 1MB)");
          return;
        } else {
          let reader = new FileReader();
          reader.addEventListener("load", (event) => {
            let img = new Image();
            img.onload = () => {
              if (img.width < 640 || img.width > 1366) {
                alert(
                  "El ancho de " +
                    arch.name +
                    " debe estar entre 640px y 1366px"
                );
                return;
              } else if (img.height < 360 || img.height > 768) {
                alert(
                  "El alto de " + arch.name + " debe estar entre 360px y 768px"
                );
                return;
              } else {
                this.image = event.target.result;
                this.$emit("send-image", this.image);
              }
            };
            img.src = event.target.result;
          });
          reader.readAsDataURL(arch);
        }
      } else {
        alert(arch.name + " no es un archivo jpg o png");
      }
    },
  },
  computed: {
    imagen() {
      if (this.image == "") {
        return require("@/assets/plus-circle.svg");
      } else {
        return this.image;
      }
    },
  },
};
</script>

<style>
.image-container {
  width: 600px;
  height: 550px;
  margin: 32px;
}
.image-add {
  height: 436px;
  border-radius: var(--border-radius);
  background-color: var(--background);
}

.img-prom {
  display: block;
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-width: 500px;
  max-height: 400px;
  cursor: pointer;
}

.images_input {
  display: none;
}

.button-img {
  margin: 10px;
  border-radius: 100%;
}
</style>
