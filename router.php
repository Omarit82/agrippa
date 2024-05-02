<?php

require_once 'Config/ConfigApp.php';
require_once 'Backend/App/controller/PacienteController.php';
require_once 'Backend/App/controller/LoginController.php';
require_once 'Backend/App/controller/SecuredController.php';
require_once 'Backend/App/controller/CalendarController.php';
# ROUTER AVANZADO
/**POR LA PRESENCIA DEL ARCHIVO .HTACCESS CUANDO LEVANTE LA URL IRA AL ROUTER */
/* DEFINO CONSTANTES -  LA BASE DE LA URL - LA ACTION Y LOS PARAMETROS(ARRAY)*/
define('BASE_URL', '//'.$_SERVER['SERVER_NAME'] . ':' . $_SERVER['SERVER_PORT'] . dirname($_SERVER['PHP_SELF']).'/');
define('LOGIN',BASE_URL.'login');
define('LISTA',BASE_URL.'lista');
define('ACTION',0);
define('PARAMS',1);

/**ESTA FUNCION TOMA LA URL PASADA POR PARAMETRO Y LA DIVIDE SEGUN / EN, ACTION Y PARAMETROS
 * A SU VEZ LOS PARAMETROS (EN CASO DE ESTAR SETEADOS) SON DIVIDIDOS EN UN ARRAY..SINO ESTA SETEADO ES NULL
 */
function parseURL($url){
    $urlExploded = explode('/', $url);
    /** LE PASO A ConfigApp ACTION Y PARAMS */
    $arrayReturn[ConfigApp::$ACTION] = $urlExploded[ACTION];
    $arrayReturn[ConfigApp::$PARAMS] = isset($urlExploded[PARAMS]) ? array_slice($urlExploded,1) : null;
    return $arrayReturn;
}

/*EVALUA ACTION*/
if(isset($_GET['action'])){
    /**LE PASO A LA FUNCION parseURL LO QUE LLEGA EN ACTION(POSTERIOR A ROUTER.PHP EN LA URL) */
    $urlData = parseURL($_GET['action']);
    $action = $urlData[ConfigApp::$ACTION]; // HOME
    if(array_key_exists($action,ConfigApp::$ACTIONS)){
        $params = $urlData[ConfigApp::$PARAMS];
        $action = explode('#',ConfigApp::$ACTIONS[$action]);
        $controller = new $action[0]();
        $metodo = $action[1];
        if(isset($params) && $params != null){
            echo $controller->$metodo($params);
        }else{
            echo $controller->$metodo();
        }
    }
}