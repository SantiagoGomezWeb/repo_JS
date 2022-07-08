// Pedimos como quiere pagar una deuda, previamente a loguease

let passGuardada = 'qwe';
let sigoProceso = false;
let cancelaIngreso = false;
let cancelaLogin = false;
let leyendaIntentos = '';

let importeTotal = 10000;
let saldo = 10000;
let coef3Cuotas = 1.30;
let coef6Cuotas = 1.60;

let totalEfectivo = 0;
let totalTarjeta = 0;
let leyendaCuotas = '';
let leyendaFinal = '';

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
            alert('Ingreso Exitoso');
            sigoProceso = true;
            break;
        } else {
            // alert('Contraseña Inválida.\nTe quedan '+ (3-i-1) + leyendaIntentos);
            alert('Contraseña Inválida !!!');
        }
    }
}

if (sigoProceso == false){
    if(cancelaLogin == true){
        alert('Hasta luego !');    
    }else{
        alert('Su cuenta será bloqueada por cuestiones de Seguridad\nHasta luego !');
    }
}else{
    do{
        let formaDePago =  parseInt(prompt('Tu Saldo es de $' + saldo + '\n\nCómo vas a pagar? \n1.-Efectivo \n2.-Tarjeta de Crédito \n3.- Salir'));
        switch (formaDePago) {
            case 1:
                let importeEfectivo = parseInt(prompt('Saldo: $' + saldo +'\nIngresá el importe q vas a pagar en EFECTIVO: '));
                if((importeEfectivo) < 0 || (importeEfectivo) > saldo){
                    alert('Importe mal ingresado');
                    break;
                } else {
                    saldo -= importeEfectivo;
                    totalEfectivo += importeEfectivo;
                    break;
                }
            case 2:
                let importeTarjeta = parseInt(prompt('Saldo: $' + saldo +'\nIngresá el importe q vas a pagar con TARJETA:'));
                if((importeTarjeta) < 0 || (importeTarjeta) > saldo){
                    alert('Importe mal ingresado');
                    break;
                } else {
                    let cantCuotas = parseInt(prompt('En cuantas cuotas queres pagar los $' + importeTarjeta + '\nPodés elegir 1, 3 o 6 cuotas\nSi no queres pagar con Tarjeta tipeá 0\nSi elegis 3 o 6 cuotas tendrás recargo'));
                    switch (cantCuotas){
                        case 0:
                            break;                                    
                        case 1:
                            saldo -= importeTarjeta;
                            totalTarjeta += importeTarjeta;
                            leyendaCuotas = leyendaCuotas + '\nElegiste pagar: $' + importeTarjeta + ' en ' + cantCuotas + ' cuota';
                            break;                                    
                        case 3:                                    
                            saldo -= importeTarjeta;
                            totalTarjeta += importeTarjeta;
                            leyendaCuotas = leyendaCuotas + '\nElegiste pagar: $' + importeTarjeta + ' en ' + cantCuotas + ' cuotas\nEn tu próximo Resumen te va a aparecer un importe de $'+ (importeTarjeta*coef3Cuotas);
                            break;                                    
                        case 6:                                   
                            saldo -= importeTarjeta;
                            totalTarjeta += importeTarjeta;
                            leyendaCuotas = leyendaCuotas + '\nElegiste pagar: $' + importeTarjeta + ' en ' + cantCuotas + ' cuotas\nEn tu próximo Resumen te va a aparecer un importe de $'+ (importeTarjeta*coef6Cuotas);
                            break;                                    
                        }
                    break;
                    }
            case 3:
                    saldo=0;
                    cancelaIngreso = true;
                    break;
            default:
                alert('Entrada inválida');
                break;
            }
        } while (saldo>0);
        if (cancelaIngreso == true){
            leyendaFinal = 'No completaste el Saldo Total\nVas a seguir con una deuda de: $ ' + importeTotal;
        } else {
            leyendaFinal = 'Saldo Completado !!!\n\nEsta fue la forma de Pago q elegiste:'
            if (totalEfectivo>0){
                leyendaFinal = leyendaFinal + '\nTotal Efectivo: $' + totalEfectivo;
            }
            if (totalTarjeta>0){
                leyendaFinal = leyendaFinal + '\nTotal Tarjeta: $' + totalTarjeta;
            }
            if (leyendaCuotas!=''){
                leyendaFinal = leyendaFinal + '\n' + leyendaCuotas;
            }
        }
    
        alert(leyendaFinal + '\n\nByeee !');
    }



