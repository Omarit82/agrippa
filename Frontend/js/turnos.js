import { agregarTurno, showPacientes } from "./funciones.js";
import { refetch } from "./calendario.js";

document.addEventListener('DOMContentLoaded',function(){
    "use strict";
    // inicializacion de documento
    showPacientes();
    let formNuevoTurno = document.getElementById('formCanvasTurno');
   
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
        refetch();
        //limpio el fomulario y cierro
        formNuevoTurno.reset();
        }
    });
})