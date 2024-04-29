<?php
require_once 'Backend/App/model/Model.php';
require_once 'Backend/App/view/LoginView.php';

class LoginController{

    private $model;
    private $view;

    function __construct(){
        $this->model = new Model();
        $this->view = new LoginView();
    }

    function login(){
        $this->view->show();
    }

    function verifyLogin(){
        $user = $_POST['email'];
        $pass = $_POST['password'];

        $dbUser = $this->model->getUser($user);

        $hash = $dbUser[0]->pass_user;
        if(isset($dbUser)){
            if(password_verify($pass,$hash)){
                session_start();
                $_SESSION['USERNAME'] = $user;
                $_SESSION['ID'] = $dbUser[0]->id_user;
                $_SESSION['LAST_ACTIVITY'] = time();
                header("Location: ".BASE_URL);
                die();
            }else{
                $this->view->show("Contraseña Incorrecta");
            }
        }else{
            // no existe el usuario
            echo "no existe el usuario";
        }
    }

    function checkOut(){
        session_start();
        session_destroy();
        header('Location: '. LOGIN);
        die();
    }
}