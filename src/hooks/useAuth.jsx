import { useContext } from "react";
import AuthContext from "../context/AuthProvider";

const useAuth = () => {
    return useContext(AuthContext)
}

// EXPORTANDO FUNCIÓN
export default useAuth;