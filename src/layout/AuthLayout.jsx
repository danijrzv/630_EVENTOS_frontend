// IMPORTANDO OUTLET PARA HABILITAR LAS DEMÁS PÁGINAS DE AUTHLAYOUT
import {Outlet} from "react-router-dom"
const AuthLayout = () => {
  return (
    <>
        <main className="container mx-auto md:grid md:grid-cols-2 mt-12 gap-10 p-5 items-center">
            <Outlet/>
        </main>
    </>
  )
}

// EXPORTANDO FUNCIÓN
export default AuthLayout