import React from 'react'
function EliminarEquipo(){
    const [data, setData] = React.useState(null)
    const [values, setValues] = React.useState({
        ID: "",
      });      
      function handleSubmit(evt) {
        evt.preventDefault();
        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
          ID: values.ID,})
      };
      fetch('http://localhost:3001/EliminarCompetencia', requestOptions)
        .then(response => response.json())
        .then(window.location = '/Admin')
        .then(data =>{setData(data.message)
        if ("Error al eliminar" === data.message){
          alert("La competencia no existe")
        }else if("Exito al eliminar" === data.message){
          alert("Se elimino con exito la competencia")
        }
      });
      }

    return(
    <form onSubmit={handleSubmit}>
      <label htmlFor="ID">Ingrese el ID de la competencia que desea eliminar:</label>
      <input
        id="ID"
        name="ID"
        type="number"
        value={values.ID}
        onChange={e => setValues({...values, ID: e.target.value})}
        required
      />     
      <button type="submit">Eliminar</button>
    </form>
    )
}

export default EliminarEquipo