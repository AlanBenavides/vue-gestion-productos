//funcion para pruebas
function gen(init, cantidad){
    let productos = []
    
    for(let i=init; i < init+cantidad; i++){
        productos.push({
            id: i,
            nombre: 'productos'.concat(i),
            precio: i+20,
            descripcion: 'descripcion'.concat(i),
            fecha: '10/10/200'.concat(i)
        })
    }
    return productos
}

/*
Las siguientes funciones
requieren pedir de la API los datos ya ordenados
sql: SELECT id, nombre, precio, descripcion, fecha FROM producto ORDER BY <criteria> LIMIT 10 OFFSET "offset"

por ahora solo muestran en consola el orden elegido
*/
function getProducts(page, criteria) {
    let offset = (page-1)*10

    console.log("Ordenado por ".concat(criteria))
    return gen(offset,10)
}

function getPagesCount(){
    let productsCount = 76
    return (productsCount-(productsCount%10))/10
}

module.exports = {
    getProducts,
    getPagesCount
};