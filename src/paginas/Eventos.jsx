/* eslint-disable no-unused-vars */
import useEventos from "../hooks/useEventos"
import EventosTotal from "../components/EventosTotal"

const Eventos = () => {

    const {eventosTotal} = useEventos()


  return (
    <>

      {eventosTotal.length 
      ? (
        <>
          <h2 className="font-black text-3xl text-center">Listado Eventos</h2>
          <p className="text-xl mt-5 font-medium mb-10 text-center">
            Conococe los eventos {""}
            <span className="text-gray-300 font-bold">más populares</span>
          </p>
          <div className="grid grid-cols-4 gap-4">
          {eventosTotal.map(evento => (
          <EventosTotal
            key={evento.id}
            evento={evento}
          />
          ))}
          </div>
        </>
      ) 
      : (
        <>
          <h2 className="font-black text-3xl text-center">No hay Eventos</h2>
          <p className="text-xl font-medium mt-5 mb-10 text-center">
            Cuando se publiquen {""}
            <span className="text-gray-300 font-bold"> apareceran en este lugar</span>
          </p>
        </>
      )}
    </>
  )
}

export default Eventos