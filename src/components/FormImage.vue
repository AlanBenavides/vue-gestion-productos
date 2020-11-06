<template>
  <section class="imagenes">
    <h2 class="formulario_tittle">Fotos del producto:</h2>
    <br />
    <input
      type="file"
      id="files"
      ref="files"
      accept="image/*"
      multiple
      @change="handleFilesUpload()"
    />
    <div class="imagenes">
      <div class="grid-x">
        <div v-for="(file, key) in files" :key="key" class="file-listing">
          {{ file.name }}
          <img class="preview" v-bind:ref="'image' + parseInt(key)" /><br />
          <span class="remove-file" v-on:click="removeFile(key)">eliminar</span>
        </div>
      </div>
    </div>
    <br />
    <div class="imagenes">
      <button @click="addFiles()">Añadir imagenes</button>
    </div>
    <br />
    <span class="formulario_check-error" v-if="!$v.files.required"
      >Faltan fotografias</span
    >
    <span class="formulario_check-error" v-if="!$v.files.maxLength"
      >No se aceptan mas de 4 imagenes</span
    >
  </section>
</template>

<script>
import { required, maxLength } from "vuelidate/lib/validators";
export default {
  name: "FormImage",
  data() {
    return {
      files: [],
    };
  },
  validations: {
    files: {
      required,
      maxLength: maxLength(4),
    },
  },
  methods: {
    addFiles() {
      this.$refs.files.click();
    },
    handleFilesUpload() {
      let uploadedFiles = this.$refs.files.files;
      if (
        /\.(jpe?g|png)$/i.test(uploadedFiles[uploadedFiles.length - 1].name)
      ) {
        if (uploadedFiles[uploadedFiles.length - 1].size > 1024 * 1024) {
          alert("Archivo muy pesado (> 1MB)");
          this.removeFile(uploadedFiles.length - 1);
          return;
        } else {
          let arch = uploadedFiles[uploadedFiles.length - 1];
          let reader = new FileReader();
          reader.readAsDataURL(arch);
          reader.onload = (evt) => {
            let img = new Image();
            img.onload = () => {
              console.log(img.width);
              console.log(img.height);
              if (img.width < 640 || img.width > 1366) {
                alert("El ancho debe estar entre 640px y 1366px");
                this.removeFile(uploadedFiles.length - 1);
                return;
              } else if (img.height < 360 || img.height > 768) {
                alert("El alto debe estar entre 360px y 768px");
                this.removeFile(uploadedFiles.length - 1);
                return;
              }
            };
            img.src = evt.target.result;
          };
          for (var i = 0; i < uploadedFiles.length; i++) {
            this.files.push(uploadedFiles[i]);
          }
          this.getImagePreviews();
          this.$emit("sendimages", this.files); //aqui mete las imagenes a base64
        }
      } else {
        alert("Seleccione un archivo jpg o png");
        this.$emit("sendimages", []);
        return;
      }
    },
    getImagePreviews() {
      for (let i = 0; i < this.files.length; i++) {
        if (/\.(jpe?g|png)$/i.test(this.files[i].name)) {
          let reader = new FileReader();
          reader.addEventListener(
            "load",
            function () {
              this.$refs["image" + parseInt(i)][0].src = reader.result;
            }.bind(this),
            false
          );
          reader.readAsDataURL(this.files[i]);
        }
      }
    },
    removeFile(key) {
      this.files.splice(key, 1);
    },
    sendFiles() {
      const cant = this.files.length;
      for (let i = 0; i < cant; i++) {
        this.createBase64Image(this.files[i]);
      }
      this.files.splice(0, cant);
    },
    createBase64Image(fileObject) {
      const reader = new FileReader();
      reader.readAsDataURL(fileObject);
      reader.onload = (e) => {
        this.files.push(e.target.result);
      };
    },
  },
};
</script>

<style scoped>
#preview {
  display: flex;
  justify-content: center;
  align-items: center;
}
#preview img {
  min-width: 640px;
  min-height: 360px;
  max-width: 1366px;
  max-height: 768px;
}
input[type="file"] {
  position: absolute;
  top: -500px;
}
div.file-listing img {
  max-width: 90%;
}
span.remove-file {
  color: red;
  cursor: pointer;
  float: right;
}
</style>
