//Clases
class Producto {
    constructor(nombre, precio, stock) {
        this.nombre = nombre;
        this.precio = precio;
        this.stock = stock;
    }
}

//Funciones

function ordenarPorPrecioAscendente() {

    const productosOrdenadosAscendentemente = listadoDeProductos.sort( (productoA, productoB) => {

        if(productoA.precio > productoB.precio) {
            return 1;
        } else if(productoA.precio < productoB.precio) {
            return -1;
        }

        return 0;
    });

    // Renderizo los productos
    renderizarProductos(productosOrdenadosAscendentemente);

}

function ordenarPorPrecioDescendente() {

    const productosOrdenadosDescendentemente = listadoDeProductos.sort( (productoA, productoB) => {

        if(productoA.precio < productoB.precio) {
            return 1;
        } else if(productoA.precio > productoB.precio) {
            return -1;
        }

        return 0;
    });

    // Renderizo los productos
    renderizarProductos(productosOrdenadosDescendentemente);

}

function inicializarSelect() {
    const select = document.getElementById("selectOrden");

    select.addEventListener("change", () => {

        const value = select.value;

        switch(value) {
            case 'precio':

                ordenarPorPrecioAscendente();

                break;

            case 'nombre':
                
                ordenarPorPrecioDescendente();

                break;
        }
    });
}

function inicializarInput() {

    const input = document.getElementById("buscarProducto");

    input.addEventListener("keyup", () => {
        
        //Filtramos los libros por lo que puso el usuario en el input
        const value = input.value;
        
        const productosFiltrados = listadoDeProductos.filter( (producto) => {
            return producto.nombre.toLowerCase().includes(value.toLowerCase());
        });
        
        //Renderizo los productos
        renderizarProductos(productosFiltrados);
    });
}

function eliminarProducto(producto) {
    
    // Busco el producto a eliminar del carrito por el nombre
    const indiceProductoAEliminar = carrito.findIndex( (el) => {
        return producto.nombre === el.nombre;
    });

    // Si el índice del producto a eliminar existe
    if(indiceProductoAEliminar !== -1) {

        // Elimino el producto del carrito
        carrito.splice(indiceProductoAEliminar, 1);

        // Actualizo localStorage
        localStorage.setItem("carrito", JSON.stringify(carrito));

        renderizarTablaCarrito(carrito);
    }

}

function obtenerProductosEnLS() {
    carrito = JSON.parse(localStorage.getItem("carrito"));

    if(carrito) {
        renderizarTablaCarrito(carrito);
    }
}

function guardarProductoEnLS(producto, cantidad) {

    const productoAAgregar = {
        nombre: producto.nombre,
        precio: producto.precio,
        cantidad: parseInt(cantidad),
    };

    // No hay productos en local Storage
    if(carrito === null) {

        carrito = [productoAAgregar];

    } else {

        // Busco el índice del producto en el array del localstorage para editarlo si existe
        const indiceExisteProducto = carrito.findIndex( (el) => {
            return el.nombre === productoAAgregar.nombre;
        });

        // Si el producto no existe en el localstorage, lo agrego
        if(indiceExisteProducto === -1) {
            carrito.push(productoAAgregar);
        } else {
            // Si existe, a la cantidad del producto que está en localstorage, le sumo la nueva cantidad
            carrito[indiceExisteProducto].cantidad += parseInt(cantidad);
        }
    }

    // Actualizo localStorage
    localStorage.setItem("carrito", JSON.stringify(carrito));

    renderizarTablaCarrito(carrito);

}

function renderizarTablaCarrito(productosCarrito) {

    const tbody = document.querySelector("#carrito table tbody");
    tbody.innerHTML = "";

    for(const productoCarrito of productosCarrito) {

        const tr = document.createElement("tr");

        const tdNombre = document.createElement("td");
        tdNombre.innerText = productoCarrito.nombre;

        const tdPrecio = document.createElement("td");
        tdPrecio.innerText = `$${productoCarrito.precio}`;

        const tdCantidad = document.createElement("td");
        tdCantidad.innerText = productoCarrito.cantidad;

        const tdEliminar = document.createElement("td");

        const botonEliminar = document.createElement("button");
        botonEliminar.className = "btn btn-danger";
        botonEliminar.innerText = "Eliminar";

        // Agregar evento al boton
        botonEliminar.addEventListener("click", () => {
            Swal.fire({
                title: 'Eliminado(s)',
                text: 'El libro o libros han sido eliminados con éxito',
                icon: 'error',
                confirmButtonText: 'OK'
            })

            eliminarProducto(productoCarrito);
        });

        // Agregar elementos uno adentro de otro
        tdEliminar.append(botonEliminar);
        tr.append(tdNombre, tdPrecio, tdCantidad, tdEliminar);

        tbody.append(tr);
    }
}

