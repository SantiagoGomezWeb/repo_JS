// Variables
const productosCatalogo = [
    {
        codigo: '135H002',
        nombre: 'Opel K-180',
        precio: 1890,
        foto: './images/135H002.png'
    },
    {
        codigo: '136H003',
        nombre: 'C-10 Pick Up',
        precio: 89491,
        foto: './images/135H003.png'
    },
    {
        codigo: '137H004',
        nombre: 'Chevette 1.6 Junior',
        precio: 2251,
        foto: './images/135H004.png'
    }
];

let carrito = [];
console.log(carrito);

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
            alert('Entrada inválida');
            break;
    };
}
    
function agregarArticuloAlCarrito(articuloIngresado) {
    if (!buscoArticuloenCarrito(articuloIngresado)){
        // alert('Articulo no encontrado en el Carrito');
        pusheoArticulo(articuloIngresado, 1);
    } else {
        // alert('Articulo encontrado en el Carrito');
        // le sumo 1 a la cantidad
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

function muestroCarrito(array) {
    let info = '';
    array.forEach(elemento => {
        info += 'Codigo: ' + elemento.codigo + '\nDescripcion: ' + elemento.nombre + '\nPrecio: $' + elemento.precio + '\nCantidad: ' + elemento.cantidad + '\n\n'
    });
    if (calculoTotal() > 0) {
        info = info + 'El Total a Pagar es: $' + calculoTotal(); 
    }
    return info;
}

function calculoTotal() {
    const precioFinal = carrito.reduce((total,item)=>{return total+=(item.precio)*(item.cantidad)},0);
        return precioFinal;
    }

//interactuo con el usuario
let meVoy = false;
do{
    let entrada =  parseInt(prompt('Que queres hacer?\n1.-Agregar Articulo al Carrito\n2.-Quitar un Articulo\n3.-Ir a Pagar\n0.- Cancelar Compra'));
    switch (entrada) {
        case 0:
            //me voy
            alert('Compra Cancelada\nVolvé cuando quieras !!!');
            carrito = [];
            console.log(carrito);
            meVoy = true;
            break;
        case 1:
            // agregar articulo
            let articuloIngresado = prompt('Ingregá el Código de Articulo a AGREGAR: \n(0) para Cancelar');        
            agregarArticuloAlCarrito(articuloIngresado);
            if (carrito.length > 0) {
                alert(muestroCarrito(carrito)); 
            }
            break;
        case 2:
            // quitar articulo
            let articuloQuitado = prompt('Ingregá el Código de Articulo a BORRAR: \n(0) para Cancelar');        
            if (buscoArticuloenCarrito(articuloQuitado)){
                borrarItemCarrito(articuloQuitado);
                if (carrito.length > 0) {
                    alert(muestroCarrito(carrito)); 
                }
            } else {
                alert('Articulo no encontrado en el Carrito');
            }
            break;
        case 3:
            //finalizar compra
                if (carrito.length > 0) {
                    alert(muestroCarrito(carrito)); 
                    alert('Gracias por tu Compra');
                } else {
                    alert('No agregaste nada a tu carrito.\nVolvé cuando quieras!');
                }          
                meVoy = true;
                break;
        default:
            alert('Entrada inválida');
            break;
        }
    } while (meVoy != true);


