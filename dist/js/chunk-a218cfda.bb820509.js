(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-a218cfda"],{"3b98":function(t,e,n){},"8fbb":function(t,e,n){"use strict";var a=n("3b98"),o=n.n(a);o.a},9431:function(t,e,n){"use strict";var a=n("ea51"),o=n.n(a);o.a},abf9:function(t,e,n){"use strict";n.r(e);var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("section",[n("h1",{staticClass:"admin_productos-title"},[t._v("Administración de productos")]),n("div",{staticClass:"admin_productos-container"},[n("Options",{staticClass:"admin_productos-options"}),n("Short",{staticClass:"admin_productos-products"})],1)])},o=[],r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("aside",[n("ul",{staticClass:"options btn-group-vertical"},[n("router-link",{staticClass:"button",attrs:{to:"/registro_producto",tag:"button"}},[t._v("Registro de Producto ")]),n("router-link",{staticClass:"button",attrs:{to:"/registro_promocion",tag:"button",disabled:t.canAddToProm}},[t._v(" "+t._s(t.buttons[1].name)+" ")]),n("router-link",{staticClass:"button",attrs:{to:"",tag:"button",disabled:-1==t.$store.state.idSelected[0]}},[t._v(" "+t._s(t.buttons[0].name)+" ")]),n("button",{staticClass:"button",attrs:{disabled:-1==t.$store.state.idSelected[0]},on:{click:t.hayCantidad}},[t._v(" Aplicar descuento ")]),n("router-link",{staticClass:"button",attrs:{to:"",tag:"button",disabled:-1==this.$store.state.idSelected[0]}},[t._v(" "+t._s(t.buttons[2].name)+" ")])],1)])},s=[],i=(n("96cf"),n("1da1")),c={name:"Options",props:["id_product"],data:function(){return{buttons:[{name:"Editar producto"},{name:"Añadir a promocion"},{name:"Eliminar"}]}},mounted:function(){this.$store.commit("changeSelection",-1)},computed:{canAddToProm:function(){return-1!=this.$store.state.idSelected[0]&&null==this.$store.state.idSelected[1]}},methods:{hayCantidad:function(){var t=this;return Object(i["a"])(regeneratorRuntime.mark((function e(){var n,a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return n=t.$store.state.idSelected[0],e.next=3,t.obtenerCantidad(n);case 3:a=e.sent,a?t.$router.push("/descuento_producto/".concat(n)):alert("No se puede aplicar un descuento a este producto.");case 5:case"end":return e.stop()}}),e)})))()},obtenerCantidad:function(t){var e=this;return Object(i["a"])(regeneratorRuntime.mark((function n(){var a;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return n.next=2,e.$http.get("products/".concat(t));case 2:return a=n.sent,n.abrupt("return",a.data.datos[0].cantidad);case 4:case"end":return n.stop()}}),n)})))()}}},u=c,d=(n("8fbb"),n("2877")),l=Object(d["a"])(u,r,s,!1,null,"751e7196",null),p=l.exports,b=n("3a26"),m={name:"Admin_productos",components:{Options:p,Short:b["a"]}},f=m,h=(n("9431"),Object(d["a"])(f,a,o,!1,null,"92cd125e",null));e["default"]=h.exports},ea51:function(t,e,n){}}]);
//# sourceMappingURL=chunk-a218cfda.bb820509.js.map