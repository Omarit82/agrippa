<?php

class PacienteView{
    function __construct(){
        
    }
    function login(){
        require_once '../Frontend/pages/headerLogin.html';
        ?>
        <main>
            <div class="container-fluid row mt-5 mb-5">
                <form action="post" method="" class="card col-6 m-auto">
                    <h1 class="text-center">Login</h1>
                    <div class="mb-3 pt-5">
                        <label for="inputLogin" class="form-label">Email</label>
                        <input type="email" class="form-control" id="inputLogin" placeholder="nombre@ejemplo.com">
                    </div>
                    <div class="mb-3 pb-5">
                        <label for="pass" class="form-label">Password</label>
                        <input type="password" class="form-control" id="pass" placeholder="Su Password">
                    </div>
                    <div class="botones m-2 d-flex justify-content-center">
                        <button class="btn col-5 m-auto" type="submit">Ingresar</button>
                    </div>
                </form>
            </div>
        </main>
        <?php
        include_once './pages/footer.html';
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
                        <a href="addPaciente">Ingresar Nuevo</a>
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
    function calendar(){
        require_once './Frontend/pages/header.html'; 
        ?>
        <main>
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
                            <form action="">
                                <div class="modal-body">
                                    <div class="form-floating mb-3">
                                        <label for="start" class="form-label p-2">Fecha</label>
                                        <input type="date" class="form-control" id="start">
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
        </main> <?php
         require_once './Frontend/pages/footer.html';
    }

}