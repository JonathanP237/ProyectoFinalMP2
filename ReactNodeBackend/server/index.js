const express = require("express");
const PORT = process.env.PORT || 3001;
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());

app.use(express.json({ extended: false }));

const cors = require('cors');

app.use(
    cors({
        origin: '*',
    })
);


app.post("/CrearEquipo", (req, res) => {

eqpcmp= true
datasc = ""
estan1Equipo = false
NivelEquipo = ""
mayor = 0
noExiste = false

  const listsID = [req.body.ID_Lider, req.body.ID_Participante_1, req.body.ID_Participante_2];
  const nivel = []
  const sql = 'SELECT * FROM Participantes WHERE ID IN (?,?,?)';
  const sqlcomp = 'SELECT * FROM Competencias WHERE ID = ?';
  


  db.all(sqlcomp, [req.body.Competencia], (err, rows) => {
    if (err) {
      console.error(err.message);
      return;
    }
    if (rows.length > 0) {
      const cm = rows[0].Categoria;
      datasc = cm;
    } else {
    }
  });
    
  db.all(sql, listsID, (err, rows) => {
      if (err) {
        console.error(err.message);
        return;
      }
    const IDs = rows.map(row => row.ID);
    const revEstaEq = rows.map(row => row.estaEquipo)
    const nivelGen = rows.map(row => row.Nivel);

    for (i=0;i<3;i++){
      if (revEstaEq[i] == 1){
        estan1Equipo = true
      }
    }

    if (datasc == "Elite"){
      nivCategoria = 4
    }else if(datasc == "Avanzado" ){
      nivCategoria = 3
    }else if(datasc == "Intermedio"){
      nivCategoria = 2
    }
    else{
      nivCategoria = 1
    }

    for (i=0;i<3;i++){
      if (nivelGen[i] == "Elite"){
        nivel[i] = 4
      }else if(nivelGen[i] == "Avanzado" ){
        nivel[i] = 3
      }else if(nivelGen[i] == "Intermedio"){
        nivel[i] = 2
      }
      else{
        nivel[i] = 1
      }
      }
    
    for(i = 0; i<3;i++){
      if(nivel[i]>= mayor){
        mayor = nivel[i]
      }

    }

    if(mayor == 4){
      NivelEquipo = "Elite"
    }else if (mayor == 3){
      NivelEquipo = "Avanzado"
    }else if (mayor == 2){
      NivelEquipo = "Intermedio"
    }else{
      NivelEquipo = "Basica"
    }

    if (mayor <= nivCategoria){
      eqpcmp = true
    }else{
      eqpcmp = false
      return res.json({message: "Nivel Error"})
    }
    
    if ((estan1Equipo == false && eqpcmp == true) == true){

      for (i=0; i < 3; i++){
        if (IDs[i] == null){
          noExiste = true
        }else{

        }
      }
      
      if (noExiste == false){
        const sql1 = 'INSERT INTO Equipos(Nombre, Clasificacion, ID_participante1, ID_participante2, ID_participante3,ID_Competencia) VALUES (?,?,?,?,?,?)';
      
        db.run(sql1, [req.body.Nombre_Equipo, NivelEquipo , IDs[0], IDs[1], IDs[2], req.body.Competencia], (err) => {
          if (err) {
            console.error(err.message);
            return;
          }
            res.json({ message: 'Equipo creado con éxito' });
          });
  
        const sqlcb= 'UPDATE Participantes SET estaEquipo = 1 WHERE ID = ?'
        for (i=0;i<3;i++){
          db.run(sqlcb, [IDs[i]],(err)=>{
            if (err) return console.error(err.message)
          })
        }
        const sqlEq= 'UPDATE Participantes SET nombreEquipo = ? WHERE ID = ?'
        for (i=0;i<3;i++){
          db.run(sqlEq, [req.body.Nombre_Equipo,IDs[i]],(err)=>{
            if (err) return console.error(err.message)
          })
        }
        
        
      }else{
        res.json({message: "No esta registrado"})
        noExiste = true
      }
        
    }else{
      res.json({message: "Error"})
    }



  });
});


app.get("/ObtenerEquipos", (req, res) => {
  const sql = 'SELECT * FROM Equipos';
  db.all(sql, [], (err, rows) => {
    if (err) {
      console.error(err.message);
      return;
    }
    const equipos = rows.map(row => ({
      ID:row.ID,
      Nombre: row.Nombre,
      Clasificacion: row.Clasificacion,
      ID_participante1: row.ID_participante1,
      ID_participante2: row.ID_participante2,
      ID_participante3: row.ID_participante3,
      ID_Competencia: row.ID_Competencia,
    }));
    res.json(equipos);
  });
});

