<template>
  <section class="datos">
    <div class="datos_container">
      <form @submit.prevent="submitForm">
        <h2 class="producto_tittle">{{ datos.nombre_prod }}:</h2>
        <p class="datos_info">
          Precio Actual:
          <span class="datos_resaltados datos_resaltados-block datos_precio"
            >{{ datos.precio_unid }}Bs.</span
          >
        </p>
        <div>
          <p>Descuento en porcentaje:</p>
          <input
            type="text"
            v-model="descuento.porcentaje"
            :class="
              $v.descuento.porcentaje.$invalid
                ? 'formulario_check-input-error'
                : 'formulario_check-input'
            "
          />
          %

          <br />
          <div
            class="formulario_check-error"
            v-if="!$v.descuento.porcentaje.alpha2"
          >
            Ingrese un valor entero numérico.
          </div>
          <div
            class="formulario_check-error"
            v-if="!$v.descuento.porcentaje.between"
          >
            Por favor, ingrese un valor entre (5-75)
          </div>
          <div
            class="formulario_check-error"
            v-if="!$v.descuento.porcentaje.required"
          >
            Campo requerido.
          </div>
          <br />
          <p>Unidades a comprar:</p>
          <input
            name="numero"
            type="text"
            v-model="descuento.cantidad"
            :class="
              $v.descuento.cantidad.$invalid
                ? 'formulario_check-input-error'
                : 'formulario_check-input'
            "
          />
          <br />
          <div
            class="formulario_check-error"
            v-if="!$v.descuento.cantidad.required"
          >
            Campo requerido.
          </div>
          <div
            class="formulario_check-error"
            v-if="!$v.descuento.cantidad.alpha2"
          >
            Ingrese un valor numerico.
          </div>
          <div
            class="formulario_check-error"
            v-if="!$v.descuento.cantidad.between"
          >
            Ingrese un valor entre(1-1000).
          </div>
        </div>
        <div class="precio_descuento">
          <br />
          <label>Precio con descuento: </label>
          <span v-if="!this.$v.descuento.$invalid"
            >{{ transformPrice(datos.precio_unid) }} Bs.</span
          >
        </div>
        <div>
          <br />
          <button
            :disabled="$v.descuento.$invalid"
            class="formulario_button"
            :class="$v.descuento.$invalid ? 'button_disabled' : ''"
          >
            Aplicar descuento
          </button>
          <button
            :disabled="!descuento.hayDescuento"
            @click="confirmDeletion($event)"
            class="formulario_button"
            :class="!descuento.hayDescuento ? 'button_disabled' : ''"
          >
            Eliminar descuento
          </button>
        </div>
      </form>
    </div>
    <Alert ref="alert"></Alert>
    <Confirm
      ref="confirm"
      @taken-decision="executeAction($event, deleteDiscount)"
    ></Confirm>
  </section>
</template>

<script>
import Confirm from "@/components/Confirm.vue";
import Alert from "@/components/Alert.vue";
import { between, helpers, required } from "vuelidate/lib/validators";
const alpha2 = helpers.regex("alpha1", /^[0-9\s]*$/);

export default {
  name: "Datos",
  props: ["datos"],
  components: { Confirm, Alert },
  data: function () {
    return {
      descuento: {
        porcentaje: "",
        cantidad: null,
        hayDescuento: false,
      },
    };
  },
  validations: {
    descuento: {
      porcentaje: {
        between: between(5, 75),
        alpha2,
        required,
      },
      cantidad: {
        between: between(1, 1000),
        alpha2,
        required,
      },
    },
  },

  methods: {
    transformPrice(value) {
      const price = value;
      const newPrice = (price * this.descuento.porcentaje) / 100;
      const result = (price - newPrice).toFixed(2);
      return `${result}`;
    },
    async submitForm() {
      try {
        if (!this.$v.descuento.$invalid) {
          await this.sendDataDiscounts();
          this.alert("success", "Descuento creado exitosamente");
          this.descuento.hayDescuento = true;
        } else {
          this.alert("warning", "Rellene todos los datos correctamente");
        }
      } catch (error) {
        this.alert("warning", error);
      }
    },
    async sendDataDiscounts() {
      try {
        if (this.descuento.hayDescuento) {
          await this.$http.put(`discounts/${this.datos.cod_prod}`, {
            porcentaje: this.descuento.porcentaje,
            cantidad_req: this.descuento.cantidad,
          });
        } else {
          await this.$http.post("discounts", {
            cod_prod: this.datos.cod_prod,
            porcentaje: this.descuento.porcentaje,
            cantidad_req: this.descuento.cantidad,
          });
        }
      } catch (error) {
        throw new Error("Cantidad de productos insuficiente ");
      }
    },
    async deleteDiscount() {
      try {
        await this.$http.delete(`discounts/${this.datos.cod_prod}`);
        this.alert("success", "Eliminación exitosa");
        this.descuento.porcentaje = "";
        this.descuento.cantidad = null;
        this.descuento.hayDescuento = false;
      } catch (error) {
        this.alert("warning", error);
      }
    },
    confirmDeletion(defaultEvent) {
      defaultEvent.preventDefault();
      this.confirm(
        "¿Seguro que quiere eliminar el descuento de este producto?"
      );
    },
    confirm(confirmMessage) {
      this.$refs.confirm.showConfirm(confirmMessage);
    },
    executeAction(takenDecision, functionToExecute) {
      if (takenDecision) {
        functionToExecute();
      }
    },
    alert(alertType, alertMessage) {
      this.$refs.alert.showAlert(alertType, alertMessage);
    },
  },
  mounted: async function () {
    const response = await this.$http.get(`discounts/${this.$route.params.id}`);
    this.descuento.hayDescuento = response.data.datos.length > 0;
    if (this.descuento.hayDescuento) {
      this.descuento.cantidad = response.data.datos[0].cantidad_req;
      this.descuento.porcentaje = parseInt(
        response.data.datos[0].porcentaje
      ).toFixed(0);
    }
  },
};
</script>

<style scoped>
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
  border-radius: var(--border-radius);
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

.datos_precio {
  margin: 10px;
  margin-left: 0;
  font-size: 1.4rem;
}
.formulario_button {
  margin: 5px;
  display: inline-block;
  background-color: var(--color-btn);
  padding: 13px 30px;
  color: white;
  font-size: 20px;
  font-weight: 700;
  text-align: right;
}

.button_disabled {
  background-color: var(--color-btn-disable);
  border: 2px solid var(--color-btn-disable);
}

.formulario_check-error {
  color: var(--font-color-error);
}

.formulario_check-input {
  border: 1px solid var(--font-color-accept) !important;
}

.formulario_check-input-error {
  border: 1px solid var(--font-color-error) !important;
}

.precio_descuento {
  color: var(--font-discount-before);
  font-weight: 700;
  font-size: 1.5rem;
}

.producto_tittle {
  grid-column: 2/3;
  grid-row: 1/2;
  text-align: left;
  color: var(--font-color-secondary);
  font-weight: 700;
  font-size: 2rem;
  display: block;
  text-overflow: ellipsis;
}
</style>
