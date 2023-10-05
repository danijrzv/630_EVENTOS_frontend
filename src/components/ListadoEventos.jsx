import useEventos from "../hooks/useEventos"
import Evento from "./Evento"
const ListadoEventos = () => {

  const {eventos} = useEventos()

  const eventosOrdenados = eventos.sort((a,b) => new Date(b.created_at) - new Date(a.created_at))

  return (
    <>
      {eventosOrdenados.length 
      ? (
        <>
          <h2 className="font-black text-3xl text-center">Listado Eventos</h2>
          <p className="text-xl mt-5 font-medium mb-10 text-center">
            Administra tus {""}
            <span className="text-gray-00 font-bold">Eventos</span>
          </p>
          {eventosOrdenados.map(evento => (
          <Evento
            key={evento.id}
            evento={evento}
          />
          ))}
        </>
      ) 
      : (
        <>
          <h2 className="font-black text-3xl text-center">No hay Eventos</h2>
          <p className="text-xl font-medium mt-5 mb-10 text-center">
            Comienza agregando eventos {""}
            <span className="text-gray-300 font-bold">y apareceran en este lugar</span>
          </p>
        </>
      )}
    </>
  )
}

export default ListadoEventos