<?php
class SecuredController{
    /** TODO CONTROLADOR QUE QUEREMOS HACER SEGURO, DEBE HEREDAR DE SECURED CONTROLLER E INICIALIZARLO EN EL CONTRUCTOR */
    
    public function __construct()
    {
        session_start();
        // Se verifica login
        if(isset($_SESSION['USERNAME'])){ // si esta logueado
            if (time() - $_SESSION['LAST_ACTIVITY'] > 10) { // expiro el timeout
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