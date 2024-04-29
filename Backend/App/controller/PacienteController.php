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

    function calendar(){
        $this->view->calendar();
    }

    function addPaciente(){
        $this->view->formPaciente();
    }
}