const arrayVacio = [];
// const carrito = [];

const familiaSimpson = ['Abe Simpson','Homer Simpson','Marge Simpson','Bart Simpson','Lisa',
'Maggie', 'Huesos','Bola de Nieve'];

// for(let i = 0; i < familiaSimpson.length; i++){
//     console.log(familiaSimpson[i]);
// }

//metodos para AGREGAR
// push agrega al final
// unshift agregar al principio

// console.log(familiaSimpson);
// familiaSimpson.push('Hugo','Sra Bouvier');
// console.log(familiaSimpson);

// familiaSimpson.unshift('Paty');
// console.log(familiaSimpson);

//metodos para ELIMINAR
//para sacar del final
// familiaSimpson.pop();

//para sacar el 1er elemento
// familiaSimpson.shift();

//para eliminar posiciones especificas
// familiaSimpson.splice(3,3);

//Otros Metodos de los Arrays
//join
const imprimible = familiaSimpson.join(' # ');
console.log(imprimible);
console.log(familiaSimpson.join('\n'));


//.toString()
const aCadena = familiaSimpson.toString();

//concat
const perros = ['boby','can'];
const gatos = ['felipe','cat'];

const mascotas = perros.concat(gatos);
console.log(mascotas);

// slice copia 
const otrosPerros = perros.slice(2,4);
// desde la posicion 2 hasta la 4 sin incluir la 4
console.log(otrosPerros);
// slice(0) copia todo el array

console.log('El index del elemento "Lisa" es ' + 
familiaSimpson.indexOf('Lisa'));

//includes devuelve un boleano
const carrito = ['pizza','birra'];
console.log(carrito.includes('pizza'));
console.log(carrito.includes('empanadas'));

//invertir datos de un array
const copiaFamilia = familiaSimpson.slice(0);
console.log(copiaFamilia);

copiaFamilia.reverse();
console.log(copiaFamilia);

const libroHarryPotter = [
    {id:100, titulo:'y la Piedra Filosofal', fecha: 1997}
]





