<template>
  <section class="formulario">
    <h2>Datos del producto:</h2>
    <form
      class="formulario_form"
      @submit.prevent="submitForm"
      autocomplete="off"
    >
      <div class="formulario_group">
        <label
          >Nombre Producto:
          <input type="text" required v-model="producto.nombre_prod" />
        </label>
        <span v-if="!$v.producto.nombre_prod.alpha"
          >No se aceptan caracteres especiales.</span
        >
        <span v-if="!$v.producto.nombre_prod.minLength"
          >Debe tener una longitud no menor a
          {{ $v.producto.nombre_prod.$params.minLength.min }}.</span
        >
        <span v-if="!$v.producto.nombre_prod.required">Campo requerido.</span>
        <span v-if="!$v.producto.nombre_prod.maxLength"
          >Nombre muy largo maximo
          {{ $v.producto.nombre_prod.$params.maxLength.max }}
          caracteres.</span
        >
      </div>

      <div class="formulario_group">
        <label
          >Descripcion:
          <textarea v-model="producto.descripcion" cols="50" rows="10" />
        </label>
        <span v-if="!$v.producto.descripcion.alpha1"
          >No se aceptan caracteres especiales.</span
        >
        <span v-if="!$v.producto.descripcion.maxLength"
          >Descripcion muy larga.
          {{ $v.producto.descripcion.$params.maxLength.max }}.</span
        >
        <span v-if="!$v.producto.descripcion.required">Campo requerido.</span>
      </div>

      <div>
        <label
          >Categoria: <input list="categorias" v-model="producto.categoria"
        /></label>
        <span v-if="!$v.producto.categoria.required">Campo requerido.</span>
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
          >Precio por unidad (Bs.):<input
            type="number"
            v-model="producto.precio_unid"
          />
        </label>
        <span v-if="!$v.producto.precio_unid.required">Campo requerido.</span>
        <span v-if="!$v.producto.precio_unid.between"
          >Campo invalido (0-10000).</span
        ><span v-if="!$v.producto.precio_unid.validate_decimales"
          >Maximo 2 decimales!</span
        >
      </div>

      <div>
        Cantidad:
        <div class="formulario_group">
          <label
            ><input
              type="radio"
              @click="selectCantidad"
              v-model="producto.unidad"
            />Unidades</label
          >
          <input
            type="number"
            :disabled="disabled"
            v-model="producto.cantidad"
          />
          <span v-if="!$v.producto.cantidad.minValue">Debe ser mayor a 0.</span>
          <span v-if="!$v.producto.cantidad.integer"
            >Solo se aceptan valores enteros.</span
          >
        </div>

        <div class="formulario_group">
          <label
            ><input
              type="radio"
              value="peso"
              @click="selectCantidad"
              v-model="producto.unidad"
            />Peso</label
          >
          <input
            type="number"
            step="0.25"
            value="0.00"
            :disabled="!disabled"
            v-model="producto.peso"
          />

          <select :disabled="!disabled" v-model="producto.unidad_med">
            <option selected value="">Elige una opción</option>
            <option value="Kilogramos">Kilogramos</option>
            <option value="Libras">Libras</option>
            <option value="Litros">Litros</option>
            <option value="Galones">Galones</option>
            <option value="Onzas">Onzas</option>
          </select>
          <span v-if="!$v.producto.peso.minValue">Debe ser mayor a 0.</span>
          <span v-if="!$v.producto.peso.validate_decimales"
            >Maximo 2 decimales!</span
          >
        </div>
      </div>

      <div class="formulario_group">
        <label
          >Fecha de vencimiento del producto:
          <input type="date" value="DD/MM/AA" v-model="producto.fecha_venc"
        /></label>
        <span v-if="!$v.producto.fecha_venc.validate_date">fecha invalida</span>
      </div>

      <button :disabled="$v.producto.$invalid" class="formulario_button">
        Confirmar
      </button>
    </form>
    <pre>{{ producto }}</pre>
  </section>
</template>

<script>
import {
  required,
  minLength,
  helpers,
  maxLength,
  between,
  minValue,
  integer,
} from "vuelidate/lib/validators";

const alpha = helpers.regex("alpha", /^[a-zA-Z0-9ñ\s]*$/);
const alpha1 = helpers.regex("alpha1", /^[a-zA-Z0-9ñ,.\s]*$/);

const validate_date = (value) => {
  const date = new Date();
  const dd = date.getDate();
  const mm = date.getMonth() + 1;
  const yyyy = date.getFullYear();
  const yyvalue = parseInt(value.slice(0, 4));
  const mmvalue = parseInt(value.slice(5, 7));
  const ddvalue = parseInt(value.slice(8, 10));

  return (
    !helpers.req(value) || !(dd > ddvalue && mm >= mmvalue && yyyy >= yyvalue)
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
  data() {
    return {
      disabled: false,
      producto: {
        nombre_prod: null,
        descripcion: null,
        categoria: null,
        precio_unid: null,
        unidad: null,
        cantidad: null,
        peso: null,
        unidad_med: null,
        fecha_venc: "",
      },
    };
  },
  validations: {
    producto: {
      nombre_prod: {
        required,
        minLength: minLength(2),
        maxLength: maxLength(30),
        alpha,
      },
      descripcion: {
        required,
        maxLength: maxLength(1000),
        alpha1,
      },
      categoria: {
        required,
      },
      precio_unid: {
        required,
        between: between(0, 10000),
        validate_decimales,
      },
      cantidad: {
        minValue: minValue(1),
        integer,
      },
      peso: {
        minValue: minValue(0),
        validate_decimales,
      },
      fecha_venc: {
        validate_date,
      },
    },
  },

  methods: {
    selectCantidad() {
      this.disabled = !this.disabled;
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
    submitForm() {
      if (!this.$v.producto.$invalid) {
        console.log("datos correctos ", this.producto);
      } else {
        console.log("datos incorrectos");
      }
    },
  },
};
</script>

<style scope>
.formulario_form {
  background-color: #edf0f4;
  padding: 1rem;
}
</style>
