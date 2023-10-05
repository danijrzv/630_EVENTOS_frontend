/* eslint-disable no-unused-vars */
// IMPORTANDO HERRAMIENTAS 
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import Alerta from "../components/Alerta"
import clienteAxios from "../config/axios"
import useAuth from "../hooks/useAuth"

const Login = () => {
    // DEFINIENDO STATE PARA EL FORMULARIO
    const [alerta, setAlerta] = useState({})
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const {auth, setAuth} = useAuth()
    const navigate = useNavigate()

    // DEFINIEDO FUNCIÓN PARA EL EVENTO DE TIPO SUBMIT
    const handleSubmit = async e => {
        // EVITAR LA ACCIÓN POR DEFECTO
        e.preventDefault()
        // REVISAR SI CAMPOS VACIOS
        if([email, password].includes("")){
            setAlerta({msg: "Todos los campos son obligatorios", error: true})
            return;
        }
        // REVISAR SI PASSWORD TIENE AL MENOS SEIS CARACTERES
        if(password.length < 6){
            setAlerta({
                msg: "El password debe tener mínimo 6 caracteres",
                error: true
            })
            return
        }
        try {
            // ENVIAR DATOS A LA API PARA LA AUTENTICACIÓN VIA TOKEN
            const {data} = await clienteAxios.post("/usuarios/login", {email, password})
            // ALMACENAR TOKEN EN LOCALSTORAGE
            localStorage.setItem("token", data.token)
            // ALMACENAR DATOS DEL USUARIO EN AUTH
            setAuth(data)
            // NAVEGAR A LA RUTA PRIVADA
            navigate("/admin")
        } catch (error) {
            // EN CASO DE HABER ALGÚN ERROR, MOSTRARLO EN LA ALERTA
            setAlerta({
                msg: error.response.data.msg,
                error: true
            })
        }
    }
    // DESTRUCTURANDO MSG DE ALERTA
    const {msg} = alerta
  return (
    <>
        <div>
            <h1 className="text-gray-300 font-black text-6xl">
                Inicia sesión y publica tus
                <span className="text-black"> Eventos</span>
            </h1>
        </div>
        <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-gray-800">
            {msg && <Alerta
                alerta={alerta}
            />}
            <form 
                onSubmit={handleSubmit}
            >
                <div className="my-5">
                    <label className="uppercase text-gray-300 block text-xl font-bold">
                        Email
                    </label>
                    <input 
                        type="email"
                        placeholder="Email de registro"
                        className="border w-full p-3 mt-3 bg-gray-300 rounded-xl"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                </div>
                <div className="my-5">
                    <label className="uppercase text-gray-300 block text-xl font-bold">
                        Password
                    </label>
                    <input 
                        type="password"
                        placeholder="Tu password"
                        className="border w-full p-3 mt-3 bg-gray-300 rounded-xl"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                </div>
                <input 
                    type="submit" 
                    value="Iniciar sesión"
                    className="bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 
                    hover:cursor-pointer hover:bg-indigo-800 md:w-auto"
                />
            </form>
            <nav className="mt-10 lg:flex lg:justify-between">
                <Link 
                    className="block text-center my-5 text-gray-400"
                    to="/registrar">¿No tienes una cuenta? Registrate</Link>
                <Link 
                    className="block text-center my-5 text-gray-400"
                    to="/olvide-password">Olvide mi password</Link>
            </nav>
        </div>
    </>
  )
}

// EXPORTANDO FUNCIÓN
export default Login