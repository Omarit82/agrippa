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

    function home(){
        if(isset($_SESSION['USERNAME'])){
            $this->view->home();
        }else{
            header('Location: '.LOGIN);
            die();
        }
    }
    function lista(){
        $lista = $this->model->lista();
        $this->view->lista($lista);
    }

    function formPaciente(){
        $this->view->formPaciente();
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