function renderizarProductos(productos) {
    const contenedor = document.getElementById("contenedor");
    contenedor.innerHTML = "";

    /* 
    <div class="card autoayuda" style="width: 18rem;">
        <img src="img/ElPoderDelAhora.png" class="card-img-top" alt="Libro El poder del ahora">
        <div class="card-body">
            <h5 class="card-title">Código 001</h5>
            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            <button type="button" class="btn btn-primary">Comprar</a>
        </div>
    </div>
    */

    for(const producto of productos) {

        //Crear los elementos dinámicamente
        const divPadre = document.createElement("div");
        divPadre.className = "card autoayuda";

        const divCardBody = document.createElement("div");
        divCardBody.className = "card-body";

        const h5 = document.createElement("h5");
        h5.className = "card-title";
        h5.innerText = producto.nombre;

        const p = document.createElement("h5");
        p.className = "card-text";
        p.innerHTML = `<strong>Precio:</strong> $${producto.precio} - <strong>Stock:</strong> ${producto.stock}`;

        const divAgregarAlCarrito = document.createElement("div");
        divAgregarAlCarrito.className = "d-flex align-items-center";


        const button = document.createElement("button");
        button.className = "btn btn-primary";
        button.innerText = "Agregar al carrito";

        const inputCantidad = document.createElement("input");
        inputCantidad.type = "number";
        inputCantidad.className = "form-control";
        inputCantidad.value = 1;

        //Agregar al carrito
        button.addEventListener("click", () => {
            
             // Obtenemos la cantidad del input
            const cantidad = inputCantidad.value;

            if(cantidad > producto.stock) {

            alert("NO HAY SUFICIENTE STOCK");

            } else {

            // Agregar producto a Local Storage
            guardarProductoEnLS(producto, cantidad);
            }

            Swal.fire({
                title: 'Agregado(s)',
                text: 'El libro o libros fueron agregados correctamente',
                icon: 'success',
                confirmButtonText: 'OK'
            })
        });

        //Insertar elementos adentro de otro
        divAgregarAlCarrito.append(button, inputCantidad);
        divCardBody.append(h5, p, button, divAgregarAlCarrito);
        divPadre.append(divCardBody);
        contenedor.append(divPadre);
    }
}

/*

function obtenerProductosJson() {
    return new Promise((resolve, reject) => {
        fetch('/productos.json')
            .then((response) => {
                if (!response.ok) {
                    throw new Error('No se pudo cargar el archivo JSON');
                }
                return response.json();
            })
            .then((responseJson) => {
                const productos = [];

                for (const productoData of responseJson) {
                    const producto = new Producto(productoData.nombre, productoData.precio, productoData.stock, productoData.imagen);
                    productos.push(producto);
                }

                resolve(productos);
            })
            .catch((error) => {
                reject(error);
            });
    });
}

*/

//Inicio del programa
const listadoDeProductos = [
    new Producto("El poder del ahora", 300, 40),
    new Producto("Este dolor no es mío", 250, 70),
    new Producto("Muchas vidas, muchos maestros", 200, 30),
    new Producto("El método de Wim Hof", 250, 80),
    new Producto("Los cuatro acuerdos", 200, 45),
    new Producto("El alquimista", 180, 50),
    new Producto("El principito", 120, 50),
    new Producto("El fantasma de la ópera", 250, 90),
    new Producto("Hasta que te vuelva a ver", 150, 60),
]

let carrito = [];

renderizarProductos(listadoDeProductos);
inicializarInput();
inicializarSelect();
obtenerProductosEnLS();
//obtenerProductosJson();


