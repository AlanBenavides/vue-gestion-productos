<template>
  <section class="imagenes">
    <h2 class="formulario_tittle">Fotos del producto:</h2>
    <input
      type="file"
      id="files"
      ref="files"
      accept="image/*"
      multiple
      @change="handleFilesUpload()"
      class="images_input"
    />
    <div class="imagenes_container">
      <div
        v-for="(image, key) in image64"
        :key="key"
        :class="`imagenes_list ${key == 0 ? 'imagenes_list-first' : ''}`"
      >
        <img
          class="imagenes_preview"
          :src="image64.slice(key, key + 1)"
          v-bind:ref="'image' + parseInt(key)"
          :height="key == 0 ? '360px' : '200px'"
        />
        <span class="imagenes_remove" v-on:click="removeFile(key, 3)">X</span>
      </div>
      <template v-for="(button, index) in 3">
        <div
          :key="'image' + index"
          class="images_container-button"
          v-if="image64.length <= index + 1"
        >
          <button @click="addFiles()" class="add_imagenes">
            <span class="images_container-button">+</span>
          </button>
        </div>
      </template>
    </div>
    <span class="formulario_check-error" v-if="!$v.image64.required"
      >Faltan fotografias</span
    >
    <span class="formulario_check-error" v-if="!$v.image64.maxLength"
      >No se aceptan mas de 4 imagenes</span
    >
  </section>
</template>

<script>
import { required, maxLength } from "vuelidate/lib/validators";
export default {
  name: "EditImages",
  data() {
    return {
      files: [],
      image64: [],
    };
  },
  validations: {
    image64: {
      required,
      maxLength: maxLength(4),
    },
    files: {
      maxLength: maxLength(4),
    },
  },
  methods: {
    addFiles() {
      this.$refs.files.click();
    },
    handleFilesUpload() {
      let uploadedFiles = this.$refs.files.files;
      var rep = uploadedFiles.length;
      for (var i = 0; i < rep; i++) {
        let arch = uploadedFiles[i];
        if (/\.(jpe?g|png)$/i.test(arch.name)) {
          if (arch.size > 1024 * 1024) {
            alert(arch.name + " es muy pesado (> 1MB)");
            return;
          } else {
            let reader = new FileReader();
            reader.readAsDataURL(arch);
            reader.onload = (evt) => {
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
                    "El alto de " +
                      arch.name +
                      " debe estar entre 360px y 768px"
                  );
                  return;
                } else {
                  this.createBase64Image(arch);
                  this.$emit("sendimages", this.image64);
                }
              };
              img.src = evt.target.result;
            };
          }
        } else {
          alert(arch.name + " no es un archivo jpg o png");
        }
      }
    },
    removeFile(key, type) {
      if (type == 3) {
        this.image64.splice(key, 1);
      }
    },
    createBase64Image(fileObject) {
      const reader = new FileReader();
      reader.readAsDataURL(fileObject);
      reader.onload = (e) => {
        this.image64.push(e.target.result);
      };
    },
  },
  mounted: async function () {
    const response = (
      await this.$http.get(`/images/${this.$route.params.id}?cantidad=1`)
    ).data.datos;
    this.image64 = response;
    this.image64 = this.image64.map(
      (imagen) => `data:image/[jpg/png];base64,${imagen.imagen}`
    );
    this.$emit("sendimages", this.image64);
  },
};
</script>

<style scoped>
.images_input {
  display: none;
}

.imagenes_list {
  display: inline-block;
  padding: 1rem;
  background-color: var(--background);
  width: calc(100% / 3);
}

.imagenes_list-first {
  height: 400px;
  width: 100%;
  background: var(--background);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 2rem;
}

.imagenes_preview {
  border: 1px solid var(--color-border);
  border-radius: 15px;
  max-width: 95%;
  max-height: auto;
  align-items: center;
}

.imagenes_remove {
  margin-bottom: auto;
  cursor: pointer;
  margin-left: -30px;
  margin-top: 20px;
}

.add_imagenes {
  height: 200px;
  width: 180px;
  background: var(--background);
  border: 1px solid var(--color-border);
  border-radius: 15px;
  font-weight: 300;
  font-size: 70px;
  color: var(--font-color-secondary);
}

.images_container-button {
  display: inline-block;
  padding: 1rem;
  background-color: var(--background);
  width: calc(100% / 3);
}
</style>
