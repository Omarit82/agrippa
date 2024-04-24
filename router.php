<?php
require_once './controller/PacienteController.php';
/*VERSION INICIAL DEL ROUTER*/
define('BASE_URL','//'.$_SERVER['SERVER_NAME'].':'.$_SERVER['SERVER_PORT'].dirname($_SERVER['PHP_SELF']).'/');

$controller = new PacienteController(); // instancio el controlador

if (!empty($_GET['action'])){
    $action = $_GET['action'];
}else{
    $action = 'login'; // Esta es la accion por defecto.
}

$partesURL = explode('/',$action);

    switch ($partesURL[0]) {
        case 'login':
            $controller->login();
            break;
        case 'calendar':
            $controller->calendar();
            break;
        case 'pacientes':
            $controller->lista();
            break;
        case 'home':
            $controller->home();
            break;
        default:
            # code...404
            break;
}
