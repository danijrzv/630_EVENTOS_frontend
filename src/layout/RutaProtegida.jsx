// IMPORTANDO OUTLET PARA HABILITAR LAS DEMÁS PÁGINAS DE AUTHLAYOUT Y NAVIGATE PARA REDIRECCIONAR A LA PÁGINA PRINCIPAL 
import { Outlet, Navigate } from "react-router-dom"
import Header from "../components/Header"
import Footer from "../components/Footer"
import useAuth from "../hooks/useAuth"

const RutaProtegida = () => {
  // DESTRUCTURANDO AUTH Y CARGANDO
  const {auth, cargando} = useAuth()
  // SI CARGANDO ES TRUE, MOSTRAR MENSAJE DE CARGANDOEN LO QUE SE TERMINAN DE DESCARGAR LOS DATOS
  if(cargando) return "Cargando..."

  return (
    <>
      <Header/>
        {auth?.id ? (
        <main className="container mx-auto mt-10">
          <Outlet/>
        </main>) : <Navigate to="/"/>}
      <Footer/>
    </>
  )
}

// EXPORTANDO FUNCIÓN
export default RutaProtegida