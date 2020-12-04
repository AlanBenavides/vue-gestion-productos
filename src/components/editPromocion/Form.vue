<template>
  <div class="formulario">
    <form
      class="formulario_form"
      @submit.prevent="submitForm"
      autocomplete="off"
    >
      <div class="formulario_group">
        <label>
          <div class="formulario_name">Nombre de promoción:</div>
          <input
            :style="
              $v.promocion.nombre_prom.$invalid
                ? 'border:1px solid red '
                : 'border:1px solid green '
            "
            type="text"
            required
            v-model="promocion.nombre_prom"
          />
        </label>
        <div
          class="formulario_check-error"
          v-if="!$v.promocion.nombre_prom.alpha"
        >
          No se aceptan caracteres especiales.
        </div>
        <div
          class="formulario_check-error"
          v-if="!$v.promocion.nombre_prom.minLength"
        >
          Debe tener una longitud no menor a
          {{ $v.promocion.nombre_prom.$params.minLength.min }}.
        </div>
        <div
          class="formulario_check-error"
          v-if="!$v.promocion.nombre_prom.required"
        >
          Campo requerido.
        </div>
        <div
          class="formulario_check-error"
          v-if="!$v.promocion.nombre_prom.maxLength"
        >
          Nombre muy largo maximo
          {{ $v.promocion.nombre_prom.$params.maxLength.max }}
          caracteres.
        </div>
      </div>

      <div class="formulario_group">
        <label>
          <div class="formulario_name">Descripción:</div>
          <textarea
            :style="
              $v.promocion.descripcion.$invalid
                ? 'border:1px solid red '
                : 'border:1px solid green '
            "
            v-model="promocion.descripcion"
            cols="50"
            rows="10"
            maxlength="1000"
          />
        </label>
        <div class="formulario_check-error1">
          {{ `${promocion.descripcion.length}/1000` }} caracteres.
        </div>
        <div
          class="formulario_check-error"
          v-if="!$v.promocion.descripcion.maxLength"
        >
          Descripcion muy larga maximo
          {{ $v.promocion.descripcion.$params.maxLength.max }} caracteres.
        </div>
        <div
          class="formulario_check-error"
          v-if="!$v.promocion.descripcion.required"
        >
          Campo requerido.
        </div>
      </div>

      <div class="formulario_group">
        <label>
          <div class="formulario_name">Precio(Bs.):</div>
          <input
            type="text"
            v-model="promocion.precio_unid"
            :style="
              $v.promocion.precio_unid.$invalid
                ? 'border:1px solid red '
                : 'border:1px solid green '
            "
          />
        </label>
        <div
          class="formulario_check-error"
          v-if="!$v.promocion.precio_unid.required"
        >
          Campo requerido.
        </div>
        <div
          class="formulario_check-error"
          v-if="!$v.promocion.precio_unid.between"
        >
          Campo invalido (0.10-10000).
        </div>
        <div
          class="formulario_check-error"
          v-if="!$v.promocion.precio_unid.validate_decimales"
        >
          Maximo 2 decimales!
        </div>
        <div
          class="formulario_check-error"
          v-if="!$v.promocion.precio_unid.alpha2"
        >
          Ingrese un valor numérico.
        </div>
      </div>
      <div class="formulario_group">
        <label>
          <div class="formulario_name">Cantidad:</div>
          <input
            type="text"
            v-model="promocion.cantidad"
            :style="
              $v.promocion.cantidad.$invalid
                ? 'border:1px solid red '
                : 'border:1px solid green '
            "
          />
        </label>
        <div
          class="formulario_check-error"
          v-if="!$v.promocion.cantidad.required"
        >
          Campo requerido.
        </div>
        <div
          class="formulario_check-error"
          v-if="!$v.promocion.cantidad.between"
        >
          Ingrese valores enteros entre (1-1000).
        </div>
        <div
          class="formulario_check-error"
          v-if="!$v.promocion.cantidad.integer"
        >
          Solo se aceptan valores enteros.
        </div>
        <div
          class="formulario_check-error"
          v-if="!$v.promocion.cantidad.alpha2"
        >
          Ingrese un valor numérico
        </div>
      </div>
      <div class="formulario_group">
        <label>
          <div class="formulario_name">Inicio de promoción:</div>
          <input
            type="date"
            value="DD/MM/AA"
            onkeydown="return false"
            v-model="promocion.fecha_inicio"
          />
        </label>
        <div
          class="formulario_check-error-center"
          v-if="!$v.promocion.fecha_inicio.validate_date"
        >
          Fecha fuera de límite
        </div>
      </div>
      <div class="formulario_group">
        <label>
          <div class="formulario_name">Fin de promoción:</div>
          <input
            type="date"
            value="DD/MM/AA"
            onkeydown="return false"
            v-model="promocion.fecha_fin"
          />
        </label>
        <div
          class="formulario_check-error-center"
          v-if="!$v.promocion.fecha_fin.validate_date"
        >
          Fecha fuera de límite
        </div>
        <div
          class="formulario_check-error-center"
          v-if="!$v.promocion.fecha_fin.validate_end_date"
        >
          La promoción termina antes de empezar
        </div>
      </div>
      <button
        :disabled="$v.promocion.$invalid || image == ''"
        class="formulario_button"
        :class="isAllValid"
      >
        Confirmar
      </button>
    </form>
  </div>
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

