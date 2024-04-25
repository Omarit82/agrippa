<?php

class ConfigApp{
    public static $ACTION = 'action';
    public static $PARAMS = 'params';
    public static $ACTIONS = [
        ''=>'TareasController#home',
        'home'=>'TareasController#home',
        'tareas'=>'TareasController#home',
        'add'=>'TareasController#insertTarea',
        'erase'=>'TareasController#eraseTarea'
    ];
}