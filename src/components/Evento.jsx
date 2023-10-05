/* eslint-disable react/prop-types */
// IMPORTANDO USEEVENTOS 
import useEventos from "../hooks/useEventos"

const Evento = ({evento}) => {
    // INSTANCIAR FUNCIONES Y STATE GLOBALES DE EVENTOS
    const {setEdicion, eliminarEvento} = useEventos()
    // DESTRUCTURANDO EVENTO
    const {title, description, start_time, end_time, created_at, updated_at, location, id} = evento
    // FORMATEAR FECHA
    const formatearFecha = fecha => {
        const nuevaFecha = new Date(fecha)
        return new Intl.DateTimeFormat("es-MX", {dateStyle: "long"}).format(nuevaFecha)
    }

  return (
    <div className="mx-5 my-10 bg-gray-800 shadow-md px-5 py-10 rounded-xl">
    <p className="font-bold uppercase text-gray-300 my-2">Título: {""}
        <span className="font-medium normal-case text-black">{title}</span>
    </p>
    <p className="font-bold uppercase text-gray-300 my-2">Descripción: {""}
        <span className="font-medium normal-case text-black">{description}</span>
    </p>
    <p className="font-bold uppercase text-gray-300 my-2">Fecha Inicio: {""}
        <span className="font-medium normal-case text-black">{formatearFecha(start_time)}</span>
    </p>
    <p className="font-bold uppercase text-gray-300 my-2">Fecha Fin: {""}
        <span className="font-medium normal-case text-black">{formatearFecha(end_time)}</span>
    </p>
    <p className="font-bold uppercase text-gray-300 my-2">Fecha Creación: {""}
        <span className="font-medium normal-case text-black">{formatearFecha(created_at)}</span>
    </p>
    <p className="font-bold uppercase text-gray-300 my-2">Fecha Actualización: {""}
        <span className="font-medium normal-case text-black">{formatearFecha(updated_at)}</span>
    </p>
    <p className="font-bold uppercase text-gray-300 my-2">Ubicación: {""}
        <span className="font-medium normal-case text-black">{location}</span>
    </p>
    <div className="flex justify-between my-5">
        <button
            type="button"
            className="py-2 px-10 bg-indigo-600 hover:bg-indigo-700 text-white uppercase
            font-bold rounded-lg"
            onClick={() => setEdicion(evento)}
        >Editar</button>
        <button
            type="button"
            className="py-2 px-10 bg-red-600 hover:bg-red-700 text-white uppercase
            font-bold rounded-lg"
            onClick={()=> eliminarEvento(id)}
        >Eliminar</button>
    </div>
</div>
  )
}

// EXPORTANDO EVENTO
export default Evento