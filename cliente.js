const inquirer = require("inquirer"); //creo constante que se llame como la libreria, require la llama, se usa en una constante por buena practica

//File system, para operar con archivos
const fs = require('fs');

let preguntasDelivery = [
    {
        type: "confirm",
        name: "delivery",
        message: "Es para delivery",
        default: false
    },
    {
        type: "input",
        name: "direccionCliente",
        message: "Escribi tu direccion",
        when: respuestas => respuestas.delivery, // cuando debe ocurrir
        validate: rta => rta.trim() == '' ? 'Campo obligatorio' : true
        
    },
    {
        type: "input",
        name: "nombreCliente",
        message: "Escribi tu nombre",
        validate: rtaDeEstaPregunta => { //validacion
            if(rtaDeEstaPregunta.trim() == ''){ //agrego el metodo trim para eliminar los espacios en blanco antes y despues
                return 'El nombre es obligatorio';
            }
            return true;
        }
    },
    {
        type: "input",
        name: "telefono",
        message: "Cual es tu telefono",
        validate: rtaNumero => { //validate recibe solo la respuestas que esta en este bloque
            
            if(rtaNumero.trim() == ''){
                return 'El telefono es obligatorio';
            } else if(rtaNumero.length < 8 || isNaN(rtaNumero)){
                return 'Ingresa un numero valido';
            }
            
            return true;
        }
        
    },

    {
        type: "rawlist",
        name: "gustoPizza",
        message: "De que gusto",
        choices: ['Muzza', 'Jamon', 'Fugazzeta', 'Napolitana'],
        default: 'Muzza'
    },
    {
        type: "list",
        name: "tamanoPizza",
        message: "Tamaño de la pizza",
        choices: ['Chica', 'Mediana', 'Grande'],
        default: 'Grande'
    },
    {
        type: 'confirm',
        name: 'conBebidas',
        message: 'Queres bebidas?',
        default: false
    },
    {
        type: "list",
        name: "bebidas",
        message: "Que bebida",
        choices: ['Agua', 'Gaseosa', 'Cerveza', 'Vino'],
        default: 'Gaseosa',
        when: respuestas => respuestas.conBebidas //when recibe todas las respuestas
    },
    {
        type: "confirm",
        name: "esCliente",
        message: "Sos cliente habitual",
        default: false
    },
    {
        type: "checkbox",
        name: "empanadas",
        message: "Que empanadas queres",
        choices: ['Carne', 'JQ', 'Pollo', 'Capresse', 'Cebolla', 'Atun'],
        when: function (rta) {
            return rta.esCliente === true;
        },
        validate: rta => {
            if(rta.length != 3){
                return 'Elegi 3 empanadas';
            }
            return true;
        }
    }
    
]

//Bienvenida
console.log('Bienvenido a DH Pizzas. Estamos listos para tomar su pedido');

let rtasTotales = rtas => {
    let totalProductos = 0;
    let totalDelivery = 0;
    let descuento = 0;
    let total = 0;

    console.log('=== Resumen de tu pedido ===');
    console.log('Tus datos son - Nombre: ' + rtas.nombreCliente.trim() + '/ Teléfono: ' + rtas.telefono);

    if (rtas.delivery){
        console.log('Tu pedido será entregado en: ' + rtas.direccionCliente);
        totalDelivery = 20;
    }else{
        console.log('Nos indicaste que pasarás a retirar tu pedido');
    }
    console.log('=== Productos solicitados ===');
    console.log('Pizza: ' + rtas.gustoPizza);
    console.log('Tamaño: ' + rtas.tamanoPizza);
    switch (rtas.tamanoPizza){
        case 'Chica':
            totalProductos = 430;
            if(rtas.conBebidas){
                descuento = 3;
            }
            break;
        case 'Mediana':
            totalProductos = 560;
            if(rtas.conBebidas){
                descuento = 5;
            }
            break;
        case 'Grande':
            totalProductos = 650;
            if(rtas.conBebidas){
                descuento = 8;
            }
            
            
    }

    if (rtas.conBebidas){
        console.log('Bebida: ' + rtas.bebidas);
        totalProductos = totalProductos + 80;
        
    }
    if (rtas.esCliente){
        console.log('Tus 3 empanadas de regalo serán de:');
        console.log(rtas.empanadas[0]);
        console.log(rtas.empanadas[1]);
        console.log(rtas.empanadas[2]);
    }
    //Calculo de totales
    total = (totalProductos + totalDelivery) - ((totalProductos + totalDelivery)*(descuento / 100));


    console.log('=====================================');
    console.log('Total productos: ' + totalProductos);
    console.log('Total Delivery: ' + totalDelivery);
    console.log('Descuentos: ' + descuento + '%');
    console.log('TOTAL: ' + total);
    console.log('=====================================');
    console.log('Gracias por elegir DH Pizzas, esperamos que disfrute su pedido.');

    let fecha = new Date();
	let fechaPedido = fecha.toLocaleDateString();
	let horaPedido = fecha.toLocaleTimeString();

	//Agregando data adicional, armo un objeto con mas informacion
	let dataAdicional = {
		fecha: fechaPedido,
		hora: horaPedido,
		totalProductos: totalProductos,
		descuento: descuento
    }
    
    
    //creo constante con la ruta del archivo a modificar
    const rutaDelArchivo = __dirname + '/pedidos.json';

    //leo archivo y armo ternario para ver si esta vacio u obtener su contenido en formato objeto(porque viene como string)
    let infoArchivo = fs.readFileSync(rutaDelArchivo, 'utf8');
    let contenidoPedidos = infoArchivo.length == 0 ? [] : JSON.parse(infoArchivo);

    let numeroPedidos = {
        id: contenidoPedidos.length + 1
    }

    //uso spread para combinar objetos
    rtas = {...rtas, ...dataAdicional, ...numeroPedidos}


    contenidoPedidos.push(rtas);

    fs.writeFileSync(rutaDelArchivo, JSON.stringify(contenidoPedidos, null, ' ')); //el null y espacio es para dejarlo mas ordenado
    

}
inquirer
    .prompt(preguntasDelivery)

    .then(rtasTotales);
  