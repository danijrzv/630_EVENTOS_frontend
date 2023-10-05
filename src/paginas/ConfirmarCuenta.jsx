/* eslint-disable react-hooks/exhaustive-deps */
import Alerta from "../components/Alerta"
import { useParams, Link } from "react-router-dom"
import { useState, useEffect } from "react"
import clienteAxios from "../config/axios"
const ConfirmarCuenta = () => {

    // UTILIZAR UN STATE PARA QUE EN CASO DE QUE HAYA MUCHOS UUSARIOS, NO SE QUEDE CARGANDO LA APP
    const [cargando, setCargando] = useState(true)
    const [cuentaConfirmada, setCuentaConfirmada] = useState(false) 
    const [alerta, setAlerta] = useState({})

    // UTILIZAR STATE PARA EXTRAER EL TOKEN DE LA URL
    const params = useParams()
    const {id} = params

    // UTILIZAR USEEFFECT PARA QUE EL CLIENTE CONSULTE LA API EN CUANTO INGRESAN AL ENLACE
    useEffect(()=>{
        // FUNCIÓN PARA CONFIRMAR CUENTA
        const confirmarCuenta = async()=>{
            try {
                // ENVIAR LA PETICIÓN PARA CONFIRMAR LA CUENTA VIA TOKEN
                const url = `/usuarios/confirmar/${id}`
                const {data} = await clienteAxios(url)
                // CAMBIAR STATE PARA QUE APAREZCA EL ENLACE DE INICIAR SESIÓN POR MEDIO DE PROPS
                setCuentaConfirmada(true)
                setAlerta({
                msg: data.msg
                })
            } catch (error) {
                setAlerta({
                msg: error.response.data.msg,
                error: true
                })
            }
            // CAMBIAR EL ESTADO DE CARGANDO
            setCargando(false)
        }
        // INICIALIZAR FUNCIÓN
        confirmarCuenta()
    },[])// EL USO DE [] ES PARA QUE LA PAGINA SE RENDERICE SOLO UNA VEZ
    return (
        <>
            <div>
            <h1 className="text-gray-300 font-black text-6xl">
                Confirma tu cuenta y publica tus {""}
                <span className="text-black">Eventos</span>
            </h1>
            </div>
            <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-gray-800">
                {!cargando &&
                <Alerta 
                alerta={alerta}/>}
                {cuentaConfirmada && (
                <Link 
                className="block text-center my-5 text-gray-500"
                to="/">Iniciar sesión</Link>
                )}
            </div>
        </>
    )
}

// EXPORTANDO FUNCIÓN
export default ConfirmarCuenta