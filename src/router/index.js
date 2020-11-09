import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("@/views/Home.vue"),
  },
  {
    path: "/about",
    name: "About",
    component: () => import("@/views/About.vue"),
  },
  {
    path: "/producto/:id",
    name: "Producto",
    component: () => import("@/views/Producto.vue"),
  },
  {
    path: "/admin_productos",
    name: "Admin_productos",
    component: () => import("@/views/Admin_productos.vue"),
  },
  {
    path: "/registro_producto",
    name: "Registro_Producto",
    component: () => import("@/views/RegistroProducto.vue"),
  },
  {
    path: "/registro_promocion",
    name: "Registro de promocion",
    component: () => import("@/views/RegistroPromocion.vue"),
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
