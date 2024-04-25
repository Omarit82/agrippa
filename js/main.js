"use strict";

document.addEventListener('DOMContentLoaded', function() {
    
    let calendarEl = document.getElementById('calendar');

    let calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridDay',
        headerToolbar: {
            left: 'prev,next',
            center: 'title',
            right: 'dayGridDay,dayGridWeek' // user can switch between the two
          },
        locale: 'es',
        selectable: true,
        slotDuration: '00:30:00', // Duración de las franjas horarias (30 minutos)
        slotMinTime: '11:00:00', // Hora de inicio del primer slot (8:00 AM)
        slotMaxTime: '17:00:00', // Hora de finalización del último slot (8:00 PM)
        nowIndicator: true,
        events:[{
            title: 'Evento de ejemplo',
            start: '2024-04-25T11:00:00',
            end: '2024-04-25T11:40:00'
        }],
        eventClick: function(info) {
            // Aquí puedes implementar la lógica para editar el evento
            alert('Has hecho clic en el evento: ' + info.event.title);
        }
    });
    calendar.render();
});

