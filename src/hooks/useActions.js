import {useEffect, useState} from "react";
import API from "../utils/api";

function useActions() {
    const [destinatarios, setDestinatarios] = useState([]);

    const listarUsuarios = () => {
        API.get("/destinatario")
            .then(res => setDestinatarios(res.data))
    }

    useEffect(() => {
        listarUsuarios();
    }, []);

    const eliminarDestinatario = (userId) => {
        API.delete(`/destinatario/${userId}`)
            .then(() => listarUsuarios())
    }

    const crearDestinatario = (destinatario) => {
        API.post("/destinatario/crear", {...destinatario})
            .then((res) => listarUsuarios())
    }

    return {destinatarios, eliminarDestinatario, listarUsuarios, crearDestinatario}
}

export default useActions;