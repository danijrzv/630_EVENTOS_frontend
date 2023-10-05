/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

const EventosTotal = ({evento}) => {

    const {title, description, start_time, end_time, created_at, updated_at, location} = evento

    const meGusta = () => {
      console.log("Desde meGusta")
    }

  return (
    <div className="mx-5 my-10 bg-gray-900 shadow-md px-5 py-10 rounded-xl">
      <img className="py-20 px-full bg-slate-400 rounded-md" src="/" alt="..." />
    <p className="font-bold uppercase text-gray-300 my-2">Título: {""}
        <span className="font-medium normal-case text-sky-400">{title}</span>
    </p>
    <p className="font-bold uppercase text-gray-300 my-2">Descripción: {""}
        <span className="font-medium normal-case text-sky-400">{description}</span>
    </p>
    <p className="font-bold uppercase text-gray-300 my-2">Fecha Inicio: {""}
        <span className="font-medium normal-case text-sky-400">{start_time}</span>
    </p>
    <p className="font-bold uppercase text-gray-300 my-2">Fecha Fin: {""}
        <span className="font-medium normal-case text-sky-400">{end_time}</span>
    </p>
    <button 
    className="bg-indigo-600 p-3 hover:bg-indigo-700 rounded-md text-white font-bold"
    onClick={meGusta}
    >
      Me gusta
    </button>
    
    </div>
  )
}

export default EventosTotal