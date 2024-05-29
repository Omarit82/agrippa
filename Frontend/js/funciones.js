"use strict";
// inicializacion de documento

async function showPacientes(){
    const SELECT_PACIENTE = document.getElementById('dropPacientes');
    SELECT_PACIENTE.innerHTML="";
    let datos = await fetchPacientes();
    console.log(datos);
    // AGREGADO DE ID Y CLASE A TODOS LOS BOTONES DE PACIENTES. 
   for (let i=0; i<datos.length;i++){
        let newLi = document.createElement("li");
        let anchor = document.createElement("a");
        let contenido = document.createTextNode(datos[i].id_paciente+"- "+datos[i].apellido+", "+datos[i].nombre);
        anchor.appendChild(contenido);
        anchor.classList.add("dropdown-item","selectPaciente");
        anchor.setAttribute("id",datos[i].id_paciente);
        newLi.appendChild(anchor);
        SELECT_PACIENTE.appendChild(newLi);
    }
    //Escucho todos los botones creados!
    let botones = document.querySelectorAll('.selectPaciente');
    let selected = document.getElementById('campoPaciente');
    let sesiones = document.getElementById('sesiones');
    let remanentes = document.getElementById('sesionesRemanentes');
    for(let i = 0; i< botones.length ; i++){
        botones[i].addEventListener('click',()=>{
            let valor = botones[i].innerHTML;
            selected.value = valor;
            sesiones.value = datos[i].sesiones;
            remanentes.value = datos[i].ses_remanentes;
        })
    }
}
async function fetchPacientes(){
    try {
        const respuesta = await fetch('pacientes');
        if(respuesta.ok){
            let data = await respuesta.json();
            return data
        }
    } catch (error) {
        console.log(error);
        Swal.fire(
            'Aviso',
            'Error en la comunicacion con el servidor',
            'error'
        )
    }
}

async function agregarPaciente(envio){
    try {
        let pacientes = await fetch('agregarPaciente',{
            'method':'POST',
            'headers': {
                "Content-Type":"application/json; charset=utf-8"
            },
            'body': JSON.stringify(envio)
        })
        if(pacientes.ok){
            Swal.fire(
                'Aviso',
                'Paciente cargado con exito',
                'success'
            );
            }else{
                Swal.fire(
                    'Aviso',
                    'No pudo cargarse el paciente',
                    'success'
                );
            }
        }
    catch (error) {
        Swal.fire(
            'Aviso',
            'Erro en la comunicacion con la db',
            'error'
        );
    }
    ejecutaPacientes();
}

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
    ejecutaPacientes();
}
export { agregarTurno };
export { showPacientes };