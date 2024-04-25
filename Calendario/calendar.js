
document.addEventListener('DOMContentLoaded', function() {

    let request_calendar = "./events.json";

    var calendarEl = document.getElementById('calendar');
    var calendar = new FullCalendar.Calendar(calendarEl, {
      initialView: 'dayGridMonth',

        events:function(info, successCalback, failureCallback){
            fetch(request_calendar) //Aca se puede llamar a la dataBase - Estoy llamando el json
                .then(function(response){
                    return response.json()
                })
                .then(function(data){
                    let events = data.events.map(function(event){
                        return {
                            title: event.evenTitle,
                            start: new Date(event.eventStartDate),
                            end: new Date(event.eventEndDate),
                            startTime: ,
                            endTime,
                            location,
                            url: event.eventURL
                        }
                    })
                })
        }

    });
    calendar.render();
});