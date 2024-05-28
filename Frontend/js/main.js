document.addEventListener('DOMContentLoaded', function() {
    "use strict";
    // inicializacion de documento
    
    /***  ----------VARIABLES------------ ***/
    let turnosHorarios = document.querySelectorAll(".turno"); // Array con todos los posibles turnos
   
    // INICIO DE LOS COMPONENTES DE BOOSTSTRAP
    
    
    // FORMULARIOS DE LOS CANVAS
    let formNuevoTurno = document.getElementById('formCanvasTurno');
    let formNuevoPaciente = document.getElementById('formCanvasPaciente');
    for (let i = 0 ; i<turnosHorarios.length ; i++){
        turnosHorarios[i].addEventListener('click',()=>{
            let trn = turnosHorarios[i].innerHTML;
            turnoElegido.value = trn;
        })
    }
    let listaPaciente = document.querySelectorAll('.listaPaciente');
    for(let i=0;i<listaPaciente.length;i++){
        listaPaciente[i].addEventListener('click',()=>{
            
        })
    }
       
    
    //----------------FORMULARIO NUEVO TURNO-----------------//
    formNuevoTurno.addEventListener('submit',function(e){
        e.preventDefault();
        const FECHA = document.getElementById('fechaTurno').value;
        const PACIENTE = document.getElementById('campoPaciente').value;
        let infoForm = new FormData(formNuevoTurno);
        //Tomamos el id del paciente
        let id_pac = infoForm.get('campoPaciente');
        let new_id_pac = id_pac.split("- ");
        let id = new_id_pac[0];
        let nombre = (new_id_pac[1].split(' | '))[0];
        //Tomamos el horario del turno
        let num = infoForm.get('campoTurno').split('° ');
        let turno = num[1];
        let hora = turno.split(" - ");
        let inicio = hora[0];
        let final = hora[1];
        let fechaInicio = FECHA+"T"+inicio;
        let fechaFinal = FECHA+"T"+final;
        //Tomamos las sesiones remanentes y las totales
        let remanentes = document.getElementById('sesionesRemanentes').value; 
        let totales = document.getElementById('sesiones').value;
        // Creamos un objeto para pasarle - debo descontar una sesion!
        let envio = {
            "fechaInicio":fechaInicio,
            "fechaFinal":fechaFinal,
            "id": id, //id del paciente
            "name":nombre,
            "inicio": inicio,
            "final": final,
            "remanentes": remanentes-1,
            "numeroTurno": totales - remanentes + 1,
        }
        if(FECHA =='' || PACIENTE ==''){
            Swal.fire(
                'Aviso',
                'Todos los campos son necesarios',
                'warning'
            )
        }else if(remanentes == 0){
            Swal.fire(
                'Aviso',
                'El paciente ya realizó todas sus sesiones',
                'error'
            )
        }else{
        agregarTurno(envio);
        //limpio el fomulario y cierro
        formNuevoTurno.reset();
        }
    });
    //--------------FORMULARIO NUEVO PACIENTE----------------//
    formNuevoPaciente.addEventListener('submit',function(e){
        e.preventDefault();
        let infoForm = new FormData(formNuevoPaciente);
        // Creamos un objeto para pasarle
        let ses = infoForm.get('sesiones');
        if(ses == 0){
            ses=1;
        }
        let dni = infoForm.get('dni');
        if(dni == ""){
            dni=0;
        }
        let telefono = infoForm.get('telefono');
        if(telefono == ""){
            telefono = 0;
        }
        let nacimiento = infoForm.get('fechaNacimiento');
        if(nacimiento ==''){
            nacimiento = '1900-1-1';
        }
        let edad = infoForm.get('edad');
        if(edad == ""){
            edad=0;
        }
        let ingreso = infoForm.get('fechaIngreso');
        if(ingreso ==''){
            ingreso = '1900-1-1';
        }
        let envio = {
            "nombre":infoForm.get('nombre'),
            "apellido":infoForm.get('apellido'), //fecha
            "dni": infoForm.get('dni'), //id del paciente
            "telefono":infoForm.get('telefono'),
            "fechaNacimiento": infoForm.get('fechaNacimiento'),
            "edad": infoForm.get('edad'),
            "fechaIngreso": infoForm.get('fechaIngreso'),
            "anamnesis": infoForm.get('anamnesis'),
            "evaluacion": infoForm.get('evaluacion'),
            "objetivos": infoForm.get('objetivos'),
            "tratamiento": infoForm.get('tratamiento'),
            "estudios": infoForm.get('estudios'),
            "sesiones": ses,
        }
        agregarPaciente(envio);
        formNuevoPaciente.reset();
    })

    
});

