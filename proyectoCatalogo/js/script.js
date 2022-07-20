// Variables
const productosCatalogo = [
    {
        id:'135H002', 
        descri: 'Opel K-180', 
        precioVenta:4470.59,    
        foto:'./images/135H002.png'
    },
    {
        id:'135H003', 
        descri: 'C 10 Pick Up', 
        precioVenta:4470.59,
        foto:'./images/135H003.png'
    },
    {
        id:'135H004', 
        descri: 'Chevette 1.6 Junior',
        precioVenta:5013.68,
        foto:'./images/135H004.png'
        },
    {
        id:'135H011', 
        descri: 'D-20 Mot MAXION', 
        precioVenta:6323.37,
        foto:'./images/135H011.png'
    },
];

let carrito = [];
const DOMitems = document.querySelector('#items');
const DOMcarrito = document.querySelector('#carrito');
const DOMtotal = document.querySelector('#total');
const DOMbotonVaciar = document.querySelector('#boton-vaciar');

// Funciones
function mostrarArticulos() {
    productosCatalogo.forEach((info) => {
        // DIV
        const elemento = document.createElement('div');
        elemento.classList.add('card', 'col-sm-4');
        // Body
        const elementoCardBody = document.createElement('div');
        elementoCardBody.classList.add('card-body');
        // Titulo
        const elementoTitulo = document.createElement('h4');
        elementoTitulo.classList.add('card-title');
        elementoTitulo.textContent = info.descri;
        // Foto
        const elementoFoto = document.createElement('img');
        elementoFoto.classList.add('img-fluid');
        elementoFoto.setAttribute('src', info.foto);
        // Precio Venta
        const elementoPrecioVenta = document.createElement('p');
        elementoPrecioVenta.classList.add('card-text');
        elementoPrecioVenta.textContent = `${info.precioVenta}`;
        // Boton 
        const elementoBoton = document.createElement('button');
        elementoBoton.classList.add('btn', 'btn-primary');
        elementoBoton.textContent = '+';
        elementoBoton.setAttribute('marcador', info.id);
        elementoBoton.addEventListener('click', agregarArticuloAlCarrito);

        elementoCardBody.appendChild(elementoFoto);
        elementoCardBody.appendChild(elementoTitulo);
        elementoCardBody.appendChild(elementoPrecioVenta);
        elementoCardBody.appendChild(elementoBoton);

        elemento.appendChild(elementoCardBody);
        DOMitems.appendChild(elemento);
    });
}

function agregarArticuloAlCarrito(evento) {
    carrito.push(evento.target.getAttribute('marcador'))
    mostrarCarrito();
}

function mostrarCarrito() {
    DOMcarrito.textContent = '';

    const carritoSinDuplicados = [...new Set(carrito)];

    carritoSinDuplicados.forEach((item) => {
        const miItem = productosCatalogo.filter((itemBaseDatos) => {
            return itemBaseDatos.id === parseInt(item);
        });
        
        
        const numeroUnidadesItem = carrito.reduce((total, itemId) => {
            return itemId === item ? total += 1 : total;
        }, 0);

        
        const elemento = document.createElement('li');
        elemento.classList.add('list-group-item', 'text-right', 'mx-2');
        elemento.textContent = `${numeroUnidadesItem} x ${miItem[0].descri} - ${miItem[0].precioVenta}`;
        
        
        const miBoton = document.createElement('button');
        miBoton.classList.add('btn', 'btn-danger', 'mx-5');
        miBoton.textContent = 'X';
        miBoton.style.marginLeft = '1rem';
        miBoton.dataset.item = item;
        miBoton.addEventListener('click', borrarItemCarrito);
        
        elemento.appendChild(miBoton);
        DOMcarrito.appendChild(elemento);
    });
    // Muestro el precio total en el HTML
    DOMtotal.textContent = calcularTotal();
}

function borrarItemCarrito(evento) {
    const id = evento.target.dataset.item;
    carrito = carrito.filter((carritoId) => {
        return carritoId !== id;
    });
    mostrarCarrito();
}

function calcularTotal() {
    return carrito.reduce((total, item) => {
        const miItem = productosCatalogo.filter((itemBaseDatos) => {
            return itemBaseDatos.id === parseInt(item);
        });
        return total + miItem[0].precio;
    }, 0).toFixed(2);
}

function vaciarCarrito() {
    carrito = [];
    mostrarCarrito();
}

DOMbotonVaciar.addEventListener('click', vaciarCarrito);

// Inicio
mostrarArticulos();
mostrarCarrito();