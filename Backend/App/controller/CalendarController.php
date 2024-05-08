<?php
require_once 'Backend/App/model/Model.php';
require_once 'Backend/App/view/CalendarView.php';
require_once 'SecuredController.php';

class CalendarController extends SecuredController{
    private $model;
    private $view;

    public function __construct(){
        parent::__construct();
        $this->model = new Model();
        $this->view = new CalendarView();
    }

    function calendar(){
        if(isset($_SESSION['USERNAME'])){
            $this->view->calendar();  //MUESTRA EL CALENDARIO
        }else{
            header('Location: '.LOGIN);
            die();
        }  
    }

    function events(){  //TRAE DEL MODELO LOS EVENTOS Y LOS PASA A LA VISTA
        $eventos = $this->model->eventos();
        $this->view->eventos($eventos);
    }

    function pacientes(){   //TRAE DEL MODELO LOS PACIENTES Y LOS PASA A LA VISTA
        $lista = $this->model->lista();
        $this->view->lista($lista);
    }

    function registrar(){
        $evento = $this->view->registrar();
        die();
        $this->model->registrar($evento);
    }

}