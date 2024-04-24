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
        selectable: true
    });
    calendar.render();
});

