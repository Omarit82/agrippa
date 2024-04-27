"use strict";

document.addEventListener('DOMContentLoaded', function() {
    let myModal = new bootstrap.Modal(document.getElementById('myModal'));
    let frm = document.getElementById('formulario');



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
            document.getElementById('start').value = info.dateStr;
            document.getElementById('titulo').textContent = 'Registro';
            myModal.show();
        },
        selectable: true,
        slotDuration: '00:30:00', // Duración de las franjas horarias (30 minutos)
        slotMinTime: '11:00:00', // Hora de inicio del primer slot (8:00 AM)
        slotMaxTime: '17:00:00', // Hora de finalización del último slot (8:00 PM)
        nowIndicator: true,
        googleCalendarApiKey: 'AIzaSyDrWTSCOm7s4mpF2SDiP_yLUCik2OImtVE',
        events: {
            googleCalendarId: 'roselliomar82@gmail.com',
            color:'red',
            textColor:'black',
            backgroundColor: 'green',

        },
      
    });
    calendar.render();
    frm.addEventListener('submit',function(e){
        e.preventDefault();
        const title = document.getElementById('title').value;
        const start = document.getElementById('start').value;
        const color = document.getElementById('color').value;
        if(title =='' || start =='' || color == ''){
      //mostramos una alerta de sweetAlert
    
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

