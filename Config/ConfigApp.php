<?php

class ConfigApp{
    public static $ACTION = 'action';
    public static $PARAMS = 'params';
    public static $ACTIONS = [
        //HOME//
        ''=>'HomeController#home',
        'home'=>'HomeController#home',
        //ACCIONES HOME
        'calendar'=>'CalendarController#calendar',
        'turnos'=>'TurnosController#turnos',
        'lista'=>'PacienteController#lista',
        //LOGIN//
        'login'=>'LoginController#login',
        'verifyLogin'=>'LoginController#verifyLogin',
        'checkout'=>'LoginController#checkOut',
        //CALENDARIO//
        'events'=>'CalendarController#events',//TRANSFERENCIA DE JSON EVENTS AL FRONTEND
        'pacientes'=>'CalendarController#pacientes',//TRANSFERENCIA DE JSON PACIENTES AL FRONTEND
        'registrar'=>'CalendarController#registrar',
        'turnoComplete'=>'CalendarController#turnoComplete',
        'reprogramar'=>'CalendarController#reprogramar',
        'eliminarEvento'=>'CalendarController#eliminarEvento',
        'ausente'=>'CalendarController#ausente',
        //PACIENTES//
        'formPaciente'=>'PacienteController#formPaciente',
        'agregarPaciente'=>'PacienteController#agregarPaciente'
        
    ];
}