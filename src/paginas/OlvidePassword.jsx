/* eslint-disable no-unused-vars */
import Alerta from "../components/Alerta"
import { useState } from "react"
import {Link} from "react-router-dom"
import clienteAxios from "../config/axios"
const OlvidePassword = () => {
    // INICIALIZANDO STATE
    const [alerta, setAlerta] = useState({})
    const [email, setEmail] = useState("")

    // FUNCIÓN DE EVENTO TIPO SUBMIT
    const handleSubmit = async e => {
        // PREVENIR LA ACCIÓN POR DEFAULT
        e.preventDefault()
        // SI NO HA ESCRITO UN CORREO
        if(email === "" || email.length < 6){
            // MOSTRAR MENSAJE DE ERROR
            setAlerta({msg: "El email es oligatorio", error: true})
            // DETENER PARA QUE NO SE EJECUTEN LAS DEMÁS LINEAS
            return
        }
        try {
            // ENVIAR CORREO A LA API
            const {data} = await clienteAxios.post("/usuarios/olvide-password", {email})
            // MOSTRAR MENSAJE ENVIADO POR LA API
            setAlerta({
                msg: data.msg
            })
            // RESETEAR EL INPUT DE EMAIL
            setEmail("")
        } catch (error) {
            // EN CASO DE HABER UN ERROR, MOSTRARLO AL CLIENTE
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
                <h1 className="text-indigo-600 font-black text-6xl">
                    Recupera tu password y continúa publicando tus {""}
                    <span className="text-black">Eventos</span>
                </h1>
            </div>
            <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
                {msg && 
                <Alerta
                    alerta={alerta}
                />}
                <form
                    onSubmit={handleSubmit}
                >
                    <div className="my-5">
                        <label className="uppercase text-gray-600 block text-xl font-bold">
                            Email
                        </label>
                        <input 
                            type="email"
                            placeholder="Email de registro"
                            className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                    </div>
                    <input 
                        type="submit" 
                        value="Enviar instrucciones"
                        className="bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 
                        hover:cursor-pointer hover:bg-indigo-800 md:w-auto"
                    />
                </form>
                <nav className="mt-10 lg:flex lg:justify-between">
                    <Link 
                        className="block text-center my-5 text-gray-500"
                        to="/">¿Ya tienes una cuenta? Inicia sesión</Link>
                    <Link 
                        className="block text-center my-5 text-gray-500"
                        to="/registrar">¿No tienes una cuenta? Registrate</Link>
                </nav>
            </div>
        </>
    )
}

// EXPORTANDO LA FUNCIÓN
export default OlvidePassword