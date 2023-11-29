import React, { useState } from "react";

function ConsultarEquipos(){

    const [equipos,setEquipos] = React.useState([])
    const [competencias,setCompetencias] = React.useState({
        ID :"",
        Nombre: "",
      }); 
 
    React.useEffect(() => {
        fetch('http://localhost:3001/ObtenerEquipos') 
          .then(res => res.json())
          .then(data => {
            if (typeof data === 'object' && data !== null) {
              const array = Object.values(data);
              setEquipos(array); 
            } else {
              console.error('Data is not an object:', data);
            }
          })
          .catch((error) => {
            console.error('Error fetching data:', error);
          });
        }, []);

    React.useEffect(() => {
    fetch('http://localhost:3001/ObtenerCompetencias')
      .then(res => res.json())
      .then(data => {
        if (typeof data === 'object' && data !== null) {
          const array = Object.values(data);
          setCompetencias(array);
        } else {
          console.error('Data is not an object:', data);
        }
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
    }, []);

    for (var i = 0; i < equipos.length; i++) {
      for(var j=0;j<competencias.length;j++){
          if(equipos[i].ID_Competencia===competencias[j].ID){
              equipos[i].ID_Competencia=competencias[j].Nombre
           }
      }
    }
      return (
        <div  className="tabla2">
        <table>
        <thead>
          <tr>
            <th>ID  </th>
            <th>Nombre  </th>
            <th>Clasificación  </th>
            <th>ID Lider  </th>
            <th>ID Participante 1  </th>
            <th>ID Participante 2  </th>
            <th>Competencia en la que participan  </th>
          </tr>
        </thead>
        <tbody>
          {equipos.map((elemento, index) => (
            <tr body={index}>
              <td>{elemento.ID}</td>
              <td>{elemento.Nombre}</td>
              <td>{elemento.Clasificacion}</td>
              <td>{elemento.ID_participante1}</td>
              <td>{elemento.ID_participante2}</td>
              <td>{elemento.ID_participante3}</td>
              <td>{elemento.ID_Competencia}</td>
            </tr>
          ))}
        </tbody>
      </table>
            </div>
          );
}
export default ConsultarEquipos