<?php
/** TODO CONTROLADOR QUE QUEREMOS HACER SEGURO, DEBE HEREDAR DE SECURED CONTROLLER E INICIALIZARLO EN EL CONTRUCTOR */
class SecuredController{
    
    
    public function __construct()
    {
        session_start();
        // Se verifica login
        if(isset($_SESSION['USERNAME'])){ // si esta logueado
            if (time() - $_SESSION['LAST_ACTIVITY'] >1800) { // expiro el timeout en 30 minutos
                header('Location: '.LOGIN);
                die();
            }

            $_SESSION['LAST_ACTIVITY'] = time();
        }
        else {
            header('Location: '. LOGIN);
            die();
          }
    
    }
    
}