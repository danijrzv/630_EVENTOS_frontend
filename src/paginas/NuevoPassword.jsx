/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import {Link, useParams} from "react-router-dom"
import { useState, useEffect } from "react"
import Alerta from "../components/Alerta"
import clienteAxios from "../config/axios"

const NuevoPassword = () => {
    // INICIALIZANDO STATE
    const [alerta, setAlerta] = useState("")
    const [password, setPassword] = useState("")
    const [repetirPassword, setRepetirPassword] = useState("")
    const [tokenValido, setTokenValido] = useState(false)
    const [passwordModificado, setPasswordModificado] = useState(false)

    // EXTRAER TOKEN DE LA URL EN NAVEGACIÓN
    const params = useParams()
    const {token} = params

    // COMPROBAR TOKEN
    useEffect(()=>{
      const comprobarToken = async ()=>{
        try {
          // VALIDAR TOKEN TOKEN
          await clienteAxios(`/usuarios/olvide-password/${token}`)
          // MOSTRAR MENSAJE EN LA ALERTA
          setAlerta({
            msg: "Coloca tu nuevo password"
          })
          setTokenValido(true)
        } catch (error) {
          // EN CASO DE FALLAR LA VALIDACIÓN, MOSTRAR MENSAJE DE ERROR EN LA ALERTA
          setAlerta({
            msg: "Hubo un error con el enlace",
            error: true
          })
        }
      }
      // INICIALIZAR LA FUNCIÓN
      comprobarToken()
    },[])

    // FUNCIÓN PARA EL EVENTO DE TIPO SUBMIT
    const handleSubmit = async e => {
        // PREVENIR LA ACCIÓN POR DEFAULT
        e.preventDefault()
        // SI EL PASSWORD ES MENOR A SEIS CARACTERES
        if(password.length < 6){
          // MOSTRAR MENSAJE DE ERROR
          setAlerta({
            msg: "El password debe ser de mínimo 6 caracteres",
            error: true
          })
          // DETENER PARA QUE NO SE EJECUTEN LAS DEMÁS LINEAS
          return
        }
        // SI EL PASSWORD ES DIFERENTE A REPETIRPASSWORD
        if(password !== repetirPassword){
          // MOSTRAR MENSAJE DE ERROR
          setAlerta({
            msg: "Los Password no son iguales",
            error: true
          })
          // DETENER PARA QUE NO SE EJECUTEN LAS DEMÁS LINEAS
          return
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
        // REVISAR SI TIENE AL MENOS UN CARACTER ESPECIALES
        if (!(password.match(/[^a-zA-Z\d]/))) {
            setAlerta({msg: "Incluye al menos un caracter especial", error: true})
            return;
        }
        try {
          // ALMACENAR NUEVO PASSWORD
          const url = `/usuarios/olvide-password/${token}`
          const {data} = await clienteAxios.post(url, {password})
          // MOSTRAR MENSAJE DE LA API AL CLIENTE
          setAlerta({
            msg: data.msg
          })
          // CAMBIAR STATE DE PASSWORDMODIFICADO PARA MOSTRAR EL LINK A INICIO DE SESIÓN
          setPasswordModificado(true)
        } catch (error) {
          // EN CASO DE HABER ALGÚN ERROR, MOSTRAR EL MENSAJE AL CLIENTE
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
                Restablece tu password y continúa publicando tus {""}
                <span className="text-black"> Eventos</span>
            </h1>
          </div>
          <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-gray-800">
            {msg &&<Alerta
              alerta={alerta}
            />
            }
            {tokenValido && (
              <>
                <form
                  onSubmit={handleSubmit}
                >
                  <div className="my-5">
                      <label className="uppercase text-gray-300 block text-xl font-bold">
                          Nuevo Password
                      </label>
                      <input 
                          type="password"
                          placeholder="Tu nuevo password"
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
                      value="Guardar nuevo password"
                      className="bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 
                      hover:cursor-pointer hover:bg-indigo-800 md:w-auto"
                  />
                </form>
              </>
            )}
            {passwordModificado && 
              <Link 
              className="block text-center my-5 text-gray-400"
              to="/">Iniciar sesión</Link>
            }
          </div>
        </>
    )
}

export default NuevoPassword