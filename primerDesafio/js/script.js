// 1.- Pido Login (con máximop dem 3 intentos)
// 2.- Pregunto como quiere pagar un Saldo:
    // en Efectivo o en con Tarjeta    
//     dependiendo de la cantidad de cuotas tiene diferente recargo
// 3.- se va descontando y mostrando el  del saldo

let passGuardada = 'qwe';
let sigoProceso = false;
let cancelaIngreso = false;
let cancelaLogin = false;
let leyendaIntentos = '';

let importeTotal = 10000;
let saldo = 10000;

let totalEfectivo = 0;
let totalTarjeta = 0;
let leyendaCuotas = '';
let leyendaFinal = '';

const mensajero = mensajeSalida => alert(mensajeSalida);
const hoy = new Date();
let coefCuotas = 0;
let coef3Cuotas = 0;
let coef6Cuotas = 0;

function recuperoCoeficiente(fechaParametro, cantidadCuotas){
    let fechaCorte = new Date('2022-07-01');
    let fechaIngreso = new Date(fechaParametro);
    if (fechaIngreso > fechaCorte){
        if (cantidadCuotas == 3) {
            return coefCuotas = 1.15;
        }else if (cantidadCuotas == 6){
            return coefCuotas = 1.30;
        }else{
            return coefCuotas = 1;
        }
    }
}

coef3Cuotas = recuperoCoeficiente(hoy,3);
coef6Cuotas = recuperoCoeficiente(hoy,6);


function procesoCuotas(importe, cuotas){
    saldo -= importe;
    totalTarjeta += importe;
    if (cuotas == 1) {
        leyendaCuotas = leyendaCuotas + '\nElegiste pagar: $' + importe + ' en ' + cuotas + ' cuota';
    } else if (cuotas == 3) {
        leyendaCuotas = leyendaCuotas + '\nElegiste pagar: $' + importe + ' en ' + cuotas + ' cuotas\nEn tu próximo Resumen te va a aparecer un importe de $'+ (importe*coef3Cuotas);        
    } else if (cuotas == 6) {
        leyendaCuotas = leyendaCuotas + '\nElegiste pagar: $' + importe + ' en ' + cuotas + ' cuotas\nEn tu próximo Resumen te va a aparecer un importe de $'+ (importe*coef6Cuotas);        
    }
}


for(let i=0; i<3; i++){
    if((3-i)>1){
        leyendaIntentos = ' Intentos';
    }else{
        leyendaIntentos = ' Intento';
    }
    let passUsuario = prompt('Ingresá tu contraseña.\n(0 para CANCELAR) \nTenés ' + (3-i) + leyendaIntentos);
    if(passUsuario==0){
        cancelaLogin = true;
        break;
    }else{
        if(passUsuario===passGuardada){
            mensajero('Ingreso Exitoso');
            sigoProceso = true;
            break;
        } else {
            mensajero('Contraseña Inválida !!!');
        }
    }
}

if (sigoProceso == false){
    if(cancelaLogin == true){
        mensajero('Hasta luego !');
    }else{
        mensajero('Tu cuenta será bloqueada por cuestiones de Seguridad\nHasta luego !');
    }
}else{
    do{
        let formaDePago =  parseInt(prompt('Tu Saldo es de $' + saldo + '\n\nCómo vas a pagar? \n1.-Efectivo \n2.-Tarjeta de Crédito \n3.- Salir'));
        switch (formaDePago) {
            case 1:
                let importeEfectivo = parseInt(prompt('Saldo: $' + saldo +'\nIngresá el importe q vas a pagar en EFECTIVO: '));
                if((importeEfectivo) < 0 || (importeEfectivo) > saldo){
                    mensajero('Importe mal ingresado');
                    break;
                } else {
                    saldo -= importeEfectivo;
                    totalEfectivo += importeEfectivo;
                    break;
                }
            case 2:
                let importeTarjeta = parseInt(prompt('Saldo: $' + saldo +'\nIngresá el importe q vas a pagar con TARJETA:'));
                if((importeTarjeta) < 0 || (importeTarjeta) > saldo){
                    mensajero('Importe mal ingresado');
                    break;
                } else {
                    let cantCuotas = parseInt(prompt('En cuantas cuotas queres pagar los $' + importeTarjeta + '\nPodés elegir 1, 3 o 6 cuotas\nSi no queres pagar con Tarjeta tipeá 0\nSi elegis 3 o 6 cuotas tendrás recargo'));
                    switch (cantCuotas){
                        case 0:
                            break;                                    
                        case 1:
                            // saldo -= importeTarjeta;
                            // totalTarjeta += importeTarjeta;
                            // leyendaCuotas = leyendaCuotas + '\nElegiste pagar: $' + importeTarjeta + ' en ' + cantCuotas + ' cuota';
                            procesoCuotas(importeTarjeta, 1)
                            break;                                    
                        case 3:                                    
                            // saldo -= importeTarjeta;
                            // totalTarjeta += importeTarjeta;
                            // leyendaCuotas = leyendaCuotas + '\nElegiste pagar: $' + importeTarjeta + ' en ' + cantCuotas + ' cuotas\nEn tu próximo Resumen te va a aparecer un importe de $'+ (importeTarjeta*coef3Cuotas);
                            procesoCuotas(importeTarjeta, 3)
                            break;                                    
                        case 6:                                   
                            // saldo -= importeTarjeta;
                            // totalTarjeta += importeTarjeta;
                            // leyendaCuotas = leyendaCuotas + '\nElegiste pagar: $' + importeTarjeta + ' en ' + cantCuotas + ' cuotas\nEn tu próximo Resumen te va a aparecer un importe de $'+ (importeTarjeta*coef6Cuotas);
                            procesoCuotas(importeTarjeta, 6)
                            break;                                    
                        }
                    break;
                    }
            case 3:
                    saldo=0;
                    cancelaIngreso = true;
                    break;
            default:
                mensajero('Entrada inválida');
                break;
            }
        } while (saldo>0);
        if (cancelaIngreso == true){
            leyendaFinal = 'No completaste el Saldo Total\nVas a seguir con una deuda de: $ ' + importeTotal;
        } else {
            leyendaFinal = 'Saldo Completado !!!\nEsta fue la forma de Pago q elegiste:'
            if (totalEfectivo>0){
                leyendaFinal = leyendaFinal + '\nTotal Efectivo: $' + totalEfectivo.toFixed(2);
            }
            if (totalTarjeta>0){
                leyendaFinal = leyendaFinal + '\nTotal Tarjeta: $' + totalTarjeta.toFixed(2);
            }
            if (leyendaCuotas!=''){
                leyendaFinal = leyendaFinal + '\n' + leyendaCuotas;
            }
        }
    
        mensajero(leyendaFinal + '\nByeee !');
    }



