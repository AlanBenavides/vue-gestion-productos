<template>
<div>
  <template v-if="tipo == 'productos'">
  <div class="item">
    <button @click="abrirModal()" >
      <img :src="imagen" :alt="nombre" width="180" />
    </button>
    <h5>{{ nombre }}</h5>
    <p>{{ precio }} Bs.</p>
  </div>
  </template>
  <template v-else-if="tipo == 'promociones'">
  <div class="item">
    <button @click="abrirModal()" >
      <img :src="imagen" :alt="nombre" width="180" />
    </button>
    <h5>{{ nombre }}</h5>
    <p>{{ precio }} Bs.</p>
  </div>
  </template>
  <template v-else-if="tipo == 'descuentos'">
  <div class="item">
    <button @click="abrirModal()" >
      <img :src="imagen" :alt="nombre" width="180" />
    </button>
    <h5>{{ nombre }}</h5>
    <p>{{porcentaje}} % de descuento</p>
    <p><strike>{{ precio }} Bs.</strike></p>   <p id="precio-nuevo"> {{ precio - (precio * (porcentaje/100)) }} Bs</p>
  </div>
  </template>
            <div class="modal fade" tabindex="-1" :class="{'mostrar' : modal}" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-primary modal-lg" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h4 class="modal-title" v-text="nombre"></h4>
                            <button type="button" class="close" @click="cerrarModal()" aria-label="Close">
                              <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        <div class="modal-body">
                          <div class="galeria_carrusel-principal">
                            <img
                              class="galeria_image-principal"
                              :src="imagen"
                              height="150px"
                            />
                          </div>
                            <section class="datos">
                                <div class="datos_container">
                                  <div v-if="tipo=='descuentos'">
                                  <p class="datos_info">
                                    Precio por unidad:
                                    <span class="datos_resaltados datos_resaltados-block datos_precio"
                                      > <strike>{{ precio }}Bs.</strike> Antes</span> 
                                  </p>
                                  <p id="precio-nuevo">
                                    {{ precio - (precio * (porcentaje/100)) }}Bs. Ahora
                                  </p>
                                  </div>
                                  <div v-else> 
                                      <p class="datos_info">
                                        Precio por unidad:
                                        <span class="datos_resaltados datos_resaltados-block datos_precio"
                                          >{{ precio }}Bs.</span> 
                                      </p>
                                  </div>
                                  <p class="datos_info">Sobre este producto:</p>
                                  <p class="datos_info datos_descripcion">
                                    {{ descripcion }}
                                  </p>
                                  
                                </div>
                              </section>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" @click="cerrarModal()">Cerrar</button>
                        </div>
                    </div>
                </div>
            </div>          
</div>

</template>


<script>
export default {
  name: "Item",
  props: ["id_product", "nombre", "precio", "descripcion", "fecha", "tipo", "porcentaje"],
  data: function () {
    return {
      imagen: "",
      modal: 0,
    };
  },
  methods: {
    parseDate() {
      const date = new Date(this.fecha);
      const day = date.getDate() + 1;
      const month = date.getMonth() + 1;
      const year = date.getFullYear();
      return `${day}-${month}-${year}`;
    },
            abrirModal(){
                this.modal=1;
            },
            cerrarModal(){
                this.modal=0;
            },
  },
  mounted: async function () {
    const response = await this.$http.get(
      `images/${this.id_product}?cantidad=1`
    );
    const imageURL = response.data.datos[0].imagen;
    this.imagen = "data:image/jpg;base64," + imageURL;
  },
};
</script>

<style scoped>
.item {
  font-size: 16px;
  padding: 1rem 2rem;
  display: flex;
  flex-direction: column;
  text-align: start;
  cursor: pointer;
  display: block;
  text-decoration: none;
  color: black;
}

.item > img {
  margin-bottom: 1rem;
}

.item > h5 {
  padding: 0.5rem;
  padding-left: 0;
}

strike {
  color: red;
}

button{
  border: none;
}
    .modal-content{
        width: 100% !important;
        position: absolute !important;
    }
    .mostrar{
        display: list-item !important;
        opacity: 1 !important;
        position: absolute !important;
        background-color: #3c29297a !important;
    }


.datos {
  text-align: left;
  font-size: 1.1rem;
  font-weight: 700;
}

.datos_info {
  margin: 2rem;
  margin-left: 0;
}

.datos_container {
  background-color: var(--background);
  padding: 0.5rem 2rem;
  padding-bottom: 3rem;
  border-radius: 15px;
  margin-left: 20rem;
}

.datos_resaltados {
  color: var(--font-color-secondary);
  font-weight: 700;
}

.datos_resaltados-block {
  display: block;
}

.datos_both {
  display: inline;
}

.datos_descripcion {
  background-color: #e8eaf6;
  color: var(--color-btn);
  border: 2px solid var(--color-btn);
  padding: 5px 10px;
  height: 200px;
  max-width: 100%;
  overflow-y: auto;
  word-wrap: break-word;
}

.datos_precio {
  margin: 10px;
  margin-left: 0;
  font-size: 1.4rem;
}
.galeria_carrusel-principal {
  background-color: var(--background);
  height: 400px;
  width: 300px;
  border-radius: 15px;
  display: flex;
  margin-bottom: 1rem;
  justify-content: center;
  align-items: center;
  float: left;
}

#precio-nuevo{
  color: #2AC817;
}
</style>
