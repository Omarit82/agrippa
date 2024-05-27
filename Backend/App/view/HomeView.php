<?php

class HomeView{
    function __construct(){

    }

    function showHome(){
        
        require_once './Frontend/pages/header.html';
        //CODIGO QUE MUESTRA EL HOME
        ?>
        <h1 id="oggi" class="text-center"></h1>
        <div class="botonera d-flex flex-column align-content-center">
            <a href="calendar"><button class="btn">CALENDARIO</button></a>
            <a href="lista"><button class="btn">LISTA DE PACIENTES</button></a>
            <a href="turnos"><button class="btn">TURNOS</button></a>
            <a href="mensual"><button class="btn">RESUMEN MENSUAL</button></a>
        </div>
        <!-- Fin del offcanvas izquierdo -->
        <?php
        require_once './Frontend/pages/footerHome.html';
    }
}