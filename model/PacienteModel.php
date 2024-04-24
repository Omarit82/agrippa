<?php

class PacienteModel{
    private $db;  
    function __construct(){
        $this->db = $this->connect();
    }
    private function connect(){
        return new PDO('mysql:host=localhost;dbname=agrippa;charset=utf8', 'root', '');
    }
    function lista(){
        $sentencia = $this->db->prepare( "select * from paciente");
        $sentencia->execute();
        return $sentencia->fetchAll(PDO::FETCH_OBJ);
    }
}