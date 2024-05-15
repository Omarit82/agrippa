<?php

class ConfigApp{
    public static $ACTION = 'action';
    public static $PARAMS = 'params';
    public static $ACTIONS = [
        ''=>'CalendarController#calendar',
        'home'=>'CalendarController#calendar',
        'calendar'=>'CalendarController#calendar',
        'lista'=>'PacienteController#lista',
        'login'=>'LoginController#login',
        'verifyLogin'=>'LoginController#verifyLogin',
        'formPaciente'=>'PacienteController#formPaciente',
        'addPaciente'=>'PacienteController#addPaciente',
        'checkout'=>'LoginController#checkOut',
        'events'=>'CalendarController#events',//TRANSFERENCIA DE JSON EVENTS AL FRONTEND
        'pacientes'=>'CalendarController#pacientes',//TRANSFERENCIA DE JSON PACIENTES AL FRONTEND
        'registrar'=>'CalendarController#registrar',
        'agregarPaciente'=>'PacienteController#agregarPaciente',
        'turnoComplete'=>'CalendarController#turnoComplete',
        'reprogramar'=>'CalendarController#reprogramar'
    ];
}