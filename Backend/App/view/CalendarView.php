<?php

class CalendarView{
    public function __construct(){

    }

  
    function calendar($lista){
        require_once './Frontend/pages/header.html'; 
        ?>
        <main>
            <div class="container-fluid">
                <div class="row justify-content-center ">
                    <div class="col-10 col-md-8 p-5">
                        <div id='calendar'></div>
                    </div>
                </div>
                <div class="modal fade" id="myModal" data-backdrop="static" data-keyboard="false" tabindex="-1" aria-labelledby="staticBackdrop" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header bg-info">
                                <h5 class="modal-title" id="titulo"></h5>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">
                                    </button>
                                </div>
                                <form action="" id="formModalPaciente">
                                    <div class="modal-body">
                                        <div class="form-floating mb-3">
                                            <label for="fechaTurno" class="form-label p-2">Fecha</label>
                                            <input type="date" class="form-control" id="fechaTurno">
                                        </div>
                                    </div>
                                    <div class="modal-body">
                                        <div class="form-floating mb-3">
                                            <div class="dropdown">
                                                <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                    Paciente
                                                </button>
                                                <ul class="dropdown-menu">
                                                    <?php foreach($lista as $item){
                                                        echo' <li><a class="dropdown-item selectPaciente" id="'.$item->id_paciente.'">'.$item->apellido.', '.$item->nombre.'</a></li>';
                                                    }?>
                                                </ul>
                                                <input type="text" name="campoPaciente" id="campoPaciente" disabled>
                                            </div>
                                            <div class="dropdown">
                                                <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                    Turno
                                                </button>
                                                <ul class="dropdown-menu">
                                                    <li><a class="dropdown-item turno" id="">1° 9:00 - 9:40</a></li>
                                                    <li><a class="dropdown-item turno" id="">2° 9:40 - 10:20</a></li>
                                                    <li><a class="dropdown-item turno" id="">3° 10:20 - 11:00</a></li>
                                                    <li><a class="dropdown-item turno" id="">4° 11:00 - 11:40</a></li>
                                                    <li><a class="dropdown-item turno" id="">5° 11:40 - 12:20</a></li>
                                                    <li><a class="dropdown-item turno" id="">6° 12:20 - 13:00</a></li>
                                                    <li><a class="dropdown-item turno" id="">7° 13:00 - 13:40</a></li>
                                                    <li><a class="dropdown-item turno" id="">8° 13:40 - 14:20</a></li>
                                                    <li><a class="dropdown-item turno" id="">9° 14:20 - 15:00</a></li>
                                                </ul>
                                                <input type="text" name="campoTurno" id="campoTurno" disabled>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="modal-footer">
                                        <button class="btn btn-warning">Cancelar</button>
                                        <button class="btn btn-danger">Eliminar</button>
                                        <button class="btn btn-info" id="btn-action" type="submit">Registrar</button>
                                    </div>    
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>          
        </main> <?php
        require_once './Frontend/pages/footer.html';
    }    
}
