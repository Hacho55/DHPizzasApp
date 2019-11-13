const fs = require('fs');
const rutaDelArchivo = __dirname + '/pedidos.json';

let contenidoPedidos = fs.readFileSync(rutaDelArchivo, 'utf8');
let pedidos = contenidoPedidos.length > 0 ? JSON.parse(contenidoPedidos) : null;

if (pedidos != null) {
    //Cantidad de pedidos
    let cantidadPedidos = pedidos.length;

    //Cantidad de pizzas por gusto
    let filtrarPorGusto = gusto => pedidos.filter(pedidos => pedidos.gustoPizza == gusto).length;

    let gustoMuzzarella = filtrarPorGusto('Muzza'); //seguirlo
    let gustoJamon = filtrarPorGusto('Jamon');
    let gustoFugazzeta = filtrarPorGusto('Fugazzeta');
    let gustoNapolitana = filtrarPorGusto('Napolitana');

    //Cantidad de pizzas por tamaño
    let filtrarPorTamano = tamano => pedidos.filter(pedidos => pedidos.tamanoPizza == tamano).length;

    let gustoGrande = filtrarPorTamano('Grande'); //seguirlo
    let gustoMediana = filtrarPorTamano('Mediana');
    let gustoChica = filtrarPorTamano('Chica');

    //Cantidad de pedido para delivery
    let cantidadDelivery = pedidos.filter(cadaPedido => cadaPedido.delivery == true).length;
    

    //Cantidad de bebidas
    let cantidadBebidas = bebidas => pedidos.filter(pedidos.conBebidas == true).lenght;

    //Cantidad de Clientes habituales
    let cantClientesHabituales = pedidos.filter(pedido => pedidos.esCliente == true).lenght;

    let fecha = new Date();
	let fechaGeneracion = fecha.toLocaleDateString();
    let horaGeneracion = fecha.toLocaleTimeString();
    
    //Reporte

    console.log(`Reporte generado con éxito
    |===*** Reporte de ventas ***===|
    Fecha de generación: ${fechaGeneracion}
    Hora: ${horaGeneracion}

    |===*** Cantidad de pedidos realizados ***===|
    Total: ${cantidadPedidos}

    |===*** Cantidad de pedidos para delivery ***===|
    Total: ${cantidadDelivery}

    |===*** Cantidad de pizzas pedidas por gusto ***===|
    Total Muzzarella: ${gustoMuzzarella}
    Total Napolitana: ${gustoNapolitana}
    Total Jamón: ${gustoJamon}
    Total Fugazzeta: ${gustoFugazzeta}

    |===*** Cantidad de pizzas vendidas por tamaño ***===|
    Total Chica: ${gustoChica}
    Total Mediana: ${gustoMediana}
    Total Grande: ${gustoGrande}

    |===*** Cantidad de pedidos con bebida ***===|
    Total: ${cantidadBebidas}

    |===*** Cantidad de clientes habituales ***===|
    Total: ${cantClientesHabituales}

    |===*** Cantidad de de empandas regaladas ***===|
    Total: ${cantClientesHabituales * 3}

    |====================================================|`);
    




    

    
}else{
    console.log('No hay pedidos para generar el reporte');
}
