"use strict";

document.addEventListener('DOMContentLoaded', function() {
    let myModal = new bootstrap.Modal(document.getElementById('myModal'));
    let frm = document.getElementById('formModalPaciente');

    /*CAPTURO LOS EVENTOS DEL PACIENTE DROPDOWN*/
       
    let calendarEl = document.getElementById('calendar');
    let calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        locale: 'es',
        headerToolbar: {
            left: 'prev,next,today',
            center: 'title',
            right: 'dayGridMonth,dayGridWeek,list' // user can switch between the two
        },
        dateClick: function(info){
            document.getElementById('fechaTurno').value = info.dateStr;
            document.getElementById('titulo').textContent = 'Registro';
            myModal.show();
        },
        selectable: true,
        slotDuration: '00:30:00', // Duración de las franjas horarias (30 minutos)
        slotMinTime: '11:00:00', // Hora de inicio del primer slot (8:00 AM)
        slotMaxTime: '17:00:00', // Hora de finalización del último slot (8:00 PM)
        nowIndicator: true,
       
      
    });
    calendar.render();

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

