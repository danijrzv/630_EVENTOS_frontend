import {Link} from "react-router-dom"
import useAuth from "../hooks/useAuth"
const Header = () => {

    const {cerrarSesion} = useAuth()

  return (
    <header className="py-10 bg-sky-800">
    <div className="container mx-auto flex flex-col lg:flex-row justify-between items-center">
        <h1 className="font-bold text-4xl text-gray-200 text-center">3
            <span className="text-white text-2xl font-black">VENTOS</span>
        </h1>

        <nav className="flex flex-col items-center lg:flex-row gap-4 mt-5 lg:mt-0">
            <Link to="/admin" className="text-white text-sm uppercase font-bold"> Inicio</Link>
            <Link to="/admin/eventos" className="text-white text-sm uppercase font-bold"> Eventos</Link>
            <button 
                type="button"
                className="text-white text-sm uppercase font-bold"
                onClick={cerrarSesion}
            >Cerrar Sesión</button>
        </nav>
    </div>
</header>
  )
}

export default Header