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
          <span class="remove-file" v-on:click="removeFile(key,2)">eliminar</span>
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
      image64: [],
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
    handleFilesUpload(){
          let uploadedFiles = this.$refs.files.files;
          var rep=uploadedFiles.length;
            for( var i= 0; i < rep; i++ ){
                let arch=uploadedFiles[i];
                if ( /\.(jpe?g|png)$/i.test( arch.name ) ){
                  for (var j=0; j<this.files.length; j++){
                    if (arch.name==this.files[j].name){
                      alert(arch.name+' ya fue subido');
                      this.removeFile(this.files.length+i,1);
                      return;
                    }
                  }
                    if (arch.size > 1024*1024){
                        alert(arch.name+' es muy pesado (> 1MB)');
                        this.removeFile(this.files.length+i,1);
                        return;
                    }else{
                        let reader = new FileReader();
                        reader.readAsDataURL(arch)
                        reader.onload = evt =>{
                            let img = new Image();
                            img.onload = () =>{
                                if(img.width<640 || img.width>1366){
                                    alert ('El ancho de '+ arch.name +' debe estar entre 640px y 1366px');
                                    this.removeFile(this.files.length+i,1);
                                    return;
                                }else if (img.height<360 || img.height>768){
                                    alert ('El alto de '+ arch.name +' debe estar entre 360px y 768px');
                                    this.removeFile(this.files.length+i,1);
                                    return;
                                }else{
                                  if (this.files.length>=4){
                                    alert ('No puede ingresar más de 4 imagenes');
                                    this.removeFile(this.files.length+i,1);
                                    return;
                                  }else{
                                    this.createBase64Image(arch);
                                    this.files.push( arch );
                                    this.getImagePreviews();
                                    this.$emit("sendimages", this.image64);
                                  }
                                }
                            }
                            img.src=evt.target.result;
                        }
                    }
                }else{
                    alert (arch.name + ' no es un archivo jpg o png');
                }
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
    removeFile(key, type) {
      this.files.splice(key, 1);
      this.getImagePreviews();
      if (type==2){
        this.image64.splice(key,1);
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
