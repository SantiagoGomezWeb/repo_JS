// Variables
const productosCatalogo = [
    {
        codigo:'135H002', 
        descri: '400/Chevy/Brava Pickup/Opel K-180', 
        precioVenta:4470.59,    
        foto:'https://picsum.photos/id/10/600'
    },
    {
        codigo:'135H003', 
        descri: 'C-10 Pick Up', 
        precioVenta:4470.59,
        foto:'https://picsum.photos/id/20/600'
    },
    {
        codigo:'135H004', 
        descri: 'Chevette 1.6 Junior',
        precioVenta:5013.68,
        foto:'https://picsum.photos/id/30/600', 
        },
    {
        codigo:'135H011', 
        descri: 'D-20 Mot MAXION', 
        precioVenta:6323.37,
        foto:'https://picsum.photos/id/30/600'
    },
];

let carrito = [];
const DOMitems = document.querySelector('#items');
const DOMcarrito = document.querySelector('#carrito');
const DOMtotal = document.querySelector('#total');
const DOMbotonVaciar = document.querySelector('#boton-vaciar');

//Funciones
function mostrarProductos() {
    productosCatalogo.forEach((info) => {
        // Codigo
        const miNodoCodigo = document.createElement('h3');
        miNodoCodigo.classList.add('card-title');
        miNodoCodigo.textContent = info.codigo;
        // Descripcion
        const miNodoDescripcion = document.createElement('h4');
        miNodoDescripcion.classList.add('card-text');
        miNodoDescripcion.textContent = info.descri;
        // Imagen
        const miNodoImagen = document.createElement('img');
        miNodoImagen.classList.add('img-fluid');
        miNodoImagen.setAttribute('src', info.foto);
        // Precio
        const miNodoPrecio = document.createElement('p');
        miNodoPrecio.classList.add('card-text');
        miNodoPrecio.textContent = `${info.precioVenta}`;
        // Boton 
        const miNodoBoton = document.createElement('button');
        miNodoBoton.classList.add('btn', 'btn-primary');
        miNodoBoton.textContent = '+';
        miNodoBoton.setAttribute('marcador', info.codigo);
        miNodoBoton.addEventListener('click', agregarProductoAlCarrito);
        // Insertamos
        miNodoCardBody.appendChild(miNodoCodigo);
        miNodoCardBody.appendChild(miNodoDescripcion);
        miNodoCardBody.appendChild(miNodoImagen);
        miNodoCardBody.appendChild(miNodoPrecio);
        miNodoCardBody.appendChild(miNodoBoton);
        miNodo.appendChild(miNodoCardBody);
        DOMitems.appendChild(miNodo);
    });
}

function mostrarCarrito() {
    // Vaciamos todo el html
    DOMcarrito.textContent = '';    
    const carritoSinDuplicados = [...new Set(carrito)];
    // Generamos los Nodos a partir de carrito
    carritoSinDuplicados.forEach((item) => {
        const miItem = productosCatalogo.filter((itemBaseDatos) => {
            return itemBaseDatos.id === item;
        });
        const numeroUnidadesItem = carrito.reduce((total, itemId) => {
            return itemId === item ? total += 1 : total;
        }, 0);
        const miNodo = document.createElement('li');
        miNodo.classList.add('list-group-item', 'text-right', 'mx-2');
        miNodo.textContent = `${numeroUnidadesItem} x ${miItem[0].descri} - ${miItem[0].precioVenta}`;
        const miBoton = document.createElement('button');
        miBoton.classList.add('btn', 'btn-danger', 'mx-5');
        miBoton.textContent = 'X';
        miBoton.style.marginLeft = '1rem';
        miBoton.dataset.item = item;
        miBoton.addEventListener('click', borrarItemCarrito);
        miNodo.appendChild(miBoton);
        // DOMcarrito.appendChild(miNodo);
    });
    // Renderizamos el precio total en el HTML
    // DOMtotal.textContent = calcularTotal();
}

function agregarProductoAlCarrito(evento) {
    carrito.push(evento.target.getAttribute('marcador'));
    // Actualizamos el carrito 
    mostrarCarrito();    
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

// Eventos
DOMbotonVaciar.addEventListener('click', vaciarCarrito);

// Inicio
mostrarProductos();
mostrarCarrito();