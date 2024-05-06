<?php

class PacienteView{
    function __construct(){
        
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