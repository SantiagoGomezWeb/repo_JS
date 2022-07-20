// function saludar(){
//     alert('Buen dia');
// }

// saludar();

// function saludarConNombre(nombre, momento){
//     alert('Buenas ' + momento + ', ' + nombre);
// }

// // saludarConNombre('Carmen');


// let nombreUsuario = prompt('Ingresa tu nombre para q te saludemos:');
// let momentoDelDia = prompt('Ingresa el momento del dia:');
// saludarConNombre(nombreUsuario,momentoDelDia);

// function dividir(numeroA, numeroB){
//     let resultado = numeroA/numeroB;
//     return resultado;
// }

// alert(dividir(50,5));

// // fnciones anonimas
// const division = function (numeraA, numeroB) { return numeraA/numeroB};
// alert(division(100,10));

// // fnciones flecha
// const suma = (numeroA, numeroB) => {return numeroA + numeroB};
// const multiplicacion = (numeroA, numeroB) => numeroA * numeroB;

// // si la funcion recibe un solo parametro puedo precisdir de los parentesis
// const texto = x => 'El mensaje es ' + x

// console.log(texto('mocazo'));


// CLASE 5
// OBJETOS



// let nombre = 'Homero';
// let edad = 39;
// let peso = 69;
// let calle = 'Av Siempreviva 742';

const personaje1 = {
    nombre: 'Homero',
    edad: 39,
    peso: 69,
    calle: 'Av Siempreviva 742'
}

const personaje2 = {
    nombre: 'Marge',
    apellido: 'Bouvier',
    edad: 38,
    esSoltera:false,
    hijos:{
        primero:'Bart',
        segundo:'Lisa',
        tercero:'Maggie'
    }
}

// alert('El peso del Personaje es ' + personaje1.peso);
// alert('El nombre del Personaje es ' + personaje1['nombre']);
// // alert('El nombre del 1er hijo de ' +  personaje2.nombre + ' es ' +personaje2['hijos']['primero'];

// personaje1.peso = 150;

// producto1.cantidad+=1;

// CARACTERISTICAS DE OBJETOS
// function Personaje(nombre,apellido,edad){
//     this.nombre = nombre;
//     this.apellido = apellido;
//     this.edad = edad;
//     this.respira = true;
// }

// const personaje3 = new Personaje('Bart','Simpson',10);
// const personaje4 = new Personaje('Lisa','Simpson',10);
// const personaje5 = new Personaje('Maggie','Simpson',2);
// const personaje6 = new Personaje('Juan','Simpson',undefined);

// console.log(personaje3);
// console.log(personaje4);
// console.log(personaje5);

// let personajePersonaje = prompt('Ingresa el nombre de tu personaje: ');
// let apellidopersonaje = prompt('Ingresa el apellido de tu personaje: ');
// let edadPersonaje = prompt('Ingresa la edad de tu personaje: ');

// const personajeUsuario = new Personaje(nombrePersonaje, apellidoPersonaje, edadPersonaje);

// METODOS (COMPORTAMIENTOS) DE OBJETOS
function Personaje(nombre,apellido,edad){
    this.nombre = nombre;
    this.apellido = apellido;
    this.edad = edad;
    this.respira = true;
    this.hablar = function(mensaje){
        alert(mensaje)
    }
}

const personaje3 = new Personaje('Bart','Simpson',10);
const personaje4 = new Personaje('Lisa','Simpson',10);
const personaje5 = new Personaje('Maggie','Simpson',2);
const personaje6 = new Personaje('Juan','Simpson',undefined);


// personaje3.hablar('Ay, Caramba');

// // OPERADOR IN   FOR IN
// console.log('apellido' in personaje3);    //true
// console.log('altura' in personaje3);    //false

//FOR IN recorre el objeto y devuelve todaas las propiedades
for (const propiedad in personaje4) {
    console.log(personaje4.[propiedad]);
}

//CLASES
