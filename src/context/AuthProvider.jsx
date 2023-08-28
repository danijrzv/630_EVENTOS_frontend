/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState, createContext, useEffect } from "react";
import clienteAxios from "../config/axios";

// INSTANCIANDO CREATECONTEXT
const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    // STATE PARA CARGANDO, QUE INICIA CON TRUE EN LO QUE SE TERMINA DE CARGAR LOS DATOS EN CASO DE QUE LA DB SEA MUY GRANDE
    const [cargando, setCargando] = useState(true)
    // DESTRUCTURANDO AUTENTICACIÓN
    const [auth, setAuth] = useState({})
    // AL REENDERIZAR LA APP
    useEffect(()=>{
        const autenticarUsuario = async ()=>{
            const token = localStorage.getItem("token")
            // SI NO HAY UN TOKEN
            if(!token) {
                setCargando(false)
                return
            }
            // SI HAY UN TOKEN, CREAR CONFIG PARA EL MIDDLEWERE DE LA API
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            // OBTENER PERFIL
            try {
                const {data} = await clienteAxios("/usuarios/perfil", config)
                setAuth(data)
            } catch (error) {
                console.log(error.response.data.msg)
                setAuth({})
            }
            // CAMBIAR EL ESTADO DE CARGANDO
            setCargando(false)
        }
        // INICIALIZAR LA FUNCIÓN DE AUTENTICACIÓN
        autenticarUsuario()
    }, [])

    // FUNCIÓN PARA CERRAR SESIÓN
    const cerrarSesion = ()=>{
        // ELIMINAR TOKEN DE LOCALSTORAGE
        localStorage.removeItem("token")
        // ELIMINAR DATOS DE AUTH
        setAuth({})
    }
   
    return(
    <AuthContext.Provider
        value={{
            auth,
            setAuth,
            cerrarSesion,
            cargando
        }}
    >
        {children}
    </AuthContext.Provider>
    )
}

// EXPORTANDO FUNCIÓN
export default AuthContext;