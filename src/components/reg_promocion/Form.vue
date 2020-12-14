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
              $v.promotion.promName.$invalid
                ? 'border:1px solid red '
                : 'border:1px solid green '
            "
            type="text"
            required
            v-model="promotion.promName"
          />
        </label>
        <div
          class="formulario_check-error"
          v-if="!$v.promotion.promName.alpha"
        >
          No se aceptan caracteres especiales.
        </div>
        <div
          class="formulario_check-error"
          v-if="!$v.promotion.promName.minLength"
        >
          Debe tener una longitud no menor a
          {{ $v.promotion.promName.$params.minLength.min }}.
        </div>
        <div
          class="formulario_check-error"
          v-if="!$v.promotion.promName.required"
        >
          Campo requerido.
        </div>
        <div
          class="formulario_check-error"
          v-if="!$v.promotion.promName.maxLength"
        >
          Nombre muy largo maximo
          {{ $v.promotion.promName.$params.maxLength.max }}
          caracteres.
        </div>
      </div>

      <div class="formulario_group">
        <label>
          <div class="formulario_name">Descripción:</div>
          <textarea
            :style="
              $v.promotion.description.$invalid
                ? 'border:1px solid red '
                : 'border:1px solid green '
            "
            v-model="promotion.description"
            cols="50"
            rows="10"
            maxlength="1000"
          />
        </label>
        <div class="formulario_check-error1">
          {{ `${promotion.description.length}/1000` }} caracteres.
        </div>
        <div
          class="formulario_check-error"
          v-if="!$v.promotion.description.maxLength"
        >
          Descripcion muy larga maximo
          {{ $v.promotion.description.$params.maxLength.max }} caracteres.
        </div>
        <div
          class="formulario_check-error"
          v-if="!$v.promotion.description.required"
        >
          Campo requerido.
        </div>
      </div>

      <div class="formulario_group">
        <label>
          <div class="formulario_name">Precio(Bs.):</div>
          <input
            type="text"
            v-model="promotion.unitPrice"
            :style="
              $v.promotion.unitPrice.$invalid
                ? 'border:1px solid red '
                : 'border:1px solid green '
            "
          />
        </label>
        <div
          class="formulario_check-error"
          v-if="!$v.promotion.unitPrice.required"
        >
          Campo requerido.
        </div>
        <div
          class="formulario_check-error"
          v-if="!$v.promotion.unitPrice.between"
        >
          Campo invalido (0.10-10000).
        </div>
        <div
          class="formulario_check-error"
          v-if="!$v.promotion.unitPrice.validateDecimals"
        >
          Maximo 2 decimales!
        </div>
        <div
          class="formulario_check-error"
          v-if="!$v.promotion.unitPrice.alpha2"
        >
          Ingrese un valor numérico.
        </div>
      </div>
      <div class="formulario_group">
        <label>
          <div class="formulario_name">Cantidad:</div>
          <input
            type="text"
            v-model="promotion.quantity"
            :style="
              $v.promotion.quantity.$invalid
                ? 'border:1px solid red '
                : 'border:1px solid green '
            "
          />
        </label>
        <div
          class="formulario_check-error"
          v-if="!$v.promotion.quantity.required"
        >
          Campo requerido.
        </div>
        <div
          class="formulario_check-error"
          v-if="!$v.promotion.quantity.between"
        >
          Ingrese valores enteros entre (1-1000).
        </div>
        <div
          class="formulario_check-error"
          v-if="!$v.promotion.quantity.integer"
        >
          Solo se aceptan valores enteros.
        </div>
        <div
          class="formulario_check-error"
          v-if="!$v.promotion.quantity.alpha2"
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
            v-model="promotion.startDate"
          />
        </label>
        <div
          class="formulario_check-error-center"
          v-if="!$v.promotion.startDate.validateDate"
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
            v-model="promotion.endDate"
          />
        </label>
        <div
          class="formulario_check-error-center"
          v-if="!$v.promotion.endDate.validateDate"
        >
          Fecha fuera de límite
        </div>
        <div
          class="formulario_check-error-center"
          v-if="!$v.promotion.endDate.validateEndDate"
        >
          La promoción termina antes de empezar
        </div>
      </div>
      <button
        :disabled="$v.promotion.$invalid || image == ''"
        class="formulario_button"
        :class="isAllValid"
      >
        Confirmar
      </button>
    </form>
    <Alert ref="alert"></Alert>
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
import Alert from "@/components/Alert.vue";

