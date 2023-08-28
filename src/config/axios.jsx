import axios from "axios";

// AGREGANDO URL BASE A CLIENTE AXIOS
const clienteAxios = axios.create({
    baseURL: `${import.meta.env.VITE_BACKEND_URL}/api`
})

// EXPORTANDO EL CLIENTE AXIOS
export default clienteAxios