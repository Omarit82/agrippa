"use strict";

// inicializacion de documento
document.addEventListener('DOMContentLoaded', function() {

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

    //CALENDARIO//
    let calendarEl = document.getElementById('calendar');
    let calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        locale: 'es',
        buttonText: {
            today: 'Hoy',
            month: 'Mes',
            week: 'Semana',
            day: 'Dia',
            list: 'Lista'
        },
        headerToolbar: {
            left: 'prev,next,today',
            center: 'title',
            right: 'dayGridMonth,dayGridWeek,list' // user can switch between the two
        },
        dateClick: function(info){
            document.getElementById('fechaTurno').value = info.dateStr;
            offcanvasLeft.show();
        },
        selectable: true,
        slotDuration: '00:40:00', // Duración de las franjas horarias (40 minutos)
        slotMinTime: '9:00:00', // Hora de inicio del primer slot (9:00 AM)
        slotMaxTime: '15:00:00', // Hora de finalización del último slot (15:00 PM)
        nowIndicator: true,
        //events: 'header("Location: ".events)',
      
    });
    calendar.render();

    //FORMULARIO NUEVO TURNO//
    frm.addEventListener('submit',function(e){
        e.preventDefault();
        const title = document.getElementById('fechaTurno').value;
        const start = document.getElementById('pacienteDD').value;
        
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

