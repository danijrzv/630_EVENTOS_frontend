/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-unused-vars */
import { useState, useEffect, forwardRef } from "react"
import useAuth from "../hooks/useAuth"
import useEventos from "../hooks/useEventos"
import Alerta from "../components/Alerta"

const Formulario = (props, ref) => {
  // DECLARANDO STATE
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [start_time, setStart_Time] = useState("")
  const [end_time, setEnd_Time] = useState("")
  const [location, setLocation] = useState("")
  const [alerta, setAlerta] = useState({})
  const [id, setId] = useState(null)
  // DESTRUCTURANDO AUTH
  const {auth} = useAuth()
  // DESTRUCTURANDO STATE Y FUNCIONES DE USEEVENTOS
  const {guardarEvento, evento, setEvento} = useEventos()
    
  // DETECTAR CUANDO CAMBIA EL EVENTO
  useEffect(() => {
      if(evento?.title){
          setTitle(evento.title)
          setDescription(evento.description)
          setStart_Time(evento.start_time)
          setEnd_Time(evento.end_time)
          setLocation(evento.location)
          setId(evento.id)
      }
  },[evento])
  // FUNCIÓN PARA EL EVENTO DE TIPO SUBMIT
  const handleSubmit = e => {
    // PREVINIENDO LA ACCIÓN POR DEFAULT
    e.preventDefault()
    // VALIDAR QUE EL FORMULARIO NO TENGA DATOS VACIÓN
    if([title, description, start_time, end_time, location].includes("")){
        setAlerta({
            msg: "Todos los campos son obligatorios",
            error: true
        })
        return
    }
    // GUARDAR EVENTO
    guardarEvento({title, description, start_time, end_time, location, id})
    // GENERAR MENSAJE
    setAlerta({msg: "Guardado correctamente"})
    // RESETEAR LOS INPUT DEL FORMULARIO
    setTitle("")
    setDescription("")
    setStart_Time("")
    setEnd_Time("")
    setLocation("")
    setEvento({})
    setId(null)
    // LIMPIAR ALERTA
    setTimeout(() => {
        setAlerta({})
    }, 3000);
  }
  // DESTRUCTURAR MENSAJE DE ALERTA
  const {msg} = alerta
  return (
    <>
      <h2 className="font-black text-3xl text-center">Administrador de Eventos</h2>
        <p className="text-xl mt-5 mb-10 text-center">
        Agrega tus Eventos y {""}
        <span className="text-indigo-600 font-bold">Administralos</span>
        </p>
        <form 
        ref={ref}
        id="formulario"
        className="bg-white py-10 px-5 mb-10 lg:mb-5 shadow-md rounded-md"
        onSubmit={handleSubmit}>
            <div className="mb-5">
                <label 
                    htmlFor="titulo"
                    className="text-gray-700 uppercase font-bold"
                >Título</label>
                <input 
                id="titulo"
                type="text"
                placeholder="Título del evento" 
                className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                value={title}
                onChange={e => setTitle(e.target.value)}
                />
            </div>
            <div className="mb-5">
                <label 
                    htmlFor="descripcion"
                    className="text-gray-700 uppercase font-bold"
                >Descripción</label>
                <textarea 
                id="descripcion"
                placeholder="Descripción del Evento" 
                className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                value={description}
                onChange={e => setDescription(e.target.value)}
                />
            </div>
            <div className="mb-5">
                <label 
                    htmlFor="fecha_inicio"
                    className="text-gray-700 uppercase font-bold"
                >Fecha Inicio</label>
                <input 
                id="fecha_inicio"
                type="date"
                className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                value={start_time}
                onChange={e => setStart_Time(e.target.value)}
                />
            </div>
            <div className="mb-5">
                <label 
                    htmlFor="fecha_fin"
                    className="text-gray-700 uppercase font-bold"
                >Fecha Fin</label>
                <input 
                id="fecha_fin"
                type="date"
                className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                value={end_time}
                onChange={e => setEnd_Time(e.target.value)}
                />
            </div>
            <div className="mb-5">
                <label 
                    htmlFor="ubicacion"
                    className="text-gray-700 uppercase font-bold"
                >Ubicación</label>
                <input 
                id="ubicacion"
                type="text"
                placeholder="Ubicación del evento" 
                className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                value={location}
                onChange={e => setLocation(e.target.value)}
                />
            </div>
            <input 
                type="submit" 
                className="bg-indigo-600 w-full p-3 text-white uppercase font-bold
                hover:bg-indigo-700 cursor-pointer transition-colors"
                value={evento.id ? "Guardar cambios" : "Agregar Evento"}/>
        </form>
        {msg && <Alerta alerta={alerta}/>}
    </>
  )
}

// EXPORTANDO FORMULARIO
export default forwardRef(Formulario)