import React from 'react'
import FormularioLogin from './FormularioLogin.js'
import FormularioRegistrarse from './FormularioRegistrarse.js'


function Home () {
  return(
    <section className="Home">
    <header className="Inicio">
    <p>Maratón de programación</p>  
    <h1>Iniciar Sesión</h1>
    <FormularioLogin />
    </header>
    <h1>Registrarse</h1>
    <FormularioRegistrarse />    
    </section>
  )
}

export default Home