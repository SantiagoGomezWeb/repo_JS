// Variables
// Creamos Array
const productosCatalogo = [
    {
        codigo:'135H002', 
        descri: '400/Chevy/Brava Pickup/Opel K-180', 
        precioVenta:4470.59,    
        foto:'https://picsum.photos/id/20/600'
    },
    {
        codigo:'135H003', 
        descri: 'C-10 Pick Up', 
        precioVenta:4470.59,
        foto:'https://picsum.photos/id/30/600'
    },
    {
        codigo:'135H004', 
        descri: 'Chevette 1.6 Junior',
        precioVenta:5013.68,
        foto:'https://picsum.photos/id/40/600', 
        },
    {
        codigo:'135H011', 
        descri: 'D-20 Mot MAXION', 
        precioVenta:6323.37,
        foto:'https://picsum.photos/id/50/600'
    },
];

for (const producto of productosCatalogo){
    console.log(producto.codigo);
    console.log(producto.descri);
    console.log(producto.precioVenta);
}


productosCatalogo.unshift(
    {
        codigo:'135H001', 
        descri: 'Carburador R4', 
        precioVenta:2470,    
        foto:'https://picsum.photos/id/10/600'
    }
)

productosCatalogo.push(
    {
        codigo:'135H012', 
        descri: 'Carburador R12', 
        precioVenta:470,    
        foto:'https://picsum.photos/id/60/600'
    }
)

productosCatalogo.splice(4,0,
    {
        codigo:'135H010', 
        descri: 'Limpiaparabrizas doble', 
        precioVenta:1257.80,    
        foto:'https://picsum.photos/id/55/600'
    }
)

for (const producto of productosCatalogo){
    console.log(producto.codigo);
    console.log(producto.descri);
    console.log(producto.precioVenta);
}

//busco un articulo por codigo
let articulo = productosCatalogo.find(articulo => articulo.codigo === "135H004");
console.log (articulo);

//busco un articulo por codigo o descripcion
let articuloCriterios = productosCatalogo.find(articuloCriterios => articuloCriterios.codigo === "135L004" || articuloCriterios.descri === "Limpiaparabrizas doble");
console.log (articuloCriterios);

//busco todos los articulos q valgan precioVenta:4470.59
let articuloOferta = productosCatalogo.filter(articuloOferta => articuloOferta.precioVenta === 4470.59);
console.log (articuloOferta);


// //agrego un elemento al final
// .push

// //agrego un elemento al principio
// .unshift

// //quito el ultimo elemento 
// .pop

// //quito el 1er elemento
// .shift

// // elimino varios elementos
// // lugar y cantidad de elementos a eliminar
// .splice

// //concateno con otro array
// .concat

// //copio el array
// .splice

// //busco un elemento dentro del array
// .indexOf

// //existe este articulo dentro del array?
// .includes











