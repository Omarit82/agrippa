<?php

class ConfigApp{
    public static $ACTION = 'action';
    public static $PARAMS = 'params';
    public static $ACTIONS = [
        ''=>'PacienteController#home',
        'home'=>'PacienteController#home',
        'calendar'=>'PacienteController#calendar',
        'lista'=>'PacienteController#lista',
        'login'=>'LoginController#login',
        'verifyLogin'=>'LoginController#verifyLogin',
        'addPaciente'=>'PacienteController#addPaciente'
    ];
}