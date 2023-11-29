import React, { useState } from "react";

function FomularioRegistrarse() {
    const [data, setData] = React.useState(null);
    const [values, setValues] = React.useState({
      ID: "",
      Usuario: "",
      Nivel: "",
      estaEquipo: 0,
      esLider: 0,
      nombreEquipo: "",
    });

    function handleSubmit(evt) {
      evt.preventDefault();
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
        ID: values.ID,
        Usuario: values.Usuario,
        Nivel: values.Nivel,
        estaEquipo: values.estaEquipo,
        esLider: values.esLider,
        nombreEquipo: values.nombreEquipo,})
    };
    fetch('http://localhost:3001/Registrar', requestOptions)
      .then(response => response.json())
      .then(data => {
        setData(data.message);
        if ( "Ocupado" === data.message ){
          alert("El ID ya ha sido registrado");
        } else if("Registrado" === data.message){
          alert("Registrado con exito");
        }
      })
    };
    return (
        <form onSubmit={handleSubmit}>
        <label htmlFor="Usuario" >Usuario</label>
        <input
          id="Usuario"
          name="Usuario"
          type="text"
          value={values.Usuario}
          onChange={e => setValues({...values, Usuario: e.target.value})}
          required
        />
        <label htmlFor="ID" >Número Identificación</label>
        <input
          id="ID"
          name="ID"
          type="number"
          value={values.ID}
          onChange={e => setValues({...values, ID: e.target.value})}
          required
        />      
        <label for="Nivel" >Nivel de programación</label>
        <select id="Nivel" name="Nivel" required onChange={e => setValues({...values, Nivel: e.target.value})}>
          <option value="" disabled selected>Seleccione un nivel</option>
          <option value="Basica">Básica</option>
          <option value="Intermedio">Intermedio</option>
          <option value="Avanzado">Avanzado</option>
          <option value="Elite">Elite</option>          
        </select>
        <button type="submit">Registrarse</button>
      </form>
      
    );
}
export default FomularioRegistrarse