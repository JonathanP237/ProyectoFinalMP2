import React from 'react';
import {Routes } from 'react-router-dom'
import './App.css';
import {BrowserRouter as Router,Route,} from "react-router-dom";
import Home from './componentes/Home.js'
import FomularioCrearEquipo from './componentes/FomularioCrearEquipo.js';
import Admin from './componentes/Admin.js';


function App(){
  return (
    <Router>
      <div className="App">
          <Routes>
            <Route exact path="/" element={<Home/>} />
            <Route exact path="/ID" element={<FomularioCrearEquipo/>}/> 
            <Route exact path="/Admin" element={<Admin/>}/>
          </Routes>
      </div>
    </Router>
  );
}
export default App;