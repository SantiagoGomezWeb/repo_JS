// Variables
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
    },
    {
        codigo: '135H010',
        nombre: 'D-20 Mot MAXION',
        precio: 1510,
        foto: './images/135H010.png'
    }

];

let carrito = [];
const DOMitems = document.querySelector('#items');
const DOMcarrito = document.querySelector('#carrito');
const DOMtotal = document.querySelector('#total');
const DOMbotonVaciar = document.querySelector('#boton-vaciar');

// Funciones
function dibujarProductos() {
    productosCatalogo.forEach((info) => {
        // Estructura
        const renglon = document.createElement('div');
        renglon.classList.add('card', 'col-sm-4');
        // Body
        const renglonBody = document.createElement('div');
        renglonBody.classList.add('card-body');
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
        renglonFoto.classList.add('img-flucodigo');
        renglonFoto.setAttribute('src', info.foto);
        // Precio
        const renglonPrecio = document.createElement('p');
        renglonPrecio.classList.add('card-text');
        renglonPrecio.textContent = '$'+`${info.precio}`;
        // Boton 
        const renglonBoton = document.createElement('button');
        renglonBoton.classList.add('btn', 'btn-primary');
        renglonBoton.textContent = 'Añadir al Carrito';

        renglonBoton.setAttribute('marcador', info.codigo);
        renglonBoton.addEventListener('click', agregarArticuloAlCarrito);

        renglonBody.appendChild(renglonFoto);
        renglonBody.appendChild(renglonTitulo);
        renglonBody.appendChild(renglonDescri);
        renglonBody.appendChild(renglonPrecio);
        renglonBody.appendChild(renglonBoton);
        renglon.appendChild(renglonBody);
        DOMitems.appendChild(renglon);
    });
}

function agregarArticuloAlCarrito(evento) {
    carrito.push(evento.target.getAttribute('marcador'))
    dibujarCarrito();
}

function dibujarCarrito() {
    DOMcarrito.textContent = '';

    const carritoSinDuplicados = [...new Set(carrito)];

    carritoSinDuplicados.forEach((item) => {
        const miItem = productosCatalogo.filter((itemBaseDatos) => {
            return itemBaseDatos.codigo === item;
        });

        const numeroUnidadesItem = carrito.reduce((total, itemId) => {
            return itemId === item ? total += 1 : total;
        }, 0);

        const renglon = document.createElement('li');
        renglon.classList.add('list-group-item', 'text-right', 'mx-2');
        // renglon.textContent = `${numeroUnidadesItem} x ${miItem[0].nombre} - ${miItem[0].precio}`;
        renglon.textContent = `${numeroUnidadesItem} x ${miItem[0].nombre} - ` + '$' + `${miItem[0].precio}`;

        const miBoton = document.createElement('button');
        miBoton.classList.add('btn', 'btn-danger', 'mx-5');
        miBoton.textContent = 'X';
        miBoton.style.marginLeft = '1rem';
        miBoton.dataset.item = item;
        miBoton.addEventListener('click', borrarItemCarrito);
        renglon.appendChild(miBoton);
        DOMcarrito.appendChild(renglon);
    });
    DOMtotal.textContent =  '$' + calcularTotal();
}

function borrarItemCarrito(evento) {
    const id = evento.target.dataset.item;
    carrito = carrito.filter((carritoId) => {
        return carritoId !== id;
    });
    dibujarCarrito();
}

function calcularTotal() {
    return carrito.reduce((total, item) => {
        const miItem = productosCatalogo.filter((itemBaseDatos) => {
            return itemBaseDatos.codigo === item;
        });
        return total + miItem[0].precio;
    }, 0).toFixed();
}

function vaciarCarrito() {
    carrito = [];
    dibujarCarrito();
}

// Eventos
DOMbotonVaciar.addEventListener('click', vaciarCarrito);

// Inicio
dibujarProductos();
dibujarCarrito();