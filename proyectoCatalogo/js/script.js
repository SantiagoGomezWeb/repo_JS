// Variables
let carrito = [];
let productosCatalogo= [];

const DOMitems = document.querySelector('#items'),
      DOMcarrito = document.querySelector('#carrito'),
      DOMtotal = document.querySelector('#total'),
      DOMtotalUnidades = document.querySelector('#totalUnidades'),
      DOMbotonVaciar = document.querySelector('#boton-vaciar');

const selectPro = document.querySelector('#busPro'),
    buscaProducto = document.querySelector('.inputPro'),
    selectMar = document.querySelector('#busMar'),
    buscaMarca = document.querySelector('.inputMar'),
    DOMbtnEnviar = document.querySelector('#buscar'),    
    rubros = ['Bomba de Agua', 'Embrague', 'Correa', 'Cinta de Freno'];
    // marcas = ['Fiat', 'Chevrolet', 'Peugeot', 'Renault'];

    // uso la libreria luxon para calcular el costo de envio
const DateTime = luxon.DateTime;
const DOMbtnCalcular = document.getElementById('calcular');

window.onload=()=>{
    let fechas = document.querySelectorAll('input[type="date"]');
    let fecIni = DateTime.now().toFormat('yyyy-MM-dd');
    let fecFin = DateTime.now().plus({months:1}).toFormat('yyyy-MM-dd');

    fechas.forEach(element=>{
        element.setAttribute("min", fecIni);
        element.setAttribute("max", fecFin);
        element.setAttribute("value", fecIni);
    })
}



document.addEventListener("DOMContentLoaded", () => {
    buscarRubro();
    if (localStorage.getItem('carrito')) {
        carrito = JSON.parse(localStorage.getItem('carrito'));
        dibujarCarrito();
    }
  });

  async function buscarRubro() {
    try{
        const response = await fetch('./js/datos.json');
        const data = await response.json();
        productosCatalogo = data;
        dibujarProductosBusqueda(filtrarRubro(data));
        dibujarCarrito();
    } catch (e){
        alert('mocazo');
    }
}


function filtrarRubro(array) {
    let rubro = buscaProducto.value;
    if (!rubro || rubro == 'Todos' || rubro == 'busPro') {
            return array;
        } else {
            return array.filter((item) => item.rubroArticulo == rubro);
        }
} 


function filtrarMarca(array) {
    let marca = buscaMarca.value;
    if (!marca || marca == 'Todos' || marca == 'busMar') {
            return array;
        } else {
            return array.filter((item) => item.marca == marca);
        }
} 


function cargarSelect(array, select) {
    array.forEach(element => {
        let option = `<option>${element}</option>`
        select.innerHTML += option;
    })
}


function dibujarProductosBusqueda(array) {
    DOMitems.innerHTML = ''
    array.forEach((info) => {
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

        // // Marca
        // const renglonMarca = document.createElement('p');
        // renglonMarca.classList.add('card-text');
        // renglonMarca.textContent = 'Rubro: '+`${info.marca}`;

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
        // tarjeta.appendChild(renglonMarca);
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

function calcularTotalUnidades() {
    return carrito.reduce((total, item) => {
        const renglonCarrito = productosCatalogo.filter((productosCatalogo) => {
            return productosCatalogo.codigo === item;
        });
        totalUnidades = totalUnidades + 1;
        return totalUnidades 
    }, 0).toFixed();
}


function vaciarCarrito() {
    Swal.fire({
        title: 'Vaciar Carrito',
        text: '¿Está seguro de Vaciar el carrito?',
        icon: 'warning',
        showCancelBukimonotton: true,
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
    DOMtotal.textContent =  '$' + calcularTotal();
    DOMtotalUnidades.textContent = 'Cantidad Unidades: ' + carrito.length;
}

function calcularDias(fechaIni,fechaFin){
    let total =fechaFin.diff(fechaIni);
    return total.as('days');
}

function calcularPrecioTotal(cantDias, precio) {
    return cantDias * precio * carrito.length;
}

// API para mandar mail formspree
let DOMform = document.getElementById("formMail");
            
async function handleSubmit(event) {
    event.preventDefault();
    let mensaje = document.getElementById("formMail-mensaje");
    let data = new FormData(event.target);
    fetch(event.target.action, {
    method: DOMform.method,
    body: data,
    headers: {
        'Accept': 'application/json'
    }
    }).then(response => {
    if (response.ok) {
        mensaje.innerHTML = "Gracias por tu mensaje!";
        DOMform.reset()
    } else {
        response.json().then(data => {
        if (Object.hasOwn(data, 'errors')) {
            mensaje.innerHTML = data["errors"].map(error => error["message"]).join(", ")
        } else {
            mensaje.innerHTML = "Oops! Algo salió mal en el envio del mail"
        }
        })
    }
    }).catch(error => {
    mensaje.innerHTML = "Oops! Algo salió mal en el envio del mail"
    });
}
DOMform.addEventListener("submit", handleSubmit)



// Eventos
DOMbotonVaciar.addEventListener('click', vaciarCarrito);
DOMbtnCalcular.addEventListener('click',()=>{
    let fechaInicio = DateTime.fromISO(DateTime.now().toFormat('yyyy-MM-dd'));
    let fechaFin = DateTime.fromISO(document.getElementById('fechaEnvio').value);
    let cantDias = calcularDias(fechaInicio,fechaFin);
    let precioTotal = calcularPrecioTotal(cantDias, 500);
        let textoMensaje = '';
    // uso la libreria sweetalert para mostrar mensajitos facheros
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
})

DOMbtnEnviar.addEventListener('click', () => {
    buscarRubro();
})

// Inicio
cargarSelect(rubros, selectPro);
// cargarSelect(marcas, selectMar);
buscarRubro();
dibujarCarrito();

