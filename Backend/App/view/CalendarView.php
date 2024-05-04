<?php

class CalendarView{
    public function __construct(){

    }

  
    function calendar($lista,$turnos){   
        require_once './Frontend/pages/header.html'; 
        ?>
        <main>
            <div class="d-none" id="turnos">
                <?php 
                    $json_turnos = json_encode($turnos);
                    echo $json_turnos;
                ?>
            </div>
            <div class="d-none" id="lista">
                <?php 
                    $json = json_encode($lista);
                    echo $json;
                ?>
            </div>
            <div class="container-fluid">
                <div class="row justify-content-center">
                    <!-- Botones de offcanvas -->
                    <div class="mt-2 d-flex justify-content-between p-0">
                        <button class="btn btn-primary " type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasLeft" aria-controls="offcanvasLeft">
                            >>
                        </button>
                        <button class="btn btn-primary " type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">
                            <<
                        </button>
                    </div>
                    <!-- Insertamos la offcanvas izquierda CARGA DE TURNO-->
                    <div class="offcanvas offcanvas-start" tabindex="-1" id="offcanvasLeft" aria-labelledby="offcanvasLeftLabel">
                        <div class="offcanvas-header">
                            <h5 class="offcanvas-title" id="offcanvasLeftLabel">Carga de Turno</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                        </div>
                        <form action="post" id="formCanvasTurno">
                            <div class="offcanvas-body">
                                <div>
                                    <div class="form-floating mb-3">
                                        <label for="fechaTurno" class="form-label p-2">Fecha</label>
                                        <input type="date" class="form-control" id="fechaTurno">
                                    </div>
                                </div>
                                <div class="form-floating mb-3">
                                    <div class="dropdown m-2">
                                        <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            Paciente
                                        </button>
                                        <ul class="dropdown-menu">
                                            <?php foreach($lista as $item){
                                                echo' <li><a class="dropdown-item selectPaciente" id="'.$item->id_paciente.'">'.$item->apellido.', '.$item->nombre.'('.$item->sesiones.')</a></li>';
                                            }?>
                                        </ul>
                                        <input type="text" name="campoPaciente" id="campoPaciente" disabled>
                                    </div>
                                    <div class="dropdown m-2">
                                        <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            Turno
                                        </button>
                                        <ul class="dropdown-menu">
                                            <li><a class="dropdown-item turno" id="turno_1">1° 9:00 - 9:40</a></li>
                                            <li><a class="dropdown-item turno" id="turno_2">2° 9:40 - 10:20</a></li>
                                            <li><a class="dropdown-item turno" id="turno_3">3° 10:20 - 11:00</a></li>
                                            <li><a class="dropdown-item turno" id="turno_4">4° 11:00 - 11:40</a></li>
                                            <li><a class="dropdown-item turno" id="turno_5">5° 11:40 - 12:20</a></li>
                                            <li><a class="dropdown-item turno" id="turno_6">6° 12:20 - 13:00</a></li>
                                            <li><a class="dropdown-item turno" id="turno_7">7° 13:00 - 13:40</a></li>
                                            <li><a class="dropdown-item turno" id="turno_8">8° 13:40 - 14:20</a></li>
                                            <li><a class="dropdown-item turno" id="turno_9">9° 14:20 - 15:00</a></li>
                                        </ul>
                                        <input type="text" name="campoTurno" id="campoTurno" disabled>
                                        <input class="m-2" type="text" name="sesiones" id="sesiones" disabled value="<?php $item->sesiones ?>"> 
                                    </div>
                                </div>
                            </div>
                            <div class="mb-5 d-flex justify-content-around">
                                <button class="btn btn-secondary" data-bs-dismiss="offcanvas">Cancelar</button>
                                <button class="btn btn-danger">Eliminar</button>
                                <button class="btn btn-success" id="canvasTurnoSubmit" type="submit">Registrar</button>
                            </div> 
                        </form> 
                    </div>
                    <!-- Fin del offcanvas izquierdo -->
                    <!-- Insertamos la offcanvas derecho CARGA DE PACIENTE -->
                    <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
                        <div class="offcanvas-header">
                            <h5 class="offcanvas-title" id="offcanvasRightLabel">INGRESO DE NUEVO PACIENTE</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                        </div>
                        <div class="offcanvas-body p-0">
                            <div class="container p-0">
                                <form action="addPaciente" method="post" class="d-flex flex-column col-11 m-auto pb-2">
                                    <input type="text" name="nombre" id="nombrePaciente" placeholder="  NOMBRE" class="m-2">
                                    <input type="text" name="apellido" id="apellidoPaciente" placeholder=" APELLIDO"class="m-2">
                                    <input type="number" name="dni" id="dniPaciente" placeholder="  DNI"class="m-2">
                                    <input type="number" name="telefono" id="telPaciente" placeholder="  TELEFONO"class="m-2">
                                    <input type="date" name="fechaNacimiento" id="nacimientoPaciente" class="m-2">
                                    <input type="number" name="edad" id="edadPaciente" placeholder="  EDAD"class="m-2">
                                    <input type="date" name="fechaIngreso" id="ingresoPaciente" class="m-2">
                                    <textarea name="anamnesis" id="anamnesisPaciente" cols="30" rows="10" placeholder=" ANAMNESIS"class="m-2"></textarea>
                                    <textarea name="evaluacion" id="evaluacionPaciente" cols="30" rows="10" placeholder="   EVALUACION INICIAL"class="m-2"></textarea>
                                    <textarea name="objetivos" id="objetivosPaciente" cols="30" rows="10" placeholder=" OBJETIVOS TERAPEUTICOS"class="m-2"></textarea>
                                    <textarea name="tratamiento" id="tratamientoPaciente" cols="30" rows="10" placeholder=" TRATAMIENTO"class="m-2"></textarea>
                                    <input name="estudios" type="file" id="estudioPaciente"class="m-2">
                                    <input type="number" name="sesiones" id="sesionesPaciente" placeholder=" SESIONES"class="m-2">
                                    <button type="submit" class="btn btn-success col-6 m-auto">Cargar</button>
                                </form>
                            </div>
                        </div>
                    </div>
                    <!-- Fin del offcanvas derecho -->
                </div>
                <!-- show calendar -->
                <div class="col-10 col-md-8 p-5 m-auto">
                        <div id='calendar'></div>
                </div>
                <!-- fin del showCalendar -->  
            </div>          
        </main> <?php
        require_once './Frontend/pages/footer.html';
    }    
}
