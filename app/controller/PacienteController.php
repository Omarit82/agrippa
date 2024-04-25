<?php
require_once 'app/model/PacienteModel.php';
require_once 'app/view/PacienteView.php';
class PacienteController{
    private $view;
    private $model;
    function __construct(){
        $this->model = new PacienteModel();
        $this->view = new PacienteView();
    }

    function login(){
        $this->view->login();
    }
    function home(){
        $this->view->home();
    }
    function lista(){
        $lista = $this->model->lista();
        $this->view->lista($lista);
    }

    function calendar(){
        $this->view->calendar();
    }
}