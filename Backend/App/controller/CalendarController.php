<?php
require_once 'Backend/App/model/Model.php';
require_once 'Backend/App/view/CalendarView.php';
class CalendarController{
    private $model;
    private $view;

    public function __construct(){
        $this->model = new Model();
        $this->view = new CalendarView();
    }

    function calendar(){
        $lista = $this->model->lista();
        $this->view->calendar($lista);
    }

}