<?php
include_once 'database.php';
function showPacientes(){
    #Muestra el listado de pacientes y CRUD
    require_once './pages/header.html';
    $db = connect();
    $sentencia = $db->prepare( "select * from paciente");
    $sentencia->execute();
    $pacientes = $sentencia->fetchAll(PDO::FETCH_OBJ);
    ?>
    <main>
        <div class="container">
            <?php
            foreach ($pacientes as $paciente) { ?>
                <p class="d-inline-flex gap-1">
                    <button class="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target="#collapse" aria-expanded="false" aria-controls="collapseExample">
                        <?php echo $paciente->apellido.', '.$paciente->nombre; ?>
                    </button>
                </p>
                <div class="collapse" id="collapse">
                    <div class="card card-body">
                        <ul class="list-group">
                            <li class="list-group-item">DNI: <?php echo $paciente->dni ?></li>
                            <li class="list-group-item">TELEFONO: <?php echo $paciente->telefono ?></li>
                            <li class="list-group-item">FECHA DE NACIMIENTO: <?php echo $paciente->fecha_nacimiento ?></li>
                            <li class="list-group-item">EDAD: <?php echo $paciente->edad ?></li>
                            <li class="list-group-item">FECHA DE INGRESO: <?php echo $paciente->fecha_ingreso ?></li>
                            <li class="list-group-item">ANAMNESIS <?php echo $paciente->anamnesis ?></li>
                            <li class="list-group-item">EVALUACION INICIAL: <?php echo $paciente->evaluacion_inicial ?></li>
                            <li class="list-group-item">OBJETIVOS TERAPEUTICOS <?php echo $paciente->objetivos_terapeuticos ?></li>
                            <li class="list-group-item">TRATAMIENTO <?php echo $paciente->tratamiento ?></li>
                            <li class="list-group-item">ESTUDIOS: <?php echo $paciente->estudios ?></li>
                            <li class="list-group-item">SESIONES: <?php echo $paciente->sesiones ?></li>
                        </ul>
                    </div>
                </div>
            <?php
            } ?>
        </div>
    </main>
    <?php
    require_once './pages/footer.html';
}
