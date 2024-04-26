"use strict";

document.addEventListener('DOMContentLoaded', function() {

  var calendarEl = document.getElementById('calendar');
  var calendar = new FullCalendar.Calendar(calendarEl, {
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
      googleCalendarApiKey: 'AIzaSyDrWTSCOm7s4mpF2SDiP_yLUCik2OImtVE',
      events: {
          googleCalendarId: 'roselliomar82@gmail.com'
      }
      
  });
  calendar.render();
});

