<?php
require_once 'Backend/App/model/Model.php';
require_once 'Backend/App/view/PacienteView.php';
require_once 'SecuredController.php';

class PacienteController extends SecuredController{
    private $view;
    private $model;
    function __construct(){
        parent::__construct();
        $this->model = new Model();
        $this->view = new PacienteView();
    }
    function lista(){
        if(isset($_SESSION['USERNAME'])){
            $lista = $this->model->lista();
            $this->view->lista($lista);  //MUESTRA la lista de pacientes cargadas
        }else{
            header('Location: '.LOGIN);
            die();
        }  
    }
    function formPaciente(){
        if(isset($_SESSION['USERNAME'])){
            $this->view->formPaciente(); //MUESTRA EL formulario para cargar pacientes
        }else{
            header('Location: '.LOGIN);
            die();
        }  
    }

    function addPaciente(){
        $paciente = $_POST;
        $this->model->addPaciente($paciente);       
    }

    function agregarPaciente(){
        $paciente = $this->view->agregarPaciente();
        $this->model->addPaciente($paciente);
    }
}