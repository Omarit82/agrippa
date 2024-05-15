<?php

class CalendarView{
    public function __construct(){

    }

    function turnoComplete(){
        if(isset($_POST)){
            $datos = file_get_contents("php://input");
            $reg = json_decode($datos,true);
            return $reg;
        }
    }
    function eventos($eventos){
        header('Content-Type: application/json');
        echo json_encode($eventos);
    }

    function lista($lista){
        header('Content-Type: application/json');
        echo json_encode($lista);
    }

    function registrar(){
        if(isset($_POST)){
            $datos = file_get_contents("php://input");
            $reg = json_decode($datos,true);
            return $reg;
        }
    }
    
    function calendar(){   
        require_once './Frontend/pages/header.html'; 
        ?>
        <main class="pages-background">
            <div class="container-fluid p-0">
                    <!-- Botones de offcanvas -->
                <div class=" d-flex justify-content-between p-0">
                    <button class="btn-lateral-izq position-fixed bottom-50" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasLeft" aria-controls="offcanvasLeft">
                        <img src="./Frontend/assets/img/izquierda.png" alt=""class="imagenBoton">
                    </button>
                    <button class="btn-lateral-der  position-fixed bottom-50 end-0" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">
                        <img src="./Frontend/assets/img/derecha.png" alt=""class="imagenBoton">
                    </button>
                </div>
                <div class="row justify-content-center">
                    <!-- Insertamos la offcanvas izquierda CARGA DE TURNO-->
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
                                            <li><a class="dropdown-item turno" id="turno_1">1° 09:00 - 09:40</a></li>                                           
                                            <li><a class="dropdown-item turno" id="turno_2">2° 09:40 - 10:20</a></li> 
                                            <li><a class="dropdown-item turno" id="turno_3">3° 10:20 - 11:00</a></li>
                                            <li><a class="dropdown-item turno" id="turno_4">4° 11:00 - 11:40</a></li>
                                            <li><a class="dropdown-item turno" id="turno_5">5° 11:40 - 12:20</a></li>
                                            <li><a class="dropdown-item turno" id="turno_6">6° 12:20 - 13:00</a></li>
                                            <li><a class="dropdown-item turno" id="turno_7">7° 13:00 - 13:40</a></li>
                                            <li><a class="dropdown-item turno" id="turno_8">8° 13:40 - 14:20</a></li>
                                            <li><a class="dropdown-item turno" id="turno_9">9° 14:20 - 15:00</a></li>
                                        </ul>
                                        <input class="w-100 campoPaciente mt-2 text-center" type="text" name="campoTurno" id="campoTurno">
                                        <label for="sesiones" class=" botonUno btn w-100 mt-2">Sesiones Totales</label>
                                        <input class="mt-2 w-100 text-center campoPaciente" type="number" name="sesiones" id="sesiones"> 
                                        <label for="sesionesRemanentes" class="botonUno btn w-100 mt-2">Sesiones Remanentes</label>
                                        <input type="number"class="mt-2 w-100 text-center campoPaciente" name="sesionesRemanentes" id="sesionesRemanentes">
                                    </div>
                                </div>
                                <div class="mt-5 d-flex justify-content-around">
                                    <button class="btn registrar"data-bs-dismiss="offcanvas" id="canvasTurnoSubmit" type="submit">Registrar</button>
                                </div> 
                            </form> 
                        </div>
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
                                <form action="addPaciente" method="POST" id="formCanvasPaciente" class="d-flex flex-column col-11 m-auto pb-2">
                                    <label for="nombre" class="elementoForm m-2 text-center">NOMBRE</label>
                                    <input type="text" name="nombre" id="nombrePaciente" placeholder="  NOMBRE" class="m-2">
                                    <label for="apellido" class="elementoForm m-2 text-center">APELLIDO</label>
                                    <input type="text" name="apellido" id="apellidoPaciente" placeholder=" APELLIDO"class="m-2">
                                    <label for="dni" class="elementoForm m-2 text-center">DNI</label>
                                    <input type="number" name="dni" id="dniPaciente" placeholder="  DNI"class="m-2">
                                    <label for="telefono" class="elementoForm m-2 text-center">TELEFONO</label>
                                    <input type="number" name="telefono" id="telPaciente" placeholder="  TELEFONO"class="m-2">
                                    <label for="fechaNacimiento" class="elementoForm m-2 text-center">FECHA DE NACIMIENTO</label>
                                    <input type="date" name="fechaNacimiento" id="nacimientoPaciente" class="m-2">
                                    <label for="edad" class="elementoForm m-2 text-center">EDAD</label>
                                    <input type="number" name="edad" id="edadPaciente" placeholder="  EDAD"class="m-2">
                                    <label for="fechaIngreso" class="elementoForm m-2 text-center">FECHA DE INGRESO</label>
                                    <input type="date" name="fechaIngreso" id="ingresoPaciente" class="m-2">
                                    <label for="anamnesis" class="elementoForm m-2 text-center">ANAMNESIS</label>
                                    <textarea name="anamnesis" id="anamnesisPaciente" cols="30" rows="5" placeholder=" ANAMNESIS"class="m-2"></textarea>
                                    <label for="evaluacion" class="elementoForm m-2 text-center">EVALUACION</label>
                                    <textarea name="evaluacion" id="evaluacionPaciente" cols="30" rows="5" placeholder="   EVALUACION INICIAL"class="m-2"></textarea>
                                    <label for="objetivos" class="elementoForm m-2 text-center">OBJETIVOS</label>
                                    <textarea name="objetivos" id="objetivosPaciente" cols="30" rows="5" placeholder=" OBJETIVOS TERAPEUTICOS"class="m-2"></textarea>
                                    <label for="tratamiento" class="elementoForm m-2 text-center">TRATAMIENTO</label>
                                    <textarea name="tratamiento" id="tratamientoPaciente" cols="30" rows="5" placeholder=" TRATAMIENTO"class="m-2"></textarea>
                                    <label for="estudios" class="elementoForm m-2 text-center">ESTUDIOS</label>
                                    <input name="estudios" type="file" id="estudioPaciente"class="m-2">
                                    <label for="sesiones" class="elementoForm m-2 text-center">SESIONES</label>
                                    <input type="number" name="sesiones" id="sesionesPaciente" placeholder=" SESIONES"class="m-2">
                                    <button type="submit"data-bs-dismiss="offcanvas" class="btn btn-success col-6 m-auto">Cargar</button>
                                </form>
                            </div>
                        </div>
                    </div>
                    <!-- Fin del offcanvas derecho -->
                </div>
                <!-- Titulo  -->
                <div id="tituloFecha" class="text-center p-3 titulo">

                </div>
                <!-- show calendar -->
                <div class="col-10 col-md-8 pb-5 m-auto">
                    <div id='calendar'></div>
                </div>
                <!-- fin del showCalendar -->  
            </div>    
            <!-- Modal -->
            <div class="modal fade" id="eventoModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="eventoModal" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <form action="turnoComplete" method="POST" id="modalEventoForm">
                            <div class="modal-header">
                                <h3 class="modal-title fs-4 col-5">Paciente: </h3>
                                <input type="text" id="eventoModalTitle" name="eventoModalTitle" class="p-2 ms-2 col-5">
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <h4 class="fs-5" id="">Número de sesión :</h4>
                                <input type="text" id="eventModalSubtitle" name="eventModalSubtitle" class="p-2 ms-2">
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Ausente sin aviso</button>
                                <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Ausente con aviso</button>
                                <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Eliminar registro</button>
                                <button id="modalAsistio" type="submit" class="btn btn-success" data-bs-dismiss="modal">Asistio</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </main> <?php
        require_once './Frontend/pages/footer.html';
    }    
}
