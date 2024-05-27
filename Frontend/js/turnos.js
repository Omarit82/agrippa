document.addEventListener('DOMContentLoaded',function(){
    const arrayPacientes = document.querySelectorAll('.listado');
    const arrayTurnos = document.querySelectorAll('.turno');
    const campo = document.getElementById('cPaciente');
    const campoTurno = document.getElementById('campoTurno');
    arrayPacientes.forEach(paciente => {
        paciente.addEventListener('click',()=>{
            let valor= paciente.innerHTML;
            campo.value = valor;
        });
    });
    arrayTurnos.forEach(turno =>{
        turno.addEventListener('click',()=>{
            let valor =turno.innerHTML;
            campoTurno.value = valor;
        })
    });
    const formTurno = document.getElementById('turno');
    formTurno.addEventListener('submit',function(e){
        e.preventDefault();
        const FECHA = document.getElementById('fTurno').value;
        console.log(FECHA);
        const PACIENTE = document.getElementById('cPaciente').value;
        console.log(PACIENTE);
        let infoForm = new FormData(formTurno);
        console.log(infoForm.get('campoPaciente'));
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
        formTurno.reset();
        }
    });

    async function agregarTurno(envio){
        try {
            let registro = await fetch('registrar',{
                'method':'POST',
                'headers': {
                    "Content-Type":"application/json; charset=utf-8"
                },
                'body': JSON.stringify(envio)
            })
            if(registro.ok){
                Swal.fire(
                    'Aviso',
                    'Nuevo turno Cargado!',
                    'success'
                );
            }else{
                Swal.fire(
                    'Aviso',
                    'No pudo cargarse el turno',
                    'success'
                );
            }
        } catch (error) {
            Swal.fire(
                'Aviso',
                'Erro en la comunicacion con la db',
                'error'
            );
        }
    }
})