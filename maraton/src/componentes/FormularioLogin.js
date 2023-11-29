import React, { useState } from "react";
import './Home.css';

function FomularioLogin() {
  const [data, setData] = React.useState(null);
  const [values, setValues] = React.useState({
    UsuarioLogin: "",
    IDLogin: "",
  }); 


  function handleSubmit(evt) {
    evt.preventDefault();
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
      ID: values.IDLogin,
      Usuario: values.UsuarioLogin,})
  };
  fetch('http://localhost:3001/Login', requestOptions)
    .then(response => response.json())
    .then( (data) => {
      setData(data.message)
      if ("Participante" === data.message){
        window.location = "/ID";
      }else if ("Administrador" === data.message){
        window.location = "/Admin";
      }else if ("No existe el registro" === data.message){
        alert("No esta registrado")
      };
    });
    }

  return (
      <form onSubmit={handleSubmit}>
      <label htmlFor="IDLogin" >Identificación</label>
      <input
        id="IDLogin"
        name="IDLogin"
        type="number"
        value={values.IDLogin}
        onChange={e => setValues({...values, IDLogin: e.target.value})}
        required
      />
      <button type="submit">Iniciar Sesión</button>
    </form>
  );
}

export default FomularioLogin