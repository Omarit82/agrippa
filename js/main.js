"use strict";

document.addEventListener('DOMContentLoaded', function() {
    
    let calendarEl = document.getElementById('calendar');

    let calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        headerToolbar: {
            left: 'prev,next',
            center: 'title',
            right: 'dayGridDay,dayGridWeek,dayGridMonth' // user can switch between the two
          },
        locale: 'es',
        selectable: true,
        slotDuration: '00:30:00', // Duración de las franjas horarias (30 minutos)
        slotMinTime: '11:00:00', // Hora de inicio del primer slot (8:00 AM)
        slotMaxTime: '17:00:00', // Hora de finalización del último slot (8:00 PM)
        nowIndicator: true,
        events: [
            {
              title: 'Evento 1',
              start: '2024-04-25',
              subEvents: [
                { title: 'Subevento 1', start: '2024-04-25T10:00:00' },
                { title: 'Subevento 2', start: '2024-04-25T12:00:00' },
                { title: 'Subevento 3', start: '2024-04-25T14:00:00' }
              ]
            }
          ],
        eventRender: function(info) {
            info.el.addEventListener('click', function() {
                // Aquí puedes personalizar la lógica para mostrar los subeventos
                var subEvents = info.event.extendedProps.subEvents;
                if (subEvents && subEvents.length > 0) {
                alert('Subeventos:\n' + subEvents.map(function(event) {
                    return event.title + ' - ' + event.start;
                }).join('\n'));
                }
            });
        },
        
    });
    calendar.render();
});

