//Objetos
class Producto {

    constructor (nombre, precio, stock) {
        this.nombre = nombre;
        this.precio = precio;
        this.stock = stock;

    }
}

//Funciones
function existeElProducto(nombreDeProducto) {
    let encontrado = false;

    for(const producto of ListaDeProductos) {

        if(producto.nombre === nombreDeProducto) {
            encontrado = true;
            break;
        }
    }

    return encontrado;
}

function agregarUnProducto() {
    let productoAIngresar = prompt("Ingrese el nombre del libro que quiere agregar");

    //Mientras no exista un producto con el nombre que ingresó el usuario, se lo vuelvo a pedir
    while (!existeElProducto(productoAIngresar)) {
        productoAIngresar = prompt("Ingrese un nombre válido");
    }

    //Pedirle el stock
    let stock = parseInt(prompt("Ingrese cuántos libros desea"));

    while (stock <= 0) {
        stock = parseInt(prompt("Ingrese una cantidad válidad (mayor a 0)"));
    }

    //Lo cargamos al carrito
    carrito.push({
        nombre: productoAIngresar,
        cantidad: stock,
    });

    alert("Producto agregado");
}

function finalizarCompra() {
    let mensaje = "Los libros agregados son: ";

    for(const productoAgregadoAlCarrito of carrito) {
        mensaje += productoAgregadoAlCarrito.nombre + " - Cantidad: " + productoAgregadoAlCarrito.cantidad + "\n";
    }

    alert(mensaje); 
}

//Inicio del programa
const ListaDeProductos = [
    new Producto("El poder del ahora", 300, 10),
    new Producto("Este dolor no es mío", 250, 8),
    new Producto("Muchas vidas, muchos maestros", 200, 15),
];

const carrito = [];

let operacion = prompt("Ingrese la operación que desea realizar: 1-Agregar un libro / 2-Finalizar la compra / 0-Salir");

while (operacion !== "0") {
    
    switch(operacion) {
        case "1" :
        //Agregar un producto
            agregarUnProducto();
            break;

        case "2" :
        //Finalizar la compra
            finalizarCompra();
            break;

        default:
            alert("Ingrese una opción correcta")
            break;
    }

    //Volvemos a solicitar la operación
    operacion = prompt("Ingrese la operación que desea realizar: 1-Agregar un libro / 2-Finalizar la compra / 0-Salir");
}


/*Proceso para calcular envío de los libros */
//Funciones
function calcularEnvioAutoayuda(precio) {
    return 20 + (precio * 0.05);
}

function calcularEnvioNovela(precio) {
    return 30 + (precio * 0.05);
}

function calcularEnvio(Libro, funcionQueCalculaElEnvio) {
    
    let costo = funcionQueCalculaElEnvio(Libro.precio);
    
    return costo;
}

//Objetos
class Libro {

    constructor (nombre, categoria, precio) {
        this.nombre = nombre;
        this.categoria = categoria;
        this.precio = precio;
    }
}

const libro1 = new Libro("El poder del ahora", "Autoayuda", 300);
const libro2 = new Libro("Este dolor no es mío", "Autoayuda", 250);
const libro3 = new Libro("Muchas vidas, muchos maestros", "Autoayuda", 200);
const libro4 = new Libro("El método de Wim Hof", "Autoayuda", 300);
const libro5 = new Libro("Los cuatro acuerdos", "Autoayuda", 200);
const libro6 = new Libro("El alquimista", "Novela", 180);
const libro7 = new Libro("El principito", "Novela", 120);
const libro8 = new Libro("El fantasma de la ópera", "Novela", 250);
const libro9 = new Libro("Hasta que te vuelva a ver", "Novela", 150);

const costoPoderDelAhora = calcularEnvio(libro1, calcularEnvioAutoayuda);
const costoNoEsMio = calcularEnvio(libro2, calcularEnvioAutoayuda);
const costoMuchasVidas = calcularEnvio(libro3, calcularEnvioAutoayuda);
const costoWimHof = calcularEnvio(libro4, calcularEnvioAutoayuda);
const costoLosCuatroAcuerdos = calcularEnvio(libro5, calcularEnvioAutoayuda);
const costoElAlquimista = calcularEnvio(libro6, calcularEnvioNovela);
const costoElPrincipito = calcularEnvio(libro7, calcularEnvioNovela);
const costoElFantasmaDeLaOpera = calcularEnvio(libro8, calcularEnvioNovela);
const costoHastaQue = calcularEnvio(libro9, calcularEnvioNovela);

//console.log(costoPoderDelAhora);
