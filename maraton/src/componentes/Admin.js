import React from 'react'
import FormularioCrearCompetencia from './FormularioCrearCompetencia'
import ConsultarEquipos from './ConsultarEquipos'
import EliminarEquipo from './EliminarEquipo'
import ConsultarCompetencias from './ConsultarCompetencias'
import EliminarCompetencia from './EliminarCompetencia'
import FormularioActualizarCompetencias from './FormularioActualizarCompetencias'

function Admin(){
    return(
        <section className="Admin">
               <div className="Izquierdo">
                    <h2>Crear competencia</h2>
                    <FormularioCrearCompetencia />
                    <h2>Competencias Actuales:</h2>
                    <ConsultarCompetencias />
                    <h2>Eliminar competencia</h2>
                    <EliminarCompetencia/>
                </div>
                <div className="Derecho">
                    <h2>Actualizar Competencia</h2>
                    <FormularioActualizarCompetencias/>
                    <h2>Equipos Registrados</h2>
                    <ConsultarEquipos />
                    <h2>Eliminar Equipos</h2>
                    <EliminarEquipo />
                </div>
        </section>
    )
}
export default Admin