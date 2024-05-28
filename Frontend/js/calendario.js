import { ejecutaPacientes } from "./funciones.js";

document.addEventListener('DOMContentLoaded',()=>{
    "use strict";
     
    // inicializacion de documento
    let calendarEl = document.getElementById('calendar');  //Div del calendario
    let turnoElegido = document.getElementById('campoTurno');//CAMPO DONDE COMPLETAR EL TURNO ELEGIDO
    let offcanvasLeft = new bootstrap.Offcanvas(document.getElementById('offcanvasLeft'));//CANVAS PARA CREAR UN TURNO DESDE EL CALENDARIO
    let eventModal =  new bootstrap.Modal(document.getElementById('eventoModal'));//MODAL PARA CLICK DE EVENTOS
    ejecutaPacientes();
    //----------------------CALENDARIO-------------------------//   
    let calendar = new FullCalendar.Calendar(calendarEl, {
        timeZone:'local',
        slotDuration: '00:30:00',// Duración de las franjas horarias (40 minutos)
        slotMinTime: '09:00:00',
        slotMaxTime: '16:00:00',
        // Hora de finalización del último slot (15:00 PM)
        nowIndicator: true,
        initialView: 'timeGridDay',
        locale: 'es',
        buttonText: {
            today: 'Hoy',
            month: 'Mes',
            week: 'Semana',
            day: 'Dia',
            list: 'Lista'
        },
        headerToolbar: {
            left: 'prev,next,today,list',
            center: 'title',
            right: 'timeGridWeek,timeGridDay' // user can switch between the two
        },
        selectable: true,
        allDaySlot: false,
        //defaultEventMinutes: 40,
        axisFormat: 'h(:mm)tt', 
        timeFormat: {
            agenda: 'h:mm{ - h:mm}'
        },
        dragOpacity: {
            agenda: .5
        },
        dateClick: function(info){
            let cadena = info.dateStr.split('T');
            let turn = cadena[1].split('-');
            let dia = cadena[0];
            let turno = turn[0];
            let seleccion;
            switch (turno) {
                case '09:00:00':
                    seleccion = document.getElementById('turno_1');
                    break;
                case '09:30:00':
                    seleccion = document.getElementById('turno_2');
                    break;
                case '10:00:00':
                    seleccion = document.getElementById('turno_3');
                    break;
                case '10:30:00':
                    seleccion = document.getElementById('turno_4');
                    break;
                case '11:00:00':
                    seleccion = document.getElementById('turno_5');
                    break;
                case '11:30:00':
                    seleccion = document.getElementById('turno_6');
                    break;
                case '12:00:00':
                    seleccion = document.getElementById('turno_7');
                    break;
                case '12:30:00':
                    seleccion = document.getElementById('turno_8');
                    break;
                case '13:00:00':
                    seleccion = document.getElementById('turno_9');
                    break;
                case '13:30:00':
                    seleccion = document.getElementById('turno_10');
                    break;
                case '14:00:00':
                    seleccion = document.getElementById('turno_11');
                    break;
                case '14:30:00':
                    seleccion = document.getElementById('turno_12');
                    break;
                case '15:00:00':
                    seleccion = document.getElementById('turno_13');
                    break;
                case '15:30:00':
                    seleccion = document.getElementById('turno_14');
                    break;
                default:
                    seleccion = document.getElementById('turno_1');
                    break;
            }
            turnoElegido.value = seleccion.innerHTML;
            document.getElementById('fechaTurno').value =dia;
            offcanvasLeft.show();
        },
        eventClick: function(eventClickInfo){
            //***********INFO PARA EL MODAL**********************/
            document.getElementById('eventoModalTitle').value = eventClickInfo.event.title;
            //***********EVENTO FINALIZADO CORRECTAMENTE*********/
            let modal = document.getElementById('modalEventoForm');
            modal.addEventListener('submit',function(e){
                e.preventDefault();
                let dato = eventClickInfo.event.extendedProps.remanentes;
                let finalizado={
                    "remanentes":dato,
                    "id": eventClickInfo.event.extendedProps.idPaciente,
                    "turnoId": eventClickInfo.event.extendedProps.idTurno,
                    "estado": "listo"
                }
                fetch('turnoComplete',{
                    'method':'POST',
                    'headers': {
                        "Content-Type":"application/json; charset=utf-8"
                    },
                    'body': JSON.stringify(finalizado)
                }).then(function(resp){
                    return resp.text();
                }).then(function(finalizado){
                    console.log(finalizado);
                    Swal.fire(
                        'Aviso',
                        'Sesion realizada!',
                        'success'
                    );
                    
                }).catch(function(error){
                    console.log(error);
                });
                calendar.refetchEvents();
                ejecutaPacientes();
                setTimeout(() => {
                    location. reload();
                }, 1500);
            })
            //************ELIMINAR EVENTO*************** *//
            /** Elimina un evento pero recupera la sesion - elimina en caso de error. */
            document.getElementById('eliminarEvento').addEventListener('click',()=>{
                let dato = eventClickInfo.event.extendedProps.remanentes;
                dato++;
                let eliminado={
                    "remanentes":dato,
                    "id": eventClickInfo.event.extendedProps.idPaciente,
                    "turnoId": eventClickInfo.event.extendedProps.idTurno,
                }
                fetch('eliminarEvento',{
                    'method':'POST',
                    'headers': {
                        "Content-Type":"application/json; charset=utf-8"
                    },
                    'body': JSON.stringify(eliminado)
                }).then(function(resp){
                    return resp.text();
                }).then(function(eliminado){
                    console.log(eliminado);
                    Swal.fire(
                        'Aviso',
                        'Turno Eliminado',
                        'success'
                    );
                    
                }).catch(function(error){
                    console.log(error);
                });
                calendar.refetchEvents();
                ejecutaPacientes();
                setTimeout(() => {
                    location. reload();
                }, 1500);
            })
            //**********REPROGRAMAR EVENTO****************//
            /** Se coloca reprogramado en el estado del turno y se debe actualizar el valor de las sesiones remanentes.*/
            document.getElementById('reprogramar').addEventListener('click',()=>{
                let dato = eventClickInfo.event.extendedProps.remanentes;
                let reprog={
                    "remanentes":dato+1,
                    "id": eventClickInfo.event.extendedProps.idPaciente,
                    "turnoId": eventClickInfo.event.extendedProps.idTurno,
                    "estado": "reprogramado"
                }
                fetch('reprogramar',{
                    'method':'POST',
                    'headers': {
                        "Content-Type":"application/json; charset=utf-8"
                    },
                    'body': JSON.stringify(reprog)
                }).then(function(resp){
                    return resp.text();
                }).then(function(reprog){
                    console.log(reprog);
                    Swal.fire(
                        'Aviso',
                        'Sesion a reprogramar...',
                        'success'
                    );
                    
                }).catch(function(error){
                    console.log(error);
                });
                calendar.refetchEvents();
                ejecutaPacientes();
                setTimeout(() => {
                    location. reload();
                }, 1500);
            })
            //*********EVENTO AUSENTE*******************///
            document.getElementById('ausente').addEventListener('click',()=>{
                let ausente={
                    "id": eventClickInfo.event.extendedProps.idPaciente,
                    "turnoId": eventClickInfo.event.extendedProps.idTurno,
                    "estado": "ausente"
                }
                console.log(ausente);
                fetch('ausente',{
                    'method':'POST',
                    'headers': {
                        "Content-Type":"application/json; charset=utf-8"
                    },
                    'body': JSON.stringify(ausente)
                }).then(function(resp){
                    return resp.text();
                }).then(function(ausente){
                    console.log(ausente);
                    Swal.fire(
                        'Aviso',
                        'Sesion perdida',
                        'error'
                    );
                    
                }).catch(function(error){
                    console.log(error);
                });
                calendar.refetchEvents();
                ejecutaPacientes();
                setTimeout(() => {
                    location. reload(); //CAUSA UN REFRESCO EN LA PAGINA POR EL POST
                }, 1500);
            })
            eventModal.show();  
        },
        //--------------------EVENTOS-------------------
        events: function(info,successCallback,failureCallback){
            //------------------------EVENTOS---------------------------------
            //TOMA LA LISTA DE EVENTOS DEL BACKEND Y LA ENTREGA COMO UN JSON
            fetch('events').then(response => {
                // Verificar si la respuesta es exitosa
                if (!response.ok) {
                    throw new Error('Hubo un problema al obtener los datos.');
                }
                // Parsear la respuesta como JSON
                return response.json();
            }).then(data => {
                let events = data.map(function(event){
                    switch(event.estado){
                        case 'listo' : // Evento que se finalizo con exito
                            return {
                                title: event.nombre,
                                start: event.fechaInicio,
                                end: event.fechaFinal,
                                timeStart: event.inicio,
                                timeEnd: event.final,
                                extendedProps:{
                                    sesiones: event.sesiones,
                                    remanentes: event.ses_remanentes,
                                    idPaciente: event.id_paciente,
                                    idTurno: event.turno_id,
                                    nroTurno: event.numero_turno,
                                    image: './Frontend/assets/img/ok.png', 
                                },
                                color: 'lightgreen',
                                textColor: 'black'
                            }; 
                        case 'ausente' : // Evento cancelado por ausencia sin aviso
                            return {
                                title: event.nombre,
                                start: event.fechaInicio,
                                end: event.fechaFinal,
                                timeStart: event.inicio,
                                timeEnd: event.final,
                                extendedProps:{
                                    sesiones: event.sesiones,
                                    remanentes: event.ses_remanentes,
                                    idPaciente: event.id_paciente,
                                    idTurno: event.turno_id,
                                    nroTurno: event.numero_turno,
                                    image: './Frontend/assets/img/not.png', 
                                },
                                color: 'red', 
                                textColor: 'white'
                            }; 
                        case 'reprogramado' : //Evento reprogramado
                            return {
                                title: event.nombre,
                                start: event.fechaInicio,
                                end: event.fechaFinal,
                                timeStart: event.inicio,
                                timeEnd: event.final,
                                extendedProps:{
                                    sesiones: event.sesiones,
                                    remanentes: event.ses_remanentes,
                                    idPaciente: event.id_paciente,
                                    idTurno: event.turno_id,
                                    nroTurno: event.numero_turno,
                                    image: './Frontend/assets/img/refatto.png',
                                },
                                color: 'lightblue', 
                                textColor: 'black'
                            };
                        default: // Evento a espera de estado!
                            if(event.ses_remanentes == 0 && event.numero_turno === event.sesiones){
                                return {
                                    title: event.nombre,
                                    start: event.fechaInicio,
                                    end: event.fechaFinal,
                                    timeStart: event.inicio,
                                    timeEnd: event.final,
                                    extendedProps:{
                                        sesiones: event.sesiones,
                                        remanentes: event.ses_remanentes,
                                        idPaciente: event.id_paciente,
                                        idTurno: event.turno_id,
                                        nroTurno: event.numero_turno,
                                        image: './Frontend/assets/img/alert.png',
                                    },
                                    color: 'orange', 
                                    textColor: 'black'
                                };
                            }else{
                                return {
                                    title: event.nombre,
                                    start: event.fechaInicio,
                                    end: event.fechaFinal,
                                    timeStart: event.inicio,
                                    timeEnd: event.final,
                                    extendedProps:{
                                        sesiones: event.sesiones,
                                        remanentes: event.ses_remanentes,
                                        idPaciente: event.id_paciente,
                                        idTurno: event.turno_id,
                                        nroTurno: event.numero_turno,
                                        image: './Frontend/assets/img/clock.png',
                                    }, 
                                    textColor: 'black'
                                };
                            }       
                    }
                })
                successCallback(events);
            }).catch(error => {
                failureCallback('Error:', error);
            });
        },
        eventContent: function(info) { // DEBO ACOMODAR ESTO!
            console.log(info);
            let view = info.view.type;
            let titulo = info.event.title.split(','); 
            if(view === 'timeGridDay') {
                return { html: `
                    <div class="d-flex">
                        <div class="d-flex flex-column"> 
                            <p class="fw-bold pacienteEvento m-0">${titulo[1]}</p>
                            <p class="fw-bold pacienteEvento m-0">${titulo[0]}</p>
                        </div>
                        <img class="mb-3 ms-1" src="${info.event.extendedProps.image}">
                    </div>
                    `
                }
            } else if(view === 'timeGridWeek') {
                return {
    
                }
            } else if(view === 'list'){
                return {
                    html:`
                    <div class="d-flex">
                        <p class="fw-bold pacienteEvento m-0">${titulo[1]}</p>
                        <img class="mb-3 ms-1" src="${info.event.extendedProps.image}">
                    </div>
                    `
                }
            }
        }
    });
    calendar.render();
})