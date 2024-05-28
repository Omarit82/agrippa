<?php

class TurnosView{
    function __construct(){

    }

    function showTurnos($lista){
        require_once './Frontend/pages/header.html';
        ?>
        <div class="offcanvas offcanvas-start" tabindex="-1" id="offcanvasLeft" aria-labelledby="offcanvasLeftLabel">
            <div class="offcanvas-header ">
                <h5 class="offcanvas-title text-center w-100 fw-bold" id="offcanvasLeftLabel">NUEVO TURNO</h5>
                <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div class="offcanvas-body h-75">
                <form method="POST" action="registrar" id="formCanvasTurno" class="nuevoTurno">
                    <div>
                        <div class="form-floating m-2 d-flex">
                            <label for="fechaTurno" class="form-label p-2">Fecha</label>
                            <input type="date" class="form-control" id="fechaTurno" name="fechaTurno">
                        </div>
                    </div>
                    <div class="form-floating mb-5">
                        <div class="dropdown m-2">
                            <button class="btn botonUno dropdown-toggle w-100" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Paciente
                            </button>
                            <ul class="dropdown-menu" id="dropPacientes">
                                
                            </ul>
                            <input class="w-100 mt-2 campoPaciente text-center" type="text" name="campoPaciente" id="campoPaciente">
                        </div>
                        <div class="dropdown m-2">
                            <button class="btn botonUno dropdown-toggle w-100" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Turno
                            </button>
                            <ul class="dropdown-menu">
                                <li><a class="dropdown-item turno" id="turno_1">1° 09:00 - 09:30</a></li>                                           
                                <li><a class="dropdown-item turno" id="turno_2">2° 09:30 - 10:00</a></li> 
                                <li><a class="dropdown-item turno" id="turno_3">3° 10:00 - 10:30</a></li>
                                <li><a class="dropdown-item turno" id="turno_4">4° 10:30 - 11:00</a></li>
                                <li><a class="dropdown-item turno" id="turno_5">5° 11:00 - 11:30</a></li>
                                <li><a class="dropdown-item turno" id="turno_6">6° 11:30 - 12:00</a></li>
                                <li><a class="dropdown-item turno" id="turno_7">7° 12:00 - 12:30</a></li>
                                <li><a class="dropdown-item turno" id="turno_8">8° 12:30 - 13:00</a></li>
                                <li><a class="dropdown-item turno" id="turno_9">9° 13:00 - 13:30</a></li>
                                <li><a class="dropdown-item turno" id="turno_10">10° 13:30 - 14:00</a></li>
                                <li><a class="dropdown-item turno" id="turno_11">11° 14:00 - 14:30</a></li>
                                <li><a class="dropdown-item turno" id="turno_12">12° 14:30 - 15:00</a></li>
                                <li><a class="dropdown-item turno" id="turno_13">13° 15:00 - 15:30</a></li>
                                <li><a class="dropdown-item turno" id="turno_14">14° 15:30 - 16:00</a></li>
                            </ul>
                            <input class="w-100 campoPaciente mt-2 text-center" type="text" name="campoTurno" id="campoTurno">
                            <label for="sesiones" class=" botonUno btn w-100 mt-2 d-none">Sesiones Totales</label>
                            <input class="mt-2 w-100 text-center campoPaciente d-none" type="number" name="sesiones" id="sesiones"> 
                            <label for="sesionesRemanentes" class="botonUno btn w-100 mt-2 d-none">Sesiones Remanentes</label>
                            <input type="number"class="mt-2 w-100 text-center campoPaciente d-none" name="sesionesRemanentes" id="sesionesRemanentes">
                        </div>
                    </div>
                    <div class="mt-5 d-flex justify-content-around">
                        <button class="btn registrar"data-bs-dismiss="offcanvas" id="canvasTurnoSubmit" type="submit">Registrar</button>
                    </div> 
                </form> 
            </div>
        </div>
        <?php
        require_once './Frontend/pages/footerTurnos.html';
    }
}