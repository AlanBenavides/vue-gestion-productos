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
    meta: { requiresAuth: true },
  },
  {
    path: "/registro_producto",
    name: "Registro_Producto",
    component: () => import("@/views/RegistroProducto.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/registro_promocion",
    name: "Registro de promocion",
    component: () => import("@/views/RegistroPromocion.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/descuento_producto/:id",
    name: "Descuento_Producto",
    component: () => import("@/views/Descuento.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/GaleryCli",
    name: "GaleryCli",
    component: () => import("@/views/GaleryCli.vue"),
  },
  {
    path: "/vista_promo/:id",
    name: "Vista_Promocion",
    component: () => import("@/views/VistaPromo.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (localStorage.getItem("session-vue") == "true") {
      next();
    } else {
      next({ name: "Home" });
    }
  } else next();
});

export default router;
