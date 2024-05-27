<?php
require_once 'SecuredController.php';
require_once 'Backend/App/view/HomeView.php';
class HomeController extends SecuredController{
    private $view;

    function __construct(){
        parent::__construct();
        $this->view = new HomeView();
    }

    function home(){
        $this->view->showHome();
    }

}