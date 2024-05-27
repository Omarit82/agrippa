<?php

class PacienteView{
    function __construct(){
        
    }

    function lista($pacientes){
        require_once './Frontend/pages/header.html';   
        ?>
        <main class="pages-background vh-100">
            <h1 class="text-center">Pacientes</h1>
            <h2 class="m-5 fs-2 card ps-5 pb-2 pt-2">Filtros</h2>
            <div class="container m-5 ">
                <?php
                foreach ($pacientes as $paciente) { ?>
                    <div class="d-inline-flex gap-1 botones mb-2">
                        <button class="btn btn-primary listaPaciente" type="button" data-bs-toggle="collapse" data-bs-target= <?php echo'"#collapse'.$paciente->id_paciente.'"' ?>aria-expanded="false" aria-controls="collapseExample">
                            <?php echo $paciente->apellido.', '.$paciente->nombre; ?>
                        </button>
                    </div>
                    <div class="collapse mb-2 row card card-body" id=<?php echo'"collapse'.$paciente->id_paciente.'"' ?>>
                        <div class="mb-2 col-5">
                            <ul class="list-group m-1">
                                <li class="list-group-item d-flex justify-content-between"><p class="m-0">DNI:</p> <?php echo '<p class="m-0">'.$paciente->dni.'</p>'?></li>
                                <li class="list-group-item d-flex justify-content-between"><p>TELEFONO:</p> <?php echo '<p>'.$paciente->telefono.'</p>' ?></li>
                                <li class="list-group-item d-flex justify-content-between"><p>FECHA DE NACIMIENTO:</p> <?php echo '<p>'.$paciente->fecha_nacimiento.'</p>' ?></li>
                                <li class="list-group-item d-flex justify-content-between"><p>EDAD:</p> <?php echo '<p>'.$paciente->edad.'</p>' ?></li>
                                <li class="list-group-item d-flex justify-content-between"><p>FECHA DE INGRESO:</p> <?php echo '<p>'.$paciente->fecha_ingreso.'</p>' ?></li>
                            </ul>
                        </div>
                        <div class="mb-2 col-5">
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
}