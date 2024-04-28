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

        $this->model->getUser();

    }
}