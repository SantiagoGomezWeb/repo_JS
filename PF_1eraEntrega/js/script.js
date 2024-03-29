// Procuctos
const productosCatalogo = [
    {
        codigo: '135H002',
        nombre: 'Opel K-180',
        precio: 1890,
        foto: './images/135H002.png'
    },
    {
        codigo: '135H003',
        nombre: 'C-10 Pick Up',
        precio: 89491,
        foto: './images/135H003.png'
    },
    {
        codigo: '135H004',
        nombre: 'Chevette 1.6 Junior',
        precio: 2251,
        foto: './images/135H004.png'
    }
];
// Variables

const seccionProductos = document.getElementById('productos');
const compras = document.getElementById('compras');
const DOMitems = document.querySelector('#items');

let carrito = [];

// Funciones
function buscoArticuloporCodigo(articuloIngresado) {
    let codigoArticulo = '';
    switch (articuloIngresado) {
        case '135':
            codigoArticulo = '135H002';
            break;
        case '136':
            codigoArticulo = '136H003';
            break;
        case '137':
            codigoArticulo = '137H004';
            break;
        default:
            alert('Entrada inválida');
            break;
        };
    return codigoArticulo;
}

function pusheoArticulo(articuloIngresado, can){
    switch (articuloIngresado) {
        case '135':
            carrito.push({
                codigo: '135H002',
                nombre: 'Opel K-180',
                precio: 1890,
                foto: './images/135H002.png', 
                cantidad: can
            });
            break;
        case '136':
            carrito.push({
                codigo: '136H003',
                nombre: 'C-10 Pick Up',
                precio: 89491,
                foto: './images/135H003.png',
                cantidad: can
            });
            break;
        case '137':
            carrito.push({
                codigo: '137H004',
                nombre: 'Chevette 1.6 Junior',
                precio: 2251,
                foto: './images/135H004.png',
                cantidad: can
            });
            break;
        default:
            alert('Articulo Inexistente');
            break;
    };
}
    
function agregarArticuloAlCarrito(articuloIngresado) {
    if (!buscoArticuloenCarrito(articuloIngresado)){
        pusheoArticulo(articuloIngresado, 1);
    } else {
        cantiFinal = 0;
        carrito.forEach(elemento => {
            if (buscoArticuloporCodigo(articuloIngresado)==elemento.codigo){
                cantiFinal = elemento.cantidad + 1;
                borrarItemCarrito(articuloIngresado);
                pusheoArticulo(articuloIngresado, cantiFinal);
            }
        });
    }
}

function buscoArticuloenCarrito(articuloIngresado) {
    const encontre = carrito.some((articulo) => articulo.codigo == buscoArticuloporCodigo(articuloIngresado));
    return encontre;
}

function borrarItemCarrito(articuloIngresado) {
    carrito = carrito.filter((item) => item.codigo !== buscoArticuloporCodigo(articuloIngresado));
    console.log(carrito);
    return carrito;
}

function muestroCarritoDOM(array) {
    let info = '';
    let infoTotal = '';
    document.innerHTML = '';

    array.forEach(elemento => {
        info = 'Codigo: ' + elemento.codigo + '<br>Descripcion: ' + elemento.nombre + '<br>Precio: $' + elemento.precio + '<br>Cantidad: ' + elemento.cantidad + '<br><br>'
        let mensajeCarrito = document.createElement('p');
        mensajeCarrito.innerHTML = info;
        compras.append(mensajeCarrito);
    });
    if (calculoTotal() > 0) {
        infoTotal = 'El Total a Pagar es: $' + calculoTotal(); 
    }
    let mensajeTotal = document.createElement('p');
    mensajeTotal.innerHTML = infoTotal;

    compras.append(mensajeTotal);    
}

function calculoTotal() {
    const precioFinal = carrito.reduce((total,item)=>{
        return total+=(item.precio)*(item.cantidad)},0);
        return precioFinal;
    }


function dibujarProductos() {
    productosCatalogo.forEach((info) => {
        // div para la card
        const renglon = document.createElement('div');
        renglon.classList.add('card');

        // cuerpo
        const tarjeta = document.createElement('div');
        tarjeta.classList.add('card-body');

        // Titulo - Codigo
        const renglonTitulo = document.createElement('h4');
        renglonTitulo.classList.add('card-title');
        renglonTitulo.textContent = info.codigo;

        // descri del Articulo
        const renglonDescri = document.createElement('h5');
        renglonDescri.classList.add('card-subtitle');
        renglonDescri.textContent = info.nombre;

        // foto
        const renglonFoto = document.createElement('img');
        // renglonFoto.classList.add('img-flucodigo');
        renglonFoto.classList.add('img');
        renglonFoto.setAttribute('src', info.foto);

        // Precio
        const renglonPrecio = document.createElement('p');
        renglonPrecio.classList.add('card-text');
        renglonPrecio.textContent = '$'+`${info.precio}`;

        tarjeta.appendChild(renglonFoto);
        tarjeta.appendChild(renglonTitulo);
        tarjeta.appendChild(renglonDescri);
        tarjeta.appendChild(renglonPrecio);

        renglon.appendChild(tarjeta);

        DOMitems.appendChild(renglon);
    });
}


const tomarPedido = () => {
    //interactuo con el usuario
    let meVoy = false;
    do{
        let entrada =  parseInt(prompt('Que queres hacer?\n1.- Agregar Articulo al Carrito\n2.- Quitar un Articulo\n3.- Ir a Pagar\n0.- Cancelar Compra'));
        switch (entrada) {
            case 0:
                //me voy
                alert('Compra Cancelada\nTe esperamos pronto !!!');
                carrito = [];
                meVoy = true;
                break;
            case 1:
                // agregar articulo
                let articuloIngresado = prompt('Ingregá el Código de Articulo a AGREGAR: \n\nArticulos con Stock: 135, 136, 137\n(0) para Cancelar');        
                agregarArticuloAlCarrito(articuloIngresado);
                // if (carrito.length > 0) {
                //     // alert(muestroCarrito(carrito)); 
                //     // muestroCarritoDOM(carrito);
                // }
                break;
            case 2:
                // quitar articulo
                let articuloQuitado = prompt('Ingregá el Código de Articulo a BORRAR: \n(0) para Cancelar');        
                if (buscoArticuloenCarrito(articuloQuitado)){
                    borrarItemCarrito(articuloQuitado);
                    // if (carrito.length > 0) {
                    //     // muestroCarrito(carrito); 
                    // }
                } else {
                    alert('Articulo no encontrado en el Carrito');
                }
                break;
            case 3:
                //finalizar compra
                    if (carrito.length > 0) {
                        // muestroCarrito(carrito); 
                        alert('Gracias por tu Compra');
                        meVoy = true;
                    } else {
                        alert('No agregaste nada a tu carrito.');
                    }          
                    break;
            default:
                alert('Entrada inválida');
                break;
            }
        } while (meVoy != true);
    }

//alla vamos !!!
dibujarProductos()
tomarPedido();
muestroCarritoDOM(carrito);




// function muestroCarrito(array) {
//     let info = '';
//     array.forEach(elemento => {
//         info += 'Codigo: ' + elemento.codigo + '\nDescripcion: ' + elemento.nombre + '\nPrecio: $' + elemento.precio + '\nCantidad: ' + elemento.cantidad + '\n\n'
//     });
//     if (calculoTotal() > 0) {
//         info = info + 'El Total a Pagar es: $' + calculoTotal(); 
//     }
//     return info;
// }
