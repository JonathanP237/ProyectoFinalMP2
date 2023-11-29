import React, { useState } from "react";
import './Crear.css';

function FomularioCrearEquipo() {
    const [data, setData] = React.useState(null);
    const [values, setValues] = React.useState({
        ID_Lider: "",
        ID_Participante_1:"",
        ID_Participante_2:"",
        Nivel_Equipo: "",
        Nombre_Equipo:"",
        Competencia:"",
      });
    
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
    
    
    
      function handleSubmit(evt) {
        evt.preventDefault();
        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
          ID_Lider:values.ID_Lider,
          ID_Participante_1:values.ID_Participante_1,  
          ID_Participante_2:values.ID_Participante_2,
          Nivel_Equipo:values.Nivel_Equipo,
          Nombre_Equipo:values.Nombre_Equipo,
          Competencia:values.Competencia,
        })
      };
      fetch('http://localhost:3001/CrearEquipo', requestOptions)
        .then(response => response.json())
        .then((data) =>{ setData(data.message)
          if("No esta registrado" === data.message){
            alert("No se encontro un ID")
          }else if("Error" === data.message){
            alert("Estan ya registrados en otro equipo")
          }else if("Nivel Error" === data.message){
            alert("La competencia es de un nivel incompatible")
          }else if("Equipo creado con éxito" === data.message){
            alert("Equipo creado con exito")
          };
        })
      }
  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <h1>Registro de Equipo</h1>
      <label className="crear" htmlFor="ID_Lider">Número Identificación Lider</label>
      <input
        id="ID_Lider"
        name="ID_Lider"
        type="number"
        value={values.ID_Lider}
        onChange={e => setValues({...values, ID_Lider: e.target.value})}
        required/>

       <label className="crear" htmlFor="ID_Participante_1">Número Identificación Del Primer Participante</label>
        <input
        id="ID_Participante_1"
        name="ID_Participante_1"
        type="number"
        value={values.ID_Participante_1}
        onChange={e => setValues({...values, ID_Participante_1: e.target.value})}
        required/> 

        <label className="crear" htmlFor="ID_Participante_2">Número Identificación Del Segundo Participante</label>
        <input
        id="ID_Participante_2"
        name="ID_Participante_2"
        type="number"
        value={values.ID_Participante_2}
        onChange={e => setValues({...values, ID_Participante_2: e.target.value})}
        required/> 

        <label className="crear" htmlFor="Nombre_Equipo">Nombre Del Equipo</label>
        <input
        id="Nombre_Equipo"
        name="Nombre_Equipo"
        type="text"
        value={values.Nombre_Equipo}
        onChange={e => setValues({...values, Nombre_Equipo: e.target.value})}
        required/>

        <label className="crear" htmlFor="Competencia">Selecciona la competencia a la que quieres ingresar</label>
        <select id="Competencia" name="Competencia" required onChange={e => setValues({...values, Competencia: e.target.value})}>
        <option value="" disabled selected>Seleccione Competencia</option>
        {competencias.map((elemento, index) => (
            <option key={index} value={elemento.ID}> {elemento.Nombre} </option>
        ))}
        </select>

        <button type="submit">Crear Equipo</button>

        </div>
    </form>
  );
}

export default FomularioCrearEquipo