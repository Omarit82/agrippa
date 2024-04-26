<?php

class ConfigApp{
    public static $ACTION = 'action';
    public static $PARAMS = 'params';
    public static $ACTIONS = [
        ''=>'TareasController#login',
        'home'=>'TareasController#login',
        'tareas'=>'TareasController#home',
        'add'=>'TareasController#insertTarea',
        'erase'=>'TareasController#eraseTarea',
        'finalizarTarea'=>'tareasController#finish',
        'login'=>'LoginCotroller#index',
        'verificarUsuario'=>'LoginController#verify',
        'logout'=>'LoginController#destroy'
    ];
}