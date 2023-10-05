// IMPORTAR HERRAMIENTAS
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { AuthProvider } from "./context/AuthProvider"
import { EventosProvider } from "./context/EventosProvider"

// IMPORTAR LAYOUT
import AuthLayout from "./layout/AuthLayout"
import RutaProtegida from "./layout/RutaProtegida"

// IMPORTAR PAGINAS
import Login from "./paginas/Login"
import Registrar from "./paginas/Registrar"
import OlvidePassword from "./paginas/OlvidePassword"
import NuevoPassword from "./paginas/NuevoPassword"
import ConfirmarCuenta from "./paginas/ConfirmarCuenta"
import Eventos from "./paginas/Eventos"

import AdministrarEventos from "./paginas/AdministrarEventos"

// FUNCIÓN PRINCIPAL PARA DESPLEGAR LA APLICACIÓN
function App() {

  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <EventosProvider>
            <Routes>
              <Route path="/" element={<AuthLayout/>}>
                <Route index element={<Login/>}/>
                  <Route path="registrar" element={<Registrar/>}/>
                  <Route path="olvide-password" element={<OlvidePassword/>}/>
                  <Route path="olvide-password/:token" element={<NuevoPassword/>}/>
                  <Route path="confirmar/:id" element={<ConfirmarCuenta/>}/>
              </Route>

              <Route path="/admin" element={<RutaProtegida/>}>
              <Route index element={<AdministrarEventos/>}/>
              <Route path="eventos" element={<Eventos/>}/>

              </Route>
            </Routes>
          </EventosProvider>
        </AuthProvider>
      </BrowserRouter>
    </>
  )
}

export default App
