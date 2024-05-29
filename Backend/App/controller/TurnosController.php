<?php
require_once 'SecuredController.php';
require_once 'Backend/App/view/TurnosView.php';
require_once 'Backend/App/model/Model.php';
class TurnosController extends SecuredController{
    private $model;
    private $view;

    function __construct(){
        parent::__construct();
        $this->model = new Model();
        $this->view = new TurnosView();
    }

    function Turnos(){
        $this->view->showTurnos();
    }
}