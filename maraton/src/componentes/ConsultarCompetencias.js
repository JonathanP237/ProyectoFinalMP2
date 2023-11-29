import React, { useState } from "react";

function ConsultarCompetencias(){

    const [competencias,setCompetencias] = React.useState([])

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

        return (
        <div  className="tabla">
        <table>
        <thead>
          <tr>
            <th>ID  </th>
            <th>Nombre  </th>
            <th>Categoria  </th>
            <th>Fecha Inicio  </th>
            <th>Fecha Final  </th>
          </tr>
        </thead>
        <tbody>
          {competencias.map((elemento, index) => (
            <tr body={index}>
              <td>{elemento.ID}</td>
              <td>{elemento.Nombre}</td>
              <td>{elemento.Categoria}</td>
              <td>{elemento.FechaInicio}</td>
              <td>{elemento.FechaFinal}</td>
            </tr>
          ))}
        </tbody>
      </table>
        </div>
    );
}
export default ConsultarCompetencias