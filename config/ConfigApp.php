<?php

class ConfigApp{
    public static $ACTION = 'action';
    public static $PARAMS = 'params';
    public static $ACTIONS = [
        ''=>'PacienteController#home',
        'home'=>'PacienteController#home',
        'calendar'=>'PacienteController#calendar',
        'pacientes'=>'PacienteController#lista',
        'login'=>'PacienteController#login'
    ];
}