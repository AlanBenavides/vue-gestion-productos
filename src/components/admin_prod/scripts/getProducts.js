//import axios from 'axios'

const Nproducts = 10;

//funcion para pruebas
function gen(init, cantidad) {
  let productos = [];

  for (let i = init; i < init + cantidad; i++) {
    productos.push({
      id: i,
      nombre: "productos".concat(i),
      precio: i + 20,
      descripcion: "descripcion".concat(i),
      fecha: "10/10/200".concat(i),
    });
  }
  return productos;
}

/*
Las siguientes funciones
requieren pedir de la API los datos ya ordenados
sql: SELECT id, nombre, precio, descripcion, fecha FROM producto ORDER BY <criteria> LIMIT 10 OFFSET "offset"

por ahora solo muestran en consola el orden elegido
*/
function getProducts(page, criteria) {
  const offset = (page - 1) * Nproducts;
  console.log("Ordenado por ".concat(criteria));
  return gen(offset, Nproducts);
  //let productos = []
  //data = {offset, criteria}
  //axios.get('http://direccion:puerto/consulta/', data)
  //.then(response => (productos.push(response.rowa)))
  //return productos
}

function getPagesCount() {
  let productsCount = 76;
  //axios.get('http://direccion:puerto/consulta')
  //.then(response => (productsCount.push(response.datos)))
  return (productsCount - (productsCount % Nproducts)) / Nproducts;
}

export { getProducts, getPagesCount };
