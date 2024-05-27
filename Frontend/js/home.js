document.addEventListener('DOMContentLoaded',function(){
    "use strict";
   //JS PARA EL HOME
    const fecha = document.getElementById('oggi');
    const fechaHoy = new Date()
    const dia = fechaHoy.getDay();
    const mes = fechaHoy.getMonth();
    const anno = fechaHoy.getFullYear();
    let fechaDia;
    let fechaMes;
    switch (dia) {
        case 0:
            fechaDia = 'Domingo';
            break;
        case 1:
            fechaDia = 'Lunes';
            break;
        case 2:
            fechaDia = 'Martes';
            break;
        case 3:
            fechaDia = 'Miércoles';
            break;
        case 4:
            fechaDia = 'Jueves';
            break;
        case 5:
            fechaDia = 'Viernes';
            break;
        case 6:
            fechaDia = 'Sabado';
            break;
    }
    switch (mes) {
        case 0:
            fechaMes = 'Enero';
            break;
        case 1:
            fechaMes = 'Febrero';
            break;
        case 2:
            fechaMes = 'Marzo';
            break;
        case 3:
            fechaMes = 'Abril';
            break;
        case 4:
            fechaMes = 'Mayo';
            break;
        case 5:
            fechaMes = 'Junio';
            break;
        case 6:
            fechaMes = 'Julio';
            break;
        case 7:
            fechaMes = 'Agosto';
            break;
        case 8:
            fechaMes = 'Septiembre';
            break;
        case 9:
            fechaMes = 'Octubre';
            break;
        case 10:
            fechaMes = 'Noviembre';
            break;
        case 11:
            fechaMes = 'Diciembre';
            break;
        }
    fecha.innerHTML=fechaDia+" "+fechaHoy.getUTCDate()+" de "+fechaMes+ " de "+anno;

})