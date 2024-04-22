<?php
require_once 'home.php';
require_once 'calendar.php';
require_once 'pacientes.php';
/*VERSION INICIAL DEL ROUTER*/
define('BASE_URL','//'.$_SERVER['SERVER_NAME'].':'.$_SERVER['SERVER_PORT'].dirname($_SERVER['PHP_SELF']).'/');

if($_GET['action']==''){ /** si en el llamado no hay action..va al home.**/
    showHome();
}else{
    $partesURL = explode('/',$_GET['action']);

    switch ($partesURL[0]) {
        case 'home':
            showHome();
            break;
        case 'calendar':
            showCalendar();
            break;
        case 'pacientes':
            showPacientes();
            break;
        default:
            # code...404
            break;
    }
}