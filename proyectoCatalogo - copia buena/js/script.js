// Variables
let carrito = [];
const DOMitems = document.querySelector('#items'),
      DOMcarrito = document.querySelector('#carrito'),
      DOMtotal = document.querySelector('#total'),
      DOMbotonVaciar = document.querySelector('#boton-vaciar');
// let productosCatalogo;

const contenedor = document.querySelector('#contenedorArticulos'),
    selectPro = document.querySelector('#busPro'),
    buscaProducto = document.querySelector('.inputPro'),
    btnEnviar = document.querySelector('#buscar'),    
    rubros = ['Correa', 'Cinta de Freno', 'Bomba de Agua', 'Embrague'];

    
function cargarSelect(array, select) {
    array.forEach(element => {
        let option = `<option>${element}</option>`
        select.innerHTML += option;
    })
}

cargarSelect(rubros, selectPro);


document.addEventListener("DOMContentLoaded", () => {
    if (localStorage.getItem('carrito')) {
        carrito = JSON.parse(localStorage.getItem('carrito'));
        dibujarCarrito();
    }
  });


// Funciones


function dibujarProductosBusqueda(productosCatalogo) {
    DOMitems.innerHTML = ''
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
        renglonFoto.classList.add('img');
        renglonFoto.setAttribute('src', info.foto);

        // Rubro
        const renglonRubro = document.createElement('p');
        renglonRubro.classList.add('card-text');
        renglonRubro.textContent = 'Rubro: '+`${info.rubroArticulo}`;

        // Precio
        const renglonPrecio = document.createElement('p');
        renglonPrecio.classList.add('card-text');
        renglonPrecio.textContent = '$'+`${info.precio}`;

        // Boton 
        const BotonCard = document.createElement('button');
        BotonCard.classList.add('btn', 'btn-primary');
        BotonCard.textContent = 'Comprar';

        BotonCard.setAttribute('identificador', info.codigo);
        BotonCard.addEventListener('click', agregarArticuloAlCarrito);


        tarjeta.appendChild(renglonFoto);
        tarjeta.appendChild(renglonTitulo);
        tarjeta.appendChild(renglonDescri);
        tarjeta.appendChild(renglonRubro);
        tarjeta.appendChild(renglonPrecio);
        tarjeta.appendChild(BotonCard);

        renglon.appendChild(tarjeta);
        //escribo en el DOM
        DOMitems.appendChild(renglon);
    });
}


function agregarArticuloAlCarrito(evento) {
    carrito.push(evento.target.getAttribute('identificador'));
    Toastify({
        text: `Producto agregado.\nAhora tenés ${carrito.length} artículos en tu carrito`,
        duration: 2500,
        style: {
            color: 'white',
            width: '20vw',
            height: 80
        }
        }
    ).showToast();
    dibujarCarrito();

}


function restarArticuloAlCarrito(evento) {
    carrito.splice(carrito.indexOf(evento.target.getAttribute('identificador')), 1) ;
    Toastify({
        text: `Producto restado.\nAhora tenés ${carrito.length} artículos en tu carrito`,
        duration: 2500,
        style: {
            color: 'white',
            width: '20vw',
            height: 80
        }
        }
    ).showToast();    
    dibujarCarrito();
}


function borrarItemCarrito(evento) {
    Swal.fire({
        title: 'Eliminar producto',
        text: '¿Está seguro de eliminar el producto del carrito?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, seguro',
        cancelButtonText: 'No, no quiero',
        backdrop: '#66f4ae22'
    }).then((result)=>{
    if(result.isConfirmed){
        const id = evento.target.dataset.item;
        carrito = carrito.filter((carritoId) => {
            return carritoId !== id;
        });
        dibujarCarrito();
        Swal.fire('Borrado', 'El producto ha sido eliminado', 'success')
    }
    }) 
}

function calcularTotal() {
    return carrito.reduce((total, item) => {
        const renglonCarrito = productosCatalogo.filter((productosCatalogo) => {
            return productosCatalogo.codigo === item;
        });
        total = total + renglonCarrito[0].precio;
        return total 
    }, 0).toFixed();
}

function vaciarCarrito() {
    Swal.fire({
        title: 'Vaciar Carrito',
        text: '¿Está seguro de Vaciar el carrito?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, seguro',
        cancelButtonText: 'No, no quiero',
        backdrop: '#66f4aebb'
    }).then((result)=>{
    if(result.isConfirmed){
        carrito = [];
        localStorage.removeItem('carrito');
        dibujarCarrito();        
        Swal.fire('Operación Exitosa!', 'El carrito ahora está vacio', 'success')
    }
    })     
}

function dibujarCarrito() {
    DOMcarrito.textContent = '';
    console.log(carrito);
    //desafio clase 12:
    const carritoFinal = [...new Set(carrito)];

    carritoFinal.forEach((item) => {
        const renglonCarrito = productosCatalogo.filter((productosCatalogo) => {
            return productosCatalogo.codigo === item;
        });

        const numeroUnidadesItem = carrito.reduce((total, itemId) => {
            //desafio clase 12
            return itemId === item ? total += 1 : total;
        }, 0);

        const renglon = document.createElement('li');
        renglon.classList.add('list-group-item','text-right');
        
        renglon.textContent = `${numeroUnidadesItem} x ${renglonCarrito[0].nombre} - ` + '$' + `${renglonCarrito[0].precio}`;

        const botonSumar = document.createElement('button');
        botonSumar.classList.add('btn', 'btn-success');
        botonSumar.textContent = '+';
        botonSumar.style.marginLeft = '31px';
        botonSumar.dataset.item = item;
        botonSumar.setAttribute('identificador', item);
        botonSumar.addEventListener('click', agregarArticuloAlCarrito);        
        renglon.appendChild(botonSumar);

        const botonRestar = document.createElement('button');
        botonRestar.classList.add('btn', 'btn-warning');
        botonRestar.textContent = '-';
        botonRestar.style.marginLeft = '30px';
        botonRestar.dataset.item = item;
        botonRestar.setAttribute('identificador', item);
        botonRestar.addEventListener('click', restarArticuloAlCarrito);
        renglon.appendChild(botonRestar);

        const botonBorrar = document.createElement('button');
        botonBorrar.classList.add('btn', 'btn-danger');
        botonBorrar.textContent = 'Borrar Renglon';
        botonBorrar.style.marginLeft = '50px';
        botonBorrar.dataset.item = item;
        botonBorrar.addEventListener('click', borrarItemCarrito);
        renglon.appendChild(botonBorrar);        

        DOMcarrito.appendChild(renglon);

        localStorage.setItem('carrito', JSON.stringify(carrito));    
    });
    DOMtotal.textContent = '$' + calcularTotal();
    // 'Cantidad de Productos: ' + carrito.length + '                                 ' +  ' Importe Total $' + calcularTotal();
}

const DateTime = luxon.DateTime;
const btnCalcular = document.getElementById('calcular');

window.onload=()=>{
    let fechas =document.querySelectorAll('input[type="date"]');
    let fecIni=DateTime.now().toFormat('yyyy-MM-dd');
    let fecFin = DateTime.now().plus({months:1}).toFormat('yyyy-MM-dd');

    fechas.forEach(element=>{
        element.setAttribute("min", fecIni);
        element.setAttribute("max", fecFin);
    })
}


function calcularDias(fechaIni,fechaFin){
    let total =fechaFin.diff(fechaIni);
    return total.as('days');
}

function calcularPrecioTotal(cantDias, precio) {
    return cantDias * precio * carrito.length;
}