app.post("/EliminarEquipo", (req, res) => {
  const sqlIntegrantes = 'SELECT * FROM Equipos WHERE ID = ?';

  db.all(sqlIntegrantes, [req.body.ID], (err, rows) => {
    if (err) {
      console.error(err.message);
      res.status(500).send('Error al buscar el equipo');
      return;
    }
    if (rows.length > 0) {
      const integrantes = {
        ID_participante1: rows[0].ID_participante1,
        ID_participante2: rows[0].ID_participante2,
        ID_participante3: rows[0].ID_participante3,
      };

      const sql = 'DELETE FROM Equipos WHERE id=?';
      db.run(sql, [req.body.ID], function(err) {
        if (err) {
          console.error(err.message);
          res.json({message:'Error al eliminar'});
          return;
        }
        if (this.changes === 0) {
          res.json({message:'Error al eliminar'});
          return;
        }else{
          res.json({message:"Exito al eliminar"});
        }
      });

      const sql1 = 'SELECT * FROM Participantes WHERE ID IN (?,?,?)';
      db.all(sql1, [integrantes.ID_participante1, integrantes.ID_participante2, integrantes.ID_participante3], (err, rows) => {
        if (err) {
          console.error(err.message);
          return;
        }
        const IDs = rows.map(row => row.ID);

        const sqlcb = 'UPDATE Participantes SET estaEquipo = 0 WHERE ID = ?';
        for (let i = 0; i < IDs.length; i++) {
          db.run(sqlcb, [IDs[i]], (err) => {
            if (err) return console.error(err.message);
          });
        }

        const sqlEq = 'UPDATE Participantes SET nombreEquipo = ? WHERE ID = ?';
        for (let i = 0; i < IDs.length; i++) {
          db.run(sqlEq, ["", IDs[i]], (err) => {
            if (err) return console.error(err.message);
          });
        }
      });
    } else {
      res.json({message:'Error al eliminar'});
    }
  });
});

app.get("/ObtenerCompetencias", (req, res) => {
    const sql = 'SELECT * FROM Competencias';
    db.all(sql, [], (err, rows) => {
      if (err) {
        console.error(err.message);
        return;
      }
      const competencias = rows.map(row => ({
        ID: row.ID,
        Nombre: row.Nombre,
        Categoria :row.Categoria,
        FechaInicio: row.fechaInicio,
        FechaFinal: row.Vigencia,
      }));
      res.json(competencias);
    });
  });

app.post("/CrearCompetencia", (req,res) =>{

  if (req.body.FechaInicio < req.body.Vigencia){
    const sql = 'INSERT INTO Competencias (Nombre,Categoria,fechaInicio,Vigencia,estaVigente) VALUES (?,?,?,?,?)';
    db.run(sql, [req.body.Nombre,req.body.Categoria,req.body.FechaInicio,req.body.Vigencia,1], (err, rows) => {
      if (err) {
        console.error(err.message);
        return;
      }
      else{
        res.json({message: "Creado con exito"})
      }
    });
  }else{
    res.json({message: "Error de fecha"})
  }

  })

  app.post("/EliminarCompetencia", (req, res) => {
    const sql = 'DELETE FROM Competencias WHERE id=?';
    db.run(sql, [req.body.ID], function (err) {
      if (err) {
        console.error(err.message);
        return;
      }
      if (this.changes === 0) {
        res.json({message: "Error al eliminar"})
      } else {
        res.json({message: "Exito al eliminar"})
      }
    });
});

app.post("/ActualizarCompetencia", (req, res) => {

  if (req.body.FechaInicio < req.body.Vigencia){
    const sql = 'UPDATE Competencias SET Nombre = ?,Categoria = ?,fechaInicio = ?,Vigencia = ?,estaVigente = ? WHERE id = ?';
    db.all(sql, [req.body.Nombre,req.body.Categoria,req.body.FechaInicio,req.body.Vigencia,1,req.body.ID], (err, rows) => {
      if (err) {
        console.error(err.message);
        return;
      }
      else{
        res.json({message: "Creado con exito"})
      }
    });
  }else{
    res.json({message: "Error de fecha"})
  }

    
  });

app.post("/Login", (req,res)=>{
  let row = "";

  sql = 'SELECT * FROM Administradores WHERE ID = ?'

  db.get(sql, [req.body.ID], (err, row) => {
    if (err) {
      return console.error(err.message);
    }
    return row
      ? res.json({message: "Administrador"})
      : comp()
  
  });

  function comp (){

    sql = 'SELECT * FROM Participantes WHERE ID = ?';
  db.get(sql, [req.body.ID], (err, row) => {
    if (err) {
      return console.error(err.message);
    }
    return row
      ? res.json({message: "Participante"})
      : res.json({message : "No existe el registro"})
  
  });

  }

})

app.post("/Registrar", (req,res) =>{


  sql ='INSERT INTO Participantes(ID,Nombre, Nivel, estaEquipo, nombreEquipo) VALUES (?,?,?,?,?)';
  db.run(sql,[req.body.ID,req.body.Usuario, req.body.Nivel, req.body.estaEquipo,req.body.nombreEquipo], (err) =>{
    if (err){
      return res.json({message: "Ocupado"})
    }
    
    return res.json({message: "Registrado"})
  ;
  })
})


app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto: ${PORT}`);
  });

  const sqlite3 = require('sqlite3').verbose();
  const db = new sqlite3.Database('DB_Modelos.db', sqlite3.OPEN_READWRITE, (err)=>{
    if (err) return console.error(err.message);
  });

