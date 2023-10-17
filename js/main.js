//Funciones
function concatenarCodigos(codigoDeLibro) {
    if(codigosDeLibros !== "") {
        codigosDeLibros += ", ";
    }

    codigosDeLibros += codigoDeLibro;
}

function agregarUnNuevoLibro() {
    let codigoDeLibro = prompt("Ingrese el código del libro / 001 - $300 / 002 - $250 / 003 - $200 / 004 - $250 / 005 - $200 / 006 - $180/ 007 - $120 / 008 - $250 / 009 - $150/ 0 - Salir");

    while(codigoDeLibro !== "0") {
        
        switch(codigoDeLibro) {
            case "001":
                concatenarCodigos(codigoDeLibro)
                total += 300;
                break;

            case "002":
                concatenarCodigos(codigoDeLibro)
                total += 250;
                break;

            case "003":
                concatenarCodigos(codigoDeLibro)
                total += 200;
                break;

            case "004":
                concatenarCodigos(codigoDeLibro)
                total += 250;
                break;
            
            case "005":
                concatenarCodigos(codigoDeLibro)
                total += 200;
                break;

            case "006":
                concatenarCodigos(codigoDeLibro)
                total += 180;
                break;

            case "007":
                concatenarCodigos(codigoDeLibro)
                total += 120;
                break;

            case "008":
                concatenarCodigos(codigoDeLibro)
                total += 250;
                break;

            case "009":
                concatenarCodigos(codigoDeLibro)
                total += 150;
                break;

            default:
                alert("Código incorrecto");
                break;
        }

        //Volvemos a solicitar el código
        codigoDeLibro = prompt("Ingrese el código del libro / 001 - $300 / 002 - $250 / 003 - $200 / 004 - $250 / 005 - $200 / 006 - $180/ 007 - $120 / 008 - $250 / 009 - $150/ 0 - Salir");
    }
}

function mostrarEltotal() {
    alert("Los libros agregados son: " + codigosDeLibros + ". El total de los productos es $" + total);
}

function pedirOperacion() {
    return prompt("¿Qué operación desea realizar? 1- Ingresar nuevo libro / 2- Ver total de los libros ingresados / 0- Salir");
}


//Inicio del programa
let total = 0;
let codigosDeLibros = "";
let operacion = pedirOperacion();

while(operacion !== "0") {

    switch(operacion) {
        case "1":
            //Usuario quiere agregar un nuevo libro
            agregarUnNuevoLibro();
            break;

        case "2":
            //Usuario quiere ver el total de los libros ingresados
            mostrarEltotal();
            break;

        default:
            alert("Ingrese un valor correcto")
            break;
    }

    //Volvemos a pedir la operación
    operacion = pedirOperacion();
}

alert("Gracias por visitar nuestra tienda de libros, regrese pronto");