btnCalcular.addEventListener('click',()=>{
    let fechaInicio = DateTime.fromISO(DateTime.now().toFormat('yyyy-MM-dd'));
    let fechaFin = DateTime.fromISO(document.getElementById('fechaEnvio').value);
    let cantDias = calcularDias(fechaInicio,fechaFin);
    let precioTotal = calcularPrecioTotal(cantDias, 500);
    
   
    
    let textoMensaje = '';
    if (carrito.length > 0) {
        cantDias > 0 ? textoMensaje = `Su Pedido será enviado dentro de ${cantDias} días y tendrá un costo de $${precioTotal}` : textoMensaje = `Su Pedido será enviado HOY sin COSTO`;            
        Swal.fire({
            text: textoMensaje,
            icon: 'info',
            iconColor: 'rgb(139, 183, 197)',
            confirmButtonText: 'Aceptar',
            position: 'top-center',
            backdrop: '#445566aa'
        })        
    }else{
        Swal.fire({
            text: 'Su Carrito está vacio',
            icon: 'info',
            iconColor: 'rgb(139, 183, 197)',
            confirmButtonText: 'Aceptar',
            position: 'top-center',
            backdrop: '#445566aa'
        })
    }
});

function filtrarRubro(array) {
    let rubro = buscaProducto.value;
    if (!rubro || rubro == 'Todos' || rubro == 'busPro') {
        return array;
    } else {
        return array.filter((item) => item.rubroArticulo == rubro);
    }
}    

async function buscarRubro() {
    try{
        const response = await fetch('./js/datos.json');
        const data = await response.json();
        dibujarProductosBusqueda(filtrarRubro(data));
    } catch (e){
        alert('mocazo');
    }
}

btnEnviar.addEventListener('click', () => {
    buscarRubro();
})


// function crearHTML(array) {
//     contenedor.innerHTML = '';
//     array.forEach((producto) => {
//         const tarjeta = `
//             <div class="col">
//                 <div class="card h-100">
//                     <img src="${producto.foto}" class="card-img-top" alt="${producto.codigo}">
//                     <div class="card-body">
//                         <h5 class="card-title">${producto.codigo}</h5>
//                         <p class="card-text">${producto.nombre}</p>
//                         <p class="card-text">Marca: ${producto.marca}</p>
//                         <p class="card-text">Rubro: ${producto.rubroArticulo}</p>
//                         <p class="card-text">Precio: $${producto.precio}</p>
//                     </div>
//                 </div>
//             </div>`;
//         contenedor.innerHTML += tarjeta;
//     })
// }

// function dibujarProductos() {
//     productosCatalogo.forEach((info) => {
//         // div para la card
//         const renglon = document.createElement('div');
//         renglon.classList.add('card');

//         // cuerpo
//         const tarjeta = document.createElement('div');
//         tarjeta.classList.add('card-body');

//         // Titulo - Codigo
//         const renglonTitulo = document.createElement('h4');
//         renglonTitulo.classList.add('card-title');
//         renglonTitulo.textContent = info.codigo;

//         // descri del Articulo
//         const renglonDescri = document.createElement('h5');
//         renglonDescri.classList.add('card-subtitle');
//         renglonDescri.textContent = info.nombre;

//         // foto
//         const renglonFoto = document.createElement('img');
//         renglonFoto.classList.add('img');
//         renglonFoto.setAttribute('src', info.foto);

//         // Precio
//         const renglonPrecio = document.createElement('p');
//         renglonPrecio.classList.add('card-text');
//         renglonPrecio.textContent = '$'+`${info.precio}`;

//         // Boton 
//         const BotonCard = document.createElement('button');
//         BotonCard.classList.add('btn', 'btn-primary');
//         BotonCard.textContent = 'Comprar';

//         BotonCard.setAttribute('identificador', info.codigo);
//         BotonCard.addEventListener('click', agregarArticuloAlCarrito);


//         tarjeta.appendChild(renglonFoto);
//         tarjeta.appendChild(renglonTitulo);
//         tarjeta.appendChild(renglonDescri);
//         tarjeta.appendChild(renglonPrecio);
//         tarjeta.appendChild(BotonCard);

//         renglon.appendChild(tarjeta);
//         //escribo en el DOM
//         DOMitems.appendChild(renglon);
//     });
// }


// Eventos
DOMbotonVaciar.addEventListener('click', vaciarCarrito);

// Inicio
dibujarProductos();
// buscarRubro();
dibujarCarrito();