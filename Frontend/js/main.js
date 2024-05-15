"use strict";
// inicializacion de documento
document.addEventListener('DOMContentLoaded', function() {

    let calendarEl = document.getElementById('calendar');  //Div del calendario

    ejecutarCalendario();
    ejecutaPacientes();
    /**
    *  ----------VARIABLES------------
    */
    let turnosHorarios = document.querySelectorAll(".turno"); // Array con todos los posibles turnos
    let turnoElegido = document.getElementById('campoTurno'); // 
    // INICIO DE LOS COMPONENTES DE BOOSTSTRAP
    let offcanvasLeft = new bootstrap.Offcanvas(document.getElementById('offcanvasLeft'));
    let eventModal =  new bootstrap.Modal(document.getElementById('eventoModal'));
    // FORMULARIOS DE LOS CANVAS
    let formNuevoTurno = document.getElementById('formCanvasTurno');
    let formNuevoPaciente = document.getElementById('formCanvasPaciente');
    
    for (let i = 0 ; i<turnosHorarios.length ; i++){
        turnosHorarios[i].addEventListener('click',()=>{
            let trn = turnosHorarios[i].innerHTML;
            turnoElegido.value = trn;
        })
    }

    function ejecutaPacientes(){
        //------------------------PACIENTES---------------------------------
        //TOMA LA LISTA DE PACIENTES DEL BACKEND Y LA ENTREGA COMO UN JSON
        let selecPaciente = document.getElementById('dropPacientes');
         // vaciar la lista antes de inciar
        selecPaciente.innerHTML="";
        fetch('pacientes').then(response => {
            // Verificar si la respuesta es exitosa
            if (!response.ok) {
            throw new Error('Hubo un problema al obtener los datos.');
            }
            // Parsear la respuesta como JSON
            return response.json();
        }).then(data => {
                //INGRESO LA LISTA DE PACIENTES DENTRO DEL CANVAS
                selecPaciente = document.getElementById('dropPacientes');
                // AGREGADO DE ID Y CLASE A TODOS LOS BOTONES DE PACIENTES. 
                for (let i=0; i<data.length;i++){
                    let newLi = document.createElement("li");
                    let anchor = document.createElement("a");
                    let contenido = document.createTextNode(data[i].id_paciente+"- "+data[i].apellido+", "+data[i].nombre);
                    anchor.appendChild(contenido);
                    anchor.classList.add("dropdown-item","selectPaciente");
                    anchor.setAttribute("id",data[i].id_paciente);
                    newLi.appendChild(anchor);
                    selecPaciente.appendChild(newLi);
                }
                //Escucho todos los botones creados!
                let botones = document.querySelectorAll('.selectPaciente');
                let selected = document.getElementById('campoPaciente');
                let sesiones = document.getElementById('sesiones');
                let remanentes = document.getElementById('sesionesRemanentes');
                for(let i = 0; i< botones.length ; i++){
                    botones[i].addEventListener('click',()=>{
                        let valor = botones[i].innerHTML;
                        selected.value = valor;
                        sesiones.value = data[i].sesiones;
                        remanentes.value = data[i].ses_remanentes;
                    })
                }
        }).catch(error => {
                console.error('Error:', error);
        });
    }
    function ejecutarCalendario(){
        //----------------------CALENDARIO-------------------------//   
        let calendar = new FullCalendar.Calendar(calendarEl, {
            timeZone:'local',
            slotDuration: '00:40:00',// Duración de las franjas horarias (40 minutos)
            slotMinTime: '09:00:00',
            slotMaxTime: '15:00:00',
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
                    case '09:40:00':
                        seleccion = document.getElementById('turno_2');
                        break;
                    case '10:20:00':
                        seleccion = document.getElementById('turno_3');
                        break;
                    case '11:00:00':
                        seleccion = document.getElementById('turno_4');
                        break;
                    case '11:40:00':
                        seleccion = document.getElementById('turno_5');
                        break;
                    case '12:20:00':
                        seleccion = document.getElementById('turno_6');
                        break;
                    case '13:00:00':
                        seleccion = document.getElementById('turno_7');
                        break;
                    case '13:40:00':
                        seleccion = document.getElementById('turno_8');
                        break;
                    case '14:20:00':
                        seleccion = document.getElementById('turno_9');
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
                //document.getElementById('eventModalSubtitle').value = eventClickInfo.event.extendedProps.sesiones+" | "+eventClickInfo.event.extendedProps.remanentes;
                //***********EVENTO FINALIZADO CORRECTAMENTE*********/
                let modal = document.getElementById('modalEventoForm');
                modal.addEventListener('submit',function(e){
                    e.preventDefault();
                    let dato = eventClickInfo.event.extendedProps.remanentes;
                    let envio={
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
                        'body': JSON.stringify(envio)
                    }).then(function(resp){
                        return resp.text();
                    }).then(function(envio){
                        Swal.fire(
                            'Aviso',
                            'Sesion realizada!',
                            'success'
                        );
                        ejecutarCalendario();
                    })
                })
                //************ELIMINAR EVENTO*************** *//
                /** Elimina un evento pero recupera la sesion - elimina en caso de error. */
                //**********REPROGRAMAR EVENTO****************//
                /** Se coloca reprogramado en el estado del turno y se debe actualizar el valor de las sesiones remanentes.*/
                document.getElementById('reprogramar').addEventListener('click',()=>{
                    let dato = eventClickInfo.event.extendedProps.remanentes;
                    let envio={
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
                        'body': JSON.stringify(envio)
                    }).then(function(resp){
                        return resp.text();
                    }).then(function(envio){
                        Swal.fire(
                            'Aviso',
                            'Sesion a reprogramar...',
                            'success'
                        );
                        ejecutaPacientes();
                        ejecutarCalendario();
                    })
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
                                    color: 'lightgreen', // Que hacer con los botones??
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
                                    color: 'lightred', 
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
                                    };
                                }       
                        }
                    })
                    successCallback(events);
                }).catch(error => {
                        failureCallback('Error:', error);
                });
            },
            eventContent: function(info){
                console.log(info);
                //info la extrae de cada evento
                return {
                    html:`
                        <div>
                            <a class="pacienteEvento">${info.event.title} | ${info.event.extendedProps.nroTurno} de ${info.event.extendedProps.sesiones}</a>
                            <img src="${info.event.extendedProps.image}">
                        </div>`
                }
            },            
        });
        calendar.render();
    }
    //----------------FORMULARIO NUEVO TURNO-----------------//
    formNuevoTurno.addEventListener('submit',function(e){
        e.preventDefault();
        const fecha = document.getElementById('fechaTurno').value;
        const paciente = document.getElementById('campoPaciente').value;
        let infoForm = new FormData(formNuevoTurno);
        //Tomamos el id del paciente
        let id_pac = infoForm.get('campoPaciente');
        let new_id_pac = id_pac.split("- ");
        let id = new_id_pac[0];
        let nombre = (new_id_pac[1].split(' | '))[0];
        //Tomamos el horario del turno
        let num = infoForm.get('campoTurno').split('° ');
        let turno = num[1];
        let hora = turno.split(" - ");
        let horaInicio = hora[0];
        let horaFinal = hora[1];
        let fechaInicio = fecha+"T"+horaInicio;
        let fechaFinal = fecha+"T"+horaFinal;
        //Tomamos las sesiones remanentes y las totales
        let remanentes = document.getElementById('sesionesRemanentes').value; 
        let totales = document.getElementById('sesiones').value;
        // Creamos un objeto para pasarle - debo descontar una sesion!
        let envio = {
            "fechaInicio":fechaInicio,
            "fechaFinal":fechaFinal, //fecha
            "id": id, //id del paciente
            "name":nombre,
            "inicio": horaInicio,
            "final": horaFinal,
            "remanentes": remanentes-1,
            "numeroTurno": totales - remanentes + 1,
        }
        console.log(envio);
        if(fecha =='' || paciente ==''){
            Swal.fire(
                'Aviso',
                'Todos los campos son necesarios',
                'warning'
            )
        }else if(remanentes == 0){
            Swal.fire(
                'Aviso',
                'El paciente ya realizó todas sus sesiones',
                'error'
            )
        }else{
            fetch('registrar',{
                'method':'POST',
                'headers': {
                    "Content-Type":"application/json; charset=utf-8"
                },
                'body': JSON.stringify(envio)
            }).then(function(resp){
                return resp.text();
               
            }).then(function(datos){
                console.log("Enviado!:");
                Swal.fire(
                    'Aviso',
                    'Nuevo turno cargado!',
                    'success'
                )
                //debo actualizar el calendario. y la lista de pacientes
                ejecutaPacientes();
                ejecutarCalendario();
            })
        }
        //limpio el fomulario y cierro
        formNuevoTurno.reset();
    })
    //--------------FORMULARIO NUEVO PACIENTE----------------//
    formNuevoPaciente.addEventListener('submit',function(e){
        e.preventDefault();
        let infoForm = new FormData(formNuevoPaciente);
        // Creamos un objeto para pasarle
        let ses = infoForm.get('sesiones');
        if(ses == 0){
            ses=1;
        }
        let envio = {
            "nombre":infoForm.get('nombre'),
            "apellido":infoForm.get('apellido'), //fecha
            "dni": infoForm.get('dni'), //id del paciente
            "telefono":infoForm.get('telefono'),
            "fechaNacimiento": infoForm.get('fechaNacimiento'),
            "edad": infoForm.get('edad'),
            "fechaIngreso": infoForm.get('fechaIngreso'),
            "anamnesis": infoForm.get('anamnesis'),
            "evaluacion": infoForm.get('evaluacion'),
            "objetivos": infoForm.get('objetivos'),
            "tratamiento": infoForm.get('tratamiento'),
            "estudios": infoForm.get('estudios'),
            "sesiones": ses,
        }
        fetch('agregarPaciente',{
            'method':'POST',
            'headers': {
                "Content-Type":"application/json; charset=utf-8"
            },
            'body': JSON.stringify(envio)
        }).then(function(resp){
            return resp.text();
        }).then(function(datos){
            console.log("Enviado!:");
            ejecutaPacientes();
        })
        //limpio el fomulario y cierro
        formNuevoPaciente.reset();
    })   
});

