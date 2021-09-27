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

    const enviarEmail = (email) => {
        API.post("/mensajeria/enviarMail", {...email})
            .then((res) => console.log(res))
    }

    const enviarSms = (body) => {
        API.post("/mensajeria/enviarSms", {...body})
            .then((res) => console.log(res))
    }

    return {
        destinatarios,
        eliminarDestinatario,
        listarUsuarios,
        crearDestinatario,
        enviarEmail,
        enviarSms,
    }
}

export default useActions;