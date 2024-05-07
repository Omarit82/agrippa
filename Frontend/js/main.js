"use strict";

// inicializacion de documento
document.addEventListener('DOMContentLoaded', function() {

    //------------------------PACIENTES---------------------------------
    //TOMA LA LISTA DE PACIENTES DEL BACKEND Y LA ENTREGA COMO UN JSON
    fetch('pacientes').then(response => {
            // Verificar si la respuesta es exitosa
            if (!response.ok) {
            throw new Error('Hubo un problema al obtener los datos.');
            }
            // Parsear la respuesta como JSON
            return response.json();
    }).then(data => {
            // Procesar los datos recibidos
            //INGRESO LA LISTA DE PACIENTES DENTRO DEL CANVAS
            let selecPaciente = document.getElementById('dropPacientes');
             /*   
                // AGREGADO DE ID Y CLASE A TODOS LOS BOTONES DE PACIENTES. 
            */
            for (let i=0; i<data.length;i++){
                let newLi = document.createElement("li");
                let anchor = document.createElement("a");
                let contenido = document.createTextNode(data[i].apellido+", "+data[i].nombre)
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
            for(let i = 0; i< botones.length ; i++){
                botones[i].addEventListener('click',()=>{
                    let valor = botones[i].innerHTML;
                    selected.value = valor;
                    sesiones.value = data[i].sesiones;
                })
            }
            
        
            
    }).catch(error => {
            console.error('Error:', error);
    });

    //-----------------------EVENTOS-----------------------------
    //TOMA LA LISTA DE EVENTOS DEL BACKEND Y LA ENTREGA COMO UN JSON
    /*fetch('events').then(response => {
        // Verificar si la respuesta es exitosa
        if (!response.ok) {
        throw new Error('Hubo un problema al obtener los datos.');
        }
        // Parsear la respuesta como JSON
        return response.json();
    }).then(data => {
        // Procesar los datos recibidos
        //INGRESO LA LISTA DE EVENTOS
            
    }).catch(error => {
            console.error('Error:', error);
    });*/

    
    //dentro del canvas izquierdo permite seleccionar un turno y lo muestra en el html
    let turnosHorarios = document.querySelectorAll(".turno");
    let turnoElegido = document.getElementById('campoTurno');

    for (let i = 0 ; i<turnosHorarios.length ; i++){
        turnosHorarios[i].addEventListener('click',()=>{
            let trn = turnosHorarios[i].innerHTML;
            turnoElegido.value = trn;
        })
    }

    let offcanvasLeft = new bootstrap.Offcanvas(document.getElementById('offcanvasLeft'));
    let frm = document.getElementById('formCanvasTurno');
    //let turnos = JSON.parse(document.getElementById('turnos').innerHTML);
    //console.log(turnos);

    //----------------------CALENDARIO-------------------------//
    let calendarEl = document.getElementById('calendar'); 
   
    let calendar = new FullCalendar.Calendar(calendarEl, {
        slotDuration: '00:40:00',// Duración de las franjas horarias (40 minutos)
        slotMinTime: '09:00:00',
        slotMaxTime: '15:40:00',
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
            right: 'timeGridWeek,timeGridDay,dayGridMonth' // user can switch between the two
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
        selectable: true,
        //events: 
        googleCalendarApiKey: 'AIzaSyDrWTSCOm7s4mpF2SDiP_yLUCik2OImtVE',
        events: {
            googleCalendarId: 'roselliomar82@gmail.com',
          
        },
        
    });
 
    calendar.render();
    let test = document.getElementById('fc-dom-1').innerHTML;
    console.log(test);  
    let titulo = document.getElementById('tituloFecha');
    titulo.innerHTML = test; 

    //----------------FORMULARIO NUEVO TURNO-----------------//
    frm.addEventListener('submit',function(e){
        e.preventDefault();
        const title = document.getElementById('fechaTurno').value;
        const start = document.getElementById('campoPaciente').value;
        

        if(title =='' || start ==''){
            Swal.fire(
                'Aviso',
                'Todos los campos son necesarios',
                'warning'
            )
    
        }else{
            const url = 'Home/registrar';
            const http = new XMLHttpRequest();
            http.open('POST',url,true);
            http.send(new FormData(frm));
            http.onreadystatechange = function(){
                if(this.readyState == 4 && this.status == 200){
                    console.log(this.responseText);
                }
            }
        }
    })
});

