<?php

class ModelPaciente{
    private $db;
    
    function __construct(){

    }

    function connect(){
        $this->db = new PDO('mysql:host=localhost;dbname=agrippa;charset=utf8', 'root', '');
    }

    function lista(){
        $sentencia = $this->db->prepare( "select * from paciente");
        $sentencia->execute();
        $pacientes = $sentencia->fetchAll(PDO::FETCH_OBJ);
    }
}