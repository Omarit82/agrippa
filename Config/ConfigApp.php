<?php

class ConfigApp{
    public static $ACTION = 'action';
    public static $PARAMS = 'params';
    public static $ACTIONS = [
        ''=>'PacienteController#home',
        'home'=>'PacienteController#home',
        'calendar'=>'PacienteController#calendar',
        'lista'=>'PacienteController#lista',
        'login'=>'PacienteController#login',
        'addPaciente'=>'PacienteController#addPaciente'
    ];
}