/* eslint-disable no-unused-vars */
import {Link} from "react-router-dom"
import { useState } from "react"
import Alerta from "../components/Alerta"
import clienteAxios from "../config/axios"

const Registrar = () => {
    // INICIALIZAR STATE
    const [alerta, setAlerta] = useState({})
    const [email, setEmail] = useState("")
    const [nombre, setNombre] = useState("")
    const [password, setPassword] = useState("")
    const [repetirPassword, setRepetirPassword] = useState("")

    // FUNCIÓN PARA EL EVENTO TIPO SUBMIT
    const handleSubmit = async (e) => {
        // PREVENIR LA ACCIÓN POR DEFAULT
        e.preventDefault()
        console.log(email.length)
        // REVISAR SI HAY CAMPOS VACIOS
        if([email, nombre, password, repetirPassword].includes("")){
            setAlerta({msg: "Todos los campos son obligatorios", error: true})
            return;
        }
        // VALIDAR QUE EL EMAIL NO SEA MUY LARGO
        if(email.length>60){
            setAlerta({msg: "El Email es demasiado largo", error: true})
            return;
        }
        // VALIDAR QUE EL NOMBRE NO SEA MUY LARGO
        if(nombre.length>80){
            setAlerta({msg: "El nombre es demasiado largo", error: true})
            return;
        }
        // REVISAR QUE PASSWORD SEA IGUAL A REPETIR PASSWORD
        if(password !== repetirPassword){
            setAlerta({msg: "Los Password deben ser iguales", error: true})
            return;
        }
        // REVISAR SI EL PASSWORD TIENE MINIMO SEIS CARACTERES
        if (password.length < 6) {
            setAlerta({msg:"El password debe tener minimo seis caracteres", error: true});
            return;
        }
        // REVISAR SI EL PASSWORD TIENE MINUSCULAS Y MAYUSCULAS
        if (!(password.match(/[a-z]/) && password.match(/[A-Z]/))) {
            setAlerta({msg: "El password debe tener minusculas y mayusculas", error: true});
            return;
        }
        // REVISAR SI TIENE AL MENOS UN NUMERO
        if (!password.match(/\d/)) {
            setAlerta({msg: "Incluye al menos un número", error: true})
            return;
        } 
        // Check for special characters
        if (!(password.match(/[^a-zA-Z\d]/))) {
            setAlerta({msg: "Incluye al menos un caracter especial", error: true})
            return;
        }
        try {
            // REGISTRAR USUARIO
            const {data} = await clienteAxios.post("/usuarios", {nombre, email, password})
            // RESETEAR FORMULARIO
            setNombre("")
            setPassword("")
            setEmail("")
            setRepetirPassword("")
            // MOSTRAR MENSAJE ENVIADO POR LA API
            setAlerta({msg: data.msg})
        } catch (error) {
            // EN CASO DE HABER ALGÚN ERROR, MOSTRARLO AL CLIENTE
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
                Crea tu cuenta y publica tus {""}
                <span className="text-black">Eventos</span>
            </h1>
            </div>
            <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-gray-800">
                {msg && <Alerta
                    alerta={alerta}
                />}
                <form 
                    onSubmit={ handleSubmit }
                >
                    <div className="my-5">
                        <label className="uppercase text-gray-300 block text-xl font-bold">
                            Nombre
                        </label>
                        <input 
                            type="text"
                            placeholder="Tu nombre"
                            className="border w-full p-3 mt-3 bg-gray-300 rounded-xl"
                            value={nombre}
                            onChange={e => setNombre(e.target.value)}
                        />
                    </div>
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
                    <div className="my-5">
                        <label className="uppercase text-gray-300 block text-xl font-bold">
                            Repetir password
                        </label>
                        <input 
                            type="password"
                            placeholder="Repite tu password"
                            className="border w-full p-3 mt-3 bg-gray-300 rounded-xl"
                            value={repetirPassword}
                            onChange={e => setRepetirPassword(e.target.value)}
                        />
                    </div>
                    <input 
                        type="submit" 
                        value="Crear cuenta"
                        className="bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 
                        hover:cursor-pointer hover:bg-indigo-800 md:w-auto"
                    />
                </form>
                <nav className="mt-10 lg:flex lg:justify-between">
                    <Link 
                        className="block text-center my-5 text-gray-400"
                        to="/">¿Ya tienes una cuenta? Inicia sesión</Link>
                    <Link 
                        className="block text-center my-5 text-gray-400"
                        to="/olvide-password">Olvide mi password</Link>
                </nav>
            </div>
        </>
    )
}

// EXPORTANDO LA ACCIÓN POR DEFAULT
export default Registrar