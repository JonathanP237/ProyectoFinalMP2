import React, { useState } from "react";
function FormularioActualizarCompetencias() {
  const [data,setData] = React.useState(null)
  const [values, setValues] = React.useState({
    ID: "",
    Nombre: "",
    Categoria: "",
    Vigencia: "",
    estaVigente: 0,
    FechaInicio: "",
  }); 
  
  function handleSubmit(evt) {
    evt.preventDefault();
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
      ID: values.ID,
      Nombre: values.Nombre,
      Categoria: values.Categoria,
      FechaInicio: values.FechaInicio,
      Vigencia: values.Vigencia,
      estaVigente: values.estaVigente,
      })
  }; 
  fetch('http://localhost:3001/ActualizarCompetencia', requestOptions) // Crear url en el backend
    .then(response => response.json())
    .then(window.location="/Admin")
    .then((data) =>{ setData(data.message)
      if("Error de fecha" === data.message){
        alert("La fecha no es valida")
      }else if("Creado con exito" === data.message){
        alert("Actualizado con exito")
      }
   });
  }
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="ID">Ingrese El Número De Identificación De La Competencia Que Desea actualizar</label>
      <input
        id="ID"
        name="ID"
        type="number"
        value={values.ID}
        onChange={e => setValues({...values, ID: e.target.value})}
        required
      />
      <label htmlFor="Nombre">Nombre</label>
      <input
        id="Nombre"
        name="Nombre"
        type="text"
        value={values.Nombre}
        onChange={e => setValues({...values, Nombre: e.target.value})}
        required
      />
      <label htmlFor="FechaInicio">Ingrese la fecha de inicio (DD/MM/AA)</label>
      <input
        id="FechaInicio"
        name="FechaInicio"
        type="date"
        value={values.FechaInicio}
        onChange={e => setValues({...values, FechaInicio: e.target.value})}
        required
      />
      <label htmlFor="Vigencia">Ingrese la vigencia de la competencia en dias (Solo números)</label>
      <input
        id="Vigencia"
        name="Vigencia"
        type="date"
        value={values.Vigencia}
        onChange={e => setValues({...values, Vigencia: e.target.value})}
        required
      />
      <label htmlFor="Categoria">Selecciona la categoria de la competencia</label>
      <select id="Categoria" name="Categoria"   onChange={e => setValues({...values, Categoria: e.target.value})}>
        <option value="" disabled selected>Seleccione un nivel</option>
        <option value="Basica">Básica</option>
        <option value="Intermedio">Intermedio</option>
        <option value="Avanzado">Avanzado</option>
        <option value="Elite">Elite</option>
      </select>      
      <button type="submit">Actualizar</button>
    </form>
  );
}

export default FormularioActualizarCompetencias