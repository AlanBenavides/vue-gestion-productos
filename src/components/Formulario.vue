<template>
  <section class="formulario">
    <h2 class="formulario_tittle">Datos del producto:</h2>
    <form
      class="formulario_form"
      @submit.prevent="submitForm"
      autocomplete="off"
    >
      <div class="formulario_group">
        <label
          ><div class="formulario_name">Nombre Producto:</div>
          <input
            name="nombreProducto"
            :class="
              $v.producto.nombre_prod.$invalid
                ? 'formulario_check-input-error'
                : 'formulario_check-input'
            "
            type="text"
            required
            v-model="producto.nombre_prod"
          />
        </label>
        <div
          class="formulario_check-error"
          v-if="!$v.producto.nombre_prod.alpha1"
        >
          No se aceptan caracteres especiales.
        </div>
        <div
          class="formulario_check-error"
          v-if="!$v.producto.nombre_prod.minLength"
        >
          Debe tener una longitud no menor a
          {{ $v.producto.nombre_prod.$params.minLength.min }}.
        </div>
        <div
          class="formulario_check-error"
          v-if="!$v.producto.nombre_prod.required"
        >
          Campo requerido.
        </div>
        <div
          class="formulario_check-error"
          v-if="!$v.producto.nombre_prod.maxLength"
        >
          Nombre muy largo maximo
          {{ $v.producto.nombre_prod.$params.maxLength.max }}
          caracteres.
        </div>
      </div>

      <div class="formulario_group">
        <label
          ><div class="formulario_name">Descripción:</div>
          <textarea
            name="descripcionProducto"
            :class="
              $v.producto.descripcion.$invalid
                ? 'formulario_check-input-error'
                : 'formulario_check-input'
            "
            v-model="producto.descripcion"
            cols="50"
            rows="10"
            maxlength="1000"
          />
        </label>
        <div class="formulario_check-count">
          {{ `${producto.descripcion.length}/1000` }} caracteres.
        </div>

        <div
          class="formulario_check-error"
          v-if="!$v.producto.descripcion.maxLength"
        >
          Descripcion muy larga maximo
          {{ $v.producto.descripcion.$params.maxLength.max }} caracteres.
        </div>
        <div
          class="formulario_check-error"
          v-if="!$v.producto.descripcion.required"
        >
          Campo requerido.
        </div>
      </div>

      <div>
        <label
          ><div class="formulario_name">Categoría:</div>
          <input
            name="categoriaProducto"
            :class="
              $v.producto.categoria.$invalid
                ? 'formulario_check-input-error'
                : 'formulario_check-input'
            "
            list="categorias"
            v-model="producto.categoria"
        /></label>
        <div
          class="formulario_check-error"
          v-if="!$v.producto.categoria.required"
        >
          Campo requerido.
        </div>
        <div
          class="formulario_check-error"
          v-if="!$v.producto.categoria.alpha3"
        >
          No se aceptan caracteres especiales.
        </div>
        <datalist id="categorias">
          <option value="Farmacia"></option>
          <option value="Electronicos"></option>
          <option value="Ropa"></option>
          <option value="Alimentos"></option>
          <option value="Entretenimiento"></option>
        </datalist>
      </div>

      <div class="formulario_group">
        <label
          ><p
            v-if="!producto.peso && !producto.cantidad"
            class="formulario_name"
          >
            Precio (Bs.):
          </p>

          <p v-if="producto.peso" class="formulario_name">
            Precio por
            {{ producto.unidad_med.slice(0, producto.unidad_med.length - 1) }}
            <span>(Bs):</span>
          </p>
          <p v-if="producto.cantidad" class="formulario_name">
            Precio por unidad
            <span>(Bs):</span>
          </p>

          <input
            name="precioProducto"
            type="text"
            v-model="producto.precio_unid"
            :class="
              $v.producto.precio_unid.$invalid
                ? 'formulario_check-input-error'
                : 'formulario_check-input'
            "
          />
        </label>
        <div
          class="formulario_check-error"
          v-if="!$v.producto.precio_unid.required"
        >
          Campo requerido.
        </div>
        <div
          class="formulario_check-error"
          v-if="!$v.producto.precio_unid.between"
        >
          Campo invalido (0.10-10000).
        </div>
        <div
          class="formulario_check-error"
          v-if="!$v.producto.precio_unid.validate_decimales"
        >
          Maximo 2 decimales!
        </div>
        <div
          class="formulario_check-error"
          v-if="!$v.producto.precio_unid.alpha2"
        >
          Ingrese un valor numérico.
        </div>
      </div>

      <fieldset>
        <legend class="formulario_name">Cantidad:</legend>
        <div class="formulario_group">
          <label
            ><input
              name="cantidadUnidades"
              type="radio"
              id="precio_unidades"
              @click="selectCantidad(false)"
              v-model="producto.unidad"
            />
            <span class="formulario_name formulario_name-span">Unidades</span>
          </label>
          <input
            name="unidadesProducto"
            type="text"
            :disabled="disabled"
            v-model="producto.cantidad"
            :required="!disabled"
          />
          <div
            class="formulario_check-error"
            v-if="!$v.producto.cantidad.between"
          >
            Ingrese valores enteros entre (1-1000).
          </div>
          <div
            class="formulario_check-error"
            v-if="!$v.producto.cantidad.integer"
          >
            Solo se aceptan valores enteros.
          </div>
          <div
            class="formulario_check-error"
            v-if="!$v.producto.cantidad.alpha2"
          >
            Ingrese un valor numérico
          </div>
        </div>

        <div class="formulario_group">
          <label
            ><input
              name="cantidadPeso"
              type="radio"
              value="peso"
              id="precio_peso"
              @click="selectCantidad(true)"
              v-model="producto.unidad"
            />
            <span class="formulario_name formulario_name-span">Peso</span>
          </label>
          <input
            name="pesoProducto"
            type="text"
            step="0.25"
            :disabled="!disabled"
            v-model="producto.peso"
            class="formulario_peso"
            :required="disabled"
          />

          <select
            name="unidadMedProducto"
            :required="disabled"
            :disabled="!disabled"
            v-model="producto.unidad_med"
          >
            <option selected value="">Elige una opción</option>
            <option value="Kilogramos">Kilogramos</option>
            <option value="Libras">Libras</option>
            <option value="Litros">Litros</option>
            <option value="Galones">Galones</option>
            <option value="Onzas">Onzas</option>
          </select>
          <div class="formulario_check-error" v-if="!$v.producto.peso.between">
            Ingrese valores entre (0.10-100).
          </div>
          <div
            class="formulario_check-error"
            v-if="!$v.producto.peso.validate_decimales"
          >
            Maximo 2 decimales!
          </div>
          <div class="formulario_check-error" v-if="!$v.producto.peso.alpha2">
            Ingrese un valor numérico.
          </div>
        </div>
      </fieldset>

      <div class="formulario_group">
        <label
          ><div class="formulario_name">Fecha de vencimiento del producto:</div>
          <input
            name="fechaVencProducto"
            type="date"
            value="DD/MM/AA"
            onkeydown="return false"
            v-model="producto.fecha_venc"
        /></label>
        <div
          class="formulario_check-error-center"
          v-if="!$v.producto.fecha_venc.validate_date"
        >
          fecha invalida
        </div>
      </div>

      <button
        :disabled="$v.producto.$invalid"
        :class="$v.producto.$invalid ? 'button-disabled' : ''"
        class="formulario_button"
      >
        Confirmar
      </button>
    </form>
    <Alert ref="alert"></Alert>
  </section>
</template>

<script>
import {
  required,
  minLength,
  helpers,
  maxLength,
  between,
  integer,
} from "vuelidate/lib/validators";
import Alert from "@/components/Alert.vue";

const alpha1 = helpers.regex("alpha1", /^[a-zA-Z0-9ñ+áéíóúÁÉÍÓÚ'\s]*$/);
const alpha2 = helpers.regex("alpha1", /^[0-9,.\s]*$/);
const alpha3 = helpers.regex("alpha3", /^[a-zA-Z\s]*$/);

const validate_date = (value) => {
  const date = new Date();
  const dd = date.getDate();
  const mm = date.getMonth() + 1;
  const yyyy = date.getFullYear();
  const yyvalue = parseInt(value.slice(0, 4));
  const mmvalue = parseInt(value.slice(5, 7));
  const ddvalue = parseInt(value.slice(8, 10));
  return (
    !helpers.req(value) ||
    !(yyvalue < yyyy) &
      !(yyvalue == yyyy && mmvalue < mm) &
      !(yyyy == yyvalue && mm == mmvalue && ddvalue < dd)
  );
};
const validate_decimales = (value) => {
  const datovalue = String(value);

  if (datovalue.indexOf(".") > 0) {
    const parts = datovalue.split(".");
    const dato = String(parts[1]);

    return !helpers.req(value) || !(dato.length > 2);
  } else {
    return true;
  }
};

export default {
  name: "Formulario",
  components: { Alert },
  data() {
    return {
      disabled: false,
      producto: {
        nombre_prod: null,
        descripcion: "",
        categoria: null,
        precio_unid: null,
        unidad: null, //for chech form
        cantidad: null,
        peso: null,
        unidad_med: null,
        fecha_venc: "",
      },
    };
  },
  props: ["images"],
  validations: {
    producto: {
      nombre_prod: {
        required,
        minLength: minLength(2),
        maxLength: maxLength(30),
        alpha1,
      },
      descripcion: {
        required,
        maxLength: maxLength(1000),
      },
      categoria: {
        required,
        alpha3,
      },
      precio_unid: {
        required,
        between: between(0.1, 10000),
        validate_decimales,
        alpha2,
      },
      cantidad: {
        between: between(1, 1000),
        integer,
        alpha2,
      },
      peso: {
        between: between(0.1, 100),
        validate_decimales,
        alpha2,
      },
      fecha_venc: {
        validate_date,
      },
    },
  },
  methods: {
    selectCantidad(disabled) {
      this.disabled = disabled;
      if (!this.disabled) {
        this.producto.peso = null;
        this.producto.unidad_med = null;
        this.producto.cantidad = "";
      } else {
        this.producto.cantidad = null;
        this.producto.peso = "";
        this.producto.unidad_med = "";
      }
    },

    async submitForm() {
      try {
        if (!this.$v.producto.$invalid) {
          if (this.images.length == 0)
            this.alert("warning", "Registra por lo menos una imagen");
          else {
            const productId = await this.sendDataProduct();
            await this.sendImage(productId);
            this.alert("success", "Producto creado exitosamente");
          }
        } else {
          this.alert("warning", "Rellene todos los datos correctamente");
        }
      } catch (error) {
        this.alert("warning", error);
      }
    },
    async sendDataProduct() {
      try {
        const response = await this.$http.post("products", {
          nombre_prod: this.producto.nombre_prod,
          descripcion: this.producto.descripcion,
          categoria: this.producto.categoria,
          precio_unid: this.producto.precio_unid,
          cantidad: this.producto.cantidad ? this.producto.cantidad : null,
          peso: this.producto.peso ? this.producto.peso : null,
          unidad_med: this.producto.unidad_med
            ? this.producto.unidad_med
            : null,
          fecha_venc:
            this.producto.fecha_venc == "" ? null : this.producto.fecha_venc,
        });
        return response.data[0].cod_prod;
      } catch (error) {
        throw new Error("El nombre del producto esta repetido");
      }
    },
    async sendImage(productId) {
      this.images.forEach(async (image) => {
        await this.$http.post(`images`, {
          cod_prod: productId,
          imagen: image,
        });
      });
    },
    alert(alertType, alertMessage) {
      this.$refs.alert.showAlert(alertType, alertMessage);
    },
  },
};
</script>

<style>
.formulario_tittle {
  text-align: left;
  color: var(--color-subtitle);
  font-size: 1.4rem;
  font-weight: 600;
}

.formulario_form {
  background-color: var(--background);
  padding: 2rem;
  text-align: left;
}

.formulario label {
  display: block;
  font-size: 1.2rem;
}

.formulario textarea {
  resize: none;
  background-color: transparent;
  word-wrap: break-word;
  overflow-y: auto;
}

.formulario input,
.formulario textarea,
.formulario select {
  border: none;
  border: 2px solid var(--color-border);
  border-radius: var(--border-radius);
  padding: 5px 7px;
}

.formulario select {
  height: 38px;
  margin-left: 1rem;
}

.formulario input[type="date"] {
  display: block;
  margin: auto;
  margin-top: 10px;
  margin-bottom: 2rem;
  width: 60%;
  text-align: center;
}

.formulario legend {
  font-size: 1.2rem;
  margin-bottom: 0;
}

.formulario_name {
  color: var(--font-color-secondary);
}

.formulario_name-span {
  padding-left: 1rem;
}

.formulario_group {
  margin: 1rem;
  margin-left: 0;
}

.formulario_group:first-child {
  margin-top: 0;
}

.formulario_check-error {
  color: var(--font-color-error);
}

.formulario_check-error-center {
  text-align: center;
  color: var(--font-color-error);
}

.formulario_button {
  margin: auto;
  display: block;
  background-color: var(--color-btn);
  padding: 13px 100px;
  color: white;
  font-size: 20px;
  font-weight: 700;
}

.formulario_check-count {
  text-align: right;
}

.formulario_check-input {
  border: 1px solid var(--font-color-accept) !important;
}

.formulario_check-input-error {
  border: 1px solid var(--font-color-error) !important;
}

.button-disabled {
  background: var(--color-btn-disable);
  border: 2px solid var(--color-btn-disable);
}
</style>
