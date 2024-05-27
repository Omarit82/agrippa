document.addEventListener('DOMContentLoaded', function() {
    "use strict";
    // inicializacion de documento
    let calendarEl = document.getElementById('calendar');  //Div del calendario
    ejecutaPacientes();
    /***  ----------VARIABLES------------ ***/
    let turnosHorarios = document.querySelectorAll(".turno"); // Array con todos los posibles turnos
    let turnoElegido = document.getElementById('campoTurno');
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
    let listaPaciente = document.querySelectorAll('.listaPaciente');
    for(let i=0;i<listaPaciente.length;i++){
        listaPaciente[i].addEventListener('click',()=>{
            
        })
    }
    function showPacientes(datos){
        const SELECT_PACIENTE = document.getElementById('dropPacientes');
        SELECT_PACIENTE.innerHTML="";
        // AGREGADO DE ID Y CLASE A TODOS LOS BOTONES DE PACIENTES. 
        for (let i=0; i<datos.length;i++){
            let newLi = document.createElement("li");
            let anchor = document.createElement("a");
            let contenido = document.createTextNode(datos[i].id_paciente+"- "+datos[i].apellido+", "+datos[i].nombre);
            anchor.appendChild(contenido);
            anchor.classList.add("dropdown-item","selectPaciente");
            anchor.setAttribute("id",datos[i].id_paciente);
            newLi.appendChild(anchor);
            SELECT_PACIENTE.appendChild(newLi);
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
                sesiones.value = datos[i].sesiones;
                remanentes.value = datos[i].ses_remanentes;
            })
        }
    }
    async function ejecutaPacientes(){
        try {
            const respuesta = await fetch('pacientes');
            if(respuesta.ok){
                let data = await respuesta.json();
                showPacientes(data);
            }
            
        } catch (error) {
            console.log(error);
            Swal.fire(
                'Aviso',
                'Error en la comunicacion con el servidor',
                'error'
            )
        }
    }
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
    //----------------FORMULARIO NUEVO TURNO-----------------//
    formNuevoTurno.addEventListener('submit',function(e){
        e.preventDefault();
        const FECHA = document.getElementById('fechaTurno').value;
        const PACIENTE = document.getElementById('campoPaciente').value;
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
        let inicio = hora[0];
        let final = hora[1];
        let fechaInicio = FECHA+"T"+inicio;
        let fechaFinal = FECHA+"T"+final;
        //Tomamos las sesiones remanentes y las totales
        let remanentes = document.getElementById('sesionesRemanentes').value; 
        let totales = document.getElementById('sesiones').value;
        // Creamos un objeto para pasarle - debo descontar una sesion!
        let envio = {
            "fechaInicio":fechaInicio,
            "fechaFinal":fechaFinal,
            "id": id, //id del paciente
            "name":nombre,
            "inicio": inicio,
            "final": final,
            "remanentes": remanentes-1,
            "numeroTurno": totales - remanentes + 1,
        }
        if(FECHA =='' || PACIENTE ==''){
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
        agregarTurno(envio);
        //limpio el fomulario y cierro
        formNuevoTurno.reset();
        }
    });
    //--------------FORMULARIO NUEVO PACIENTE----------------//
    formNuevoPaciente.addEventListener('submit',function(e){
        e.preventDefault();
        let infoForm = new FormData(formNuevoPaciente);
        // Creamos un objeto para pasarle
        let ses = infoForm.get('sesiones');
        if(ses == 0){
            ses=1;
        }
        let dni = infoForm.get('dni');
        if(dni == ""){
            dni=0;
        }
        let telefono = infoForm.get('telefono');
        if(telefono == ""){
            telefono = 0;
        }
        let nacimiento = infoForm.get('fechaNacimiento');
        if(nacimiento ==''){
            nacimiento = '1900-1-1';
        }
        let edad = infoForm.get('edad');
        if(edad == ""){
            edad=0;
        }
        let ingreso = infoForm.get('fechaIngreso');
        if(ingreso ==''){
            ingreso = '1900-1-1';
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
        agregarPaciente(envio);
        formNuevoPaciente.reset();
    })

    async function agregarPaciente(envio){
        try {
            let pacientes = await fetch('agregarPaciente',{
                'method':'POST',
                'headers': {
                    "Content-Type":"application/json; charset=utf-8"
                },
                'body': JSON.stringify(envio)
            })
            if(pacientes.ok){
                Swal.fire(
                    'Aviso',
                    'Paciente cargado con exito',
                    'success'
                );
                }else{
                    Swal.fire(
                        'Aviso',
                        'No pudo cargarse el paciente',
                        'success'
                    );
                }
            }
        catch (error) {
            Swal.fire(
                'Aviso',
                'Erro en la comunicacion con la db',
                'error'
            );
        }
        ejecutaPacientes();
    }

    async function agregarTurno(envio){
        try {
            let registro = await fetch('registrar',{
                'method':'POST',
                'headers': {
                    "Content-Type":"application/json; charset=utf-8"
                },
                'body': JSON.stringify(envio)
            })
            if(registro.ok){
                Swal.fire(
                    'Aviso',
                    'Nuevo turno Cargado!',
                    'success'
                );
            }else{
                Swal.fire(
                    'Aviso',
                    'No pudo cargarse el turno',
                    'success'
                );
            }
        } catch (error) {
            Swal.fire(
                'Aviso',
                'Erro en la comunicacion con la db',
                'error'
            );
        }
        calendar.refetchEvents();
        ejecutaPacientes();
    }
});