const alpha = helpers.regex("alpha", /^[a-zA-Z0-9ñ\sáéíóúÁÉÍÓÚ.,:;'`"-]*$/);
const alpha2 = helpers.regex("alpha1", /^[0-9,.\s]*$/);

const validate_date = (value) => {
  const today_date = new Date();
  const three_years_after = new Date().setFullYear(
    today_date.getFullYear() + 3
  );
  const input_date = new Date(Date.parse(value));
  input_date.setDate(input_date.getDate() + 1);
  return today_date <= input_date && input_date < three_years_after;
};

const validate_end_date = (value, vm) => {
  if (!vm.fecha_inicio || !value) {
    return true;
  }
  const start_date = new Date(Date.parse(vm.fecha_inicio));
  const end_date = new Date(Date.parse(value));
  start_date.setDate(start_date.getDate() + 1);
  end_date.setDate(end_date.getDate() + 1);
  return start_date < end_date;
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

const min_products = (value) => {
  return Object.keys(value).length > 1;
};

export default {
  name: "Form",
  props: ["image"],
  data() {
    return {
      disabled: false,
      promocion: {
        nombre_prom: null,
        descripcion: "",
        precio_unid: null,
        cantidad: null,
        fecha_inicio: "",
        fecha_fin: "",
        product_list: this.$store.state.groupIDselected,
      },
    };
  },
  validations: {
    promocion: {
      nombre_prom: {
        required,
        minLength: minLength(2),
        maxLength: maxLength(30),
        alpha,
      },
      descripcion: {
        required,
        maxLength: maxLength(1000),
      },
      precio_unid: {
        required,
        between: between(0.1, 10000),
        validate_decimales,
        alpha2,
      },
      cantidad: {
        required,
        between: between(1, 1000),
        integer,
        alpha2,
      },
      fecha_inicio: {
        validate_date,
      },
      fecha_fin: {
        validate_date,
        validate_end_date,
      },
      product_list: {
        min_products,
      },
    },
  },
  methods: {
    async submitForm() {
      try {
        if (!this.$v.promocion.$invalid) {
          if (this.image == "") alert("Registra la imagen de la promoción");
          else {
            for (let id in this.$store.state.groupIDselected) {
              if (
                this.promocion.cantidad *
                  this.$store.state.groupIDselected[id][0] >
                this.$store.state.groupIDselected[id][1]
              ) {
                alert("No existen suficientes productos para esta promoción.");
                return;
              }
            }
            await this.sendDataProm();
            alert("Datos de la promoción editados exitosamente");
          }
        } else {
          alert("Rellene todos los datos correctamente");
        }
      } catch (error) {
        alert(error);
      }
    },
    async sendDataProm() {
      try {
        await this.$http.put(`promotions/${this.$store.state.idSelected[0]}`, {
          nombr_prom: this.promocion.nombre_prom,
          descrip_prom: this.promocion.descripcion,
          precio_prom: this.promocion.precio_unid,
          cantidad_prom: this.promocion.cantidad,
          fecha_ini: this.promocion.fecha_inicio,
          fecha_fin: this.promocion.fecha_fin,
          products: this.$store.state.groupIDselected,
          imagen_prom: this.image,
        });
      } catch (error) {
        throw new Error("El nombre de la promoción esta repetido");
      }
    },
    parseDate(dat){
      const date = new Date(dat);
      return `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`;
    }
  },
  computed: {
    isAllValid() {
      return this.$v.promocion.$invalid || this.image == ""
        ? "form_button_disabled"
        : "";
    },
  },
  async mounted(){
    const response = await this.$http.get(`/promotions/${this.$store.state.idSelected[0]}`);
    const datos = response.data.datos;
    this.promocion.nombre_prom = datos[0].nombr_prom;
    this.promocion.descripcion = datos[0].descrip_prom;
    this.promocion.precio_unid = datos[0].precio_prom;
    this.promocion.cantidad = datos[0].cantidad_prom;
    this.promocion.fecha_inicio = this.parseDate(datos[0].fecha_ini);
    this.promocion.fecha_fin = this.parseDate(datos[0].fecha_fin);
  }
};
</script>

<style>
.formulario_tittle {
  text-align: left;
  color: #919ca9;
  font-size: 1.4rem;
  font-weight: 600;
}

.formulario_form {
  background-color: #edf0f4;
  padding: 2rem;
  text-align: left;
}

.formulario label {
  display: block;
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
  border: 2px solid #8b8b8b;
  border-radius: 6px;
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
  color: #919ca9;
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
  color: red;
}

.formulario_check-error-center {
  text-align: center;
  color: red;
}

.formulario_button {
  margin: auto;
  display: block;
  background-color: rgb(51, 51, 51);
  padding: 13px 100px;
  color: white;
  font-size: 20px;
  font-weight: 700;
}
.form_button_disabled {
  background-color: gray;
}

.formulario_check-error1 {
  color: black;
  text-align: right;
}
</style>