const alpha = helpers.regex("alpha", /^[a-zA-Z0-9ñ\sáéíóúÁÉÍÓÚ.,:;'`"-]*$/);
const alpha2 = helpers.regex("alpha1", /^[0-9,.\s]*$/);

const validateDate = (value) => {
  const todayDate = new Date();
  const threeYearsAfter = new Date().setFullYear(
    todayDate.getFullYear() + 3
  );
  const inputDate = new Date(Date.parse(value));
  inputDate.setDate(inputDate.getDate() + 1);
  return todayDate <= inputDate && inputDate < threeYearsAfter;
};

const validateEndDate = (value, vm) => {
  if (!vm.startDate || !value) {
    return true;
  }
  const startDate = new Date(Date.parse(vm.startDate));
  const endDate = new Date(Date.parse(value));
  startDate.setDate(startDate.getDate() + 1);
  endDate.setDate(endDate.getDate() + 1);
  return startDate < endDate;
};

const validateDecimals = (value) => {

  if (String(value).indexOf(".") > 0) {
    const parts = String(value).split(".");
    const dato = String(parts[1]);

    return !helpers.req(value) || !(dato.length > 2);
  } else {
    return true;
  }
};

const validateMinProductsCount = (value) => {
  return Object.keys(value).length > 1;
};

export default {
  name: "Form",
  props: ["image"],
  components: {Alert},
  data() {
    return {
      disabled: false,
      promotion: {
        promName: null,
        description: "",
        unitPrice: null,
        quantity: null,
        startDate: "",
        endDate: "",
        productList: this.$store.state.groupIDselected,
      },
    };
  },
  validations: {
    promotion: {
      promName: {
        required,
        minLength: minLength(2),
        maxLength: maxLength(30),
        alpha,
      },
      description: {
        required,
        maxLength: maxLength(1000),
      },
      unitPrice: {
        required,
        between: between(0.1, 10000),
        validateDecimals,
        alpha2,
      },
      quantity: {
        required,
        between: between(1, 1000),
        integer,
        alpha2,
      },
      startDate: {
        validateDate,
      },
      endDate: {
        validateDate,
        validateEndDate,
      },
      productList: {
        validateMinProductsCount,
      },
    },
  },
  methods: {
    async submitForm() {
      try {
        if (!this.$v.promotion.$invalid) {
          if (this.image == "") this.alert("warning", "Registra la imagen de la promoción");
          else {
            for (let id in this.$store.state.groupIDselected) {
              if (
                this.promotion.quantity *
                  this.$store.state.groupIDselected[id][0] >
                this.$store.state.groupIDselected[id][1]
              ) {
                this.alert("warning","No existen suficientes productos para esta promoción.");
                return;
              }
            }
            await this.sendDataProm();
            this.alert("success","Nueva promoción creada exitosamente");
          }
        } else {
          this.alert("warning","Rellene todos los datos correctamente");
        }
      } catch (error) {
        this.alert("warning",error);
      }
    },
    async sendDataProm() {
      try {
        await this.$http.post("promotions", {
          nombr_prom: this.promotion.promName,
          descrip_prom: this.promotion.description,
          precio_prom: this.promotion.unitPrice,
          cantidad_prom: this.promotion.quantity,
          fecha_ini: this.promotion.startDate,
          fecha_fin: this.promotion.endDate,
          products: this.$store.state.groupIDselected,
          imagen_prom: this.image,
        });
      } catch (error) {
        throw new Error("El nombre de la promoción esta repetido");
      }
    },
    alert(alertType, alertMessage){
      this.$refs.alert.showAlert(alertType, alertMessage);
    },
  },
  computed: {
    isAllValid() {
      return this.$v.promotion.$invalid || this.image == ""
        ? "form_button_disabled"
        : "";
    },
  },
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
