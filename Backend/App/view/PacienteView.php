<?php

class PacienteView{
    function __construct(){
        
    }
    
    function home(){
        require_once './Frontend/pages/header.html';
        ?>
        <main>
            <h1 class="text-center">HOME</h1>
            <div class="container col-10 d-flex justify-content-between">
                <div class="col-5 card m-2 botones">
                    <h3 class="text-center">Calendario</h3>
                    <button class="btn btn-primary col-5 m-auto mb-2" type="button">
                        <a href="calendar">Ver Calendario</a>
                    </button>
                    <button class="btn btn-primary col-5 m-auto mb-2" type="button">
                        <a href="calendar">Agregar al calendario</a>
                    </button>
                </div>
                <div class="col-5 card m-2 botones">
                    <h3 class="text-center">Pacientes</h3>
                    <button class="btn btn-primary col-5 m-auto mb-2" type="button">
                        <a href="formPaciente">Ingresar Nuevo</a>
                    </button>
                    <button class="btn btn-primary col-5 m-auto mb-2" type="button">
                        <a href="lista">Listado</a>
                    </button>
                </div>
            </div>
        </main>
        <?php
        include_once './Frontend/pages/footer.html';
    }
    function lista($pacientes){
        require_once './Frontend/pages/header.html';   
        ?>
        <main>
            <h1 class="text-center">Pacientes</h1>
            <h2 class="m-5 fs-2 card ps-5 pb-2 pt-2">Filtros</h2>
            <div class="container m-5 ">
                <?php
                foreach ($pacientes as $paciente) { ?>
                    <div class="d-inline-flex gap-1 botones mb-2">
                        <button class="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target= <?php echo'"#collapse'.$paciente->id_paciente.'"' ?>aria-expanded="false" aria-controls="collapseExample">
                            <?php echo $paciente->apellido.', '.$paciente->nombre; ?>
                        </button>
                    </div>
                    <div class="collapse mb-2 row" id=<?php echo'"collapse'.$paciente->id_paciente.'"' ?>>
                        <div class="card card-body mb-2 col-5">
                            <ul class="list-group m-1">
                                <li class="list-group-item d-flex justify-content-between"><p class="m-0">DNI:</p> <?php echo '<p class="m-0">'.$paciente->dni.'</p>'?></li>
                                <li class="list-group-item d-flex justify-content-between"><p>TELEFONO:</p> <?php echo '<p>'.$paciente->telefono.'</p>' ?></li>
                                <li class="list-group-item d-flex justify-content-between"><p>FECHA DE NACIMIENTO:</p> <?php echo '<p>'.$paciente->fecha_nacimiento.'</p>' ?></li>
                                <li class="list-group-item d-flex justify-content-between"><p>EDAD:</p> <?php echo '<p>'.$paciente->edad.'</p>' ?></li>
                                <li class="list-group-item d-flex justify-content-between"><p>FECHA DE INGRESO:</p> <?php echo '<p>'.$paciente->fecha_ingreso.'</p>' ?></li>
                            </ul>
                        </div>
                        <div class="card card-body mb-2 col-5">
                            <ul class="list-group m-1">
                                <li class="list-group-item d-flex justify-content-between"><p>ANAMNESIS:</p> <?php echo '<p>'.$paciente->anamnesis.'</p>' ?></li>
                                <li class="list-group-item d-flex justify-content-between"><p>EVALUACION INICIAL:</p> <?php echo '<p>'.$paciente->evaluacion_inicial.'</p>' ?></li>
                                <li class="list-group-item d-flex justify-content-between"><p>OBJETIVOS TERAPEUTICOS:</p> <?php echo '<p>'.$paciente->objetivos_terapeuticos.'</p>' ?></li>
                                <li class="list-group-item d-flex justify-content-between"><p>TRATAMIENTO:</p> <?php echo '<p>'.$paciente->tratamiento.'</p>' ?></li>
                                <li class="list-group-item d-flex justify-content-between"><p>ESTUDIOS:</p> <?php echo '<p>'.$paciente->estudios.'</p>' ?></li>
                                <li class="list-group-item d-flex justify-content-between"><p>SESIONES:</p> <?php echo '<p>'.$paciente->sesiones.'</p>' ?></li>
                            </ul>
                        </div>
                    </div>
                    <?php
                } ?>
            </div>
        </main>
        <?php
        require_once './Frontend/pages/footer.html';
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
                                                        echo' <li><a class="dropdown-item" id="'.$item->id_paciente.'">'.$item->apellido.', '.$item->nombre.'</a></li>';
                                                    }?>
                                                </ul>
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

    function formPaciente(){
        require_once './Frontend/pages/header.html'; ?>
        <div class="container">
            <h2 class="text-center">INGRESO DE NUEVO PACIENTE</h2>
            <form action="addPaciente" method="post" class="d-flex flex-column col-8 m-auto">
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
                <button type="submit" class="btn btn-success col-3 m-auto">Cargar</button>
            </form>
        </div>
        <?php
        require_once './Frontend/pages/footer.html';
    }

}