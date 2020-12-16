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
    path: "/producto/:id",
    name: "Producto",
    component: () => import("@/views/Producto.vue"),
  },
  {
    path: "/galeryCli",
    name: "GaleryCli",
    component: () => import("@/views/GaleryCli.vue"),
  },
  {
    path: "/vista_promo/:id",
    name: "VistaPromocion",
    component: () => import("@/views/VistaPromo.vue"),
  },
  {
    path: "/admin_productos",
    name: "AdminProductos",
    component: () => import("@/views/Admin_productos.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/registro_producto",
    name: "RegistroProducto",
    component: () => import("@/views/RegistroProducto.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/registro_promocion",
    name: "RegistroDePromocion",
    component: () => import("@/views/RegistroPromocion.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/editar_promocion",
    name: "Editar promocion",
    component: () => import("@/views/EdicionPromocion.vue"),
    meta: { requiresAuth: true }
  },
  {
    path: "/descuento_producto/:id",
    name: "DescuentoProducto",
    component: () => import("@/views/Descuento.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/product-category",
    name: "ProductCategory",
    component: () => import("@/views/ProductCategory"),
    meta: { requiresAuth: true },
  },
  {
    path: "/vista_promo/:id",
    name: "Vista_Promocion",
    component: () => import ("@/views/VistaPromo.vue"),
   },
   {
     path: "/editar_producto/:id",
     name: "Editar_Producto",
     component: () => import ("@/views/EditarProducto.vue"),
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
