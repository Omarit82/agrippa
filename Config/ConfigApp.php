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
        'checkout'=>'LoginController#checkOut'
    ];
}