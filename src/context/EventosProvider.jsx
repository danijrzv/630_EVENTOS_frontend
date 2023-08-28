/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useEffect, useState, createContext, useRef } from "react"
import useAuth from "../hooks/useAuth"
import clienteAxios from "../config/axios"

// INSTANCIANDO CREATECONTEXT
const EventosContext = createContext()

export const EventosProvider = ({children}) => {
    // INSTANCIANDO REF
    const ref = useRef(null)
    // STATES
    const [eventos, setEventos] = useState([])
    const [evento, setEvento] = useState({})
    // AUTENTICACIÓN
    const {auth} = useAuth()
    
    // OBTENER DATOS AL REENDERIZAR 
    useEffect(()=>{
        const obtenerEventos = async ()=>{
            try {
                // OBTENIENDO TOKEN DE LOCALSTORAGE
                const token = localStorage.getItem("token")
                // SI NO HAY UN TOKEN, DETENER LA APP
                if(!token) return
                // CONFIGURACIÓN DE AUTENTICACIÓN
                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }
                // OBTENER EVENTOS
                const {data} = await clienteAxios("/eventos", config)
                // AGREGANDO EVENTOS AL STATE
                setEventos(data)
            } catch (error) {
                console.log(error)
            }
        }
        // INICIALIZAR LA FUNCIÓN
        obtenerEventos()
    },[auth])

    const guardarEvento = async evento => {
        // OBTENER TOKEN DE LOCALSTORAGE
        const token = localStorage.getItem("token")
        // CONFIGURACIÓN DE AUTENTICACIÓN
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }
        // SI EL EVENTO TIENE ID, ES UN EVENTO QUE SE QUIERE ACTUALIZAR
        if(evento.id){
            try {
                // ACTUALIZAR EVENTO
                const {data} = await clienteAxios.put(`/eventos/${evento.id}`, evento, config)
                // CREAR NUEVO ARREGLO SUSTITUYENDO LOS DATOS DEL EVENTO ACTUALIZADO EN EL STATE DE EVENTOS
                const eventosActualizado = eventos.map( eventoState => eventoState.id === data.id ? data : eventoState)
                // AGREGAR ARREGLO CON LOS EVENTOS INCLUYENDO EL EVENTO ACTUALIZADO
                setEventos(eventosActualizado)
            } catch (error) {
                console.log(error)
            }
        }else{
            // SI EL EVENTO NO TIENE ID
            try {
                // ES UN EVENTO NUEVO, POR LO QUE SE ENVIA LA PETICIÓN POST CON LOS DATOS DEL EVENTO A ACTUALIZAR
                const {data} = await clienteAxios.post("/eventos", evento, config)
                // AGREGAR AL STATE DE EVENTOS, EL EVENTO NUEVO Y UNA COPIA DE LOS EVENTOS PREVIOS
                setEventos([data, ...eventos])
            } catch (error) {
                console.log(error.response.data.msg)
            }
        }
    }

    const setEdicion = evento => {
        // AGREGAR LOS DATOS DEL EVENTO AL STATE DE EVENTO
        setEvento(evento)
        // DAR SCROLL
        ref.current?.scrollIntoView({behavior: "smooth"})
    }

    const eliminarEvento = async id => {
        // PREGUNTAR SI ESTÁ SEGURO DE ELIMINAR EL EVENTO
        const confirmar = confirm("¿Confirmas que deseas eliminar?")
        // SI SE CONFIRMA
        if(confirmar){
            try {
                // OBTENER TOKEN DE LOCALSTORAGE
                const token = localStorage.getItem("token")
                // CONFIGURACIÓN DE AUTENTICACIÓN
                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }
                // ELIMINAR EVENTO
                const {data} = await clienteAxios.delete(`/eventos/${id}`, config)
                // CREAR NUEVO ARREGLO EXCLUYENDO AL EVENTO QUE SE ACABA DE ELIMINAR
                const eventosActualizado = eventos.filter(eventosState => eventosState.id !== id)
                // AGREGAR AL STATE DE EVENTOS EL EL NUEVO ARREGLO 
                setEventos(eventosActualizado)
            } catch (error) {
                console.log(error)
            }
        }
    }
    
  return (
    <EventosContext.Provider
        value={{
            guardarEvento,
            eventos,
            setEdicion,
            eliminarEvento,
            evento,
            setEvento,
            ref
        }}
    >
        {children}
    </EventosContext.Provider>
  )
}

export default EventosContext