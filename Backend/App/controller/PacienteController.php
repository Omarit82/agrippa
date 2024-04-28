<?php
require_once 'Backend/App/model/Model.php';
require_once 'Backend/App/view/PacienteView.php';

class PacienteController{
    private $view;
    private $model;
    function __construct(){
        $this->model = new Model();
        $this->view = new PacienteView();
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

    function addPaciente(){
        $this->view->formPaciente();
    }
    function getUser(){

    }
}