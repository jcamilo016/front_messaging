import React, {useCallback, useState, useEffect} from "react";
import CardDestinatario from "./CardDestinatario";
import { Grid, AlertTitle, Alert} from "@mui/material";
import useActions from "../hooks/useActions";

function ListaDestinatarios() {
    const [showAlert, setShowAlert] = useState(false);
    const {destinatarios, eliminarDestinatario} = useActions();

    useEffect(() => {

        const timeId = setTimeout(() => {
            if(showAlert === true) {
                setShowAlert(false)
            }
        }, 3000)

        return () => {
            clearTimeout(timeId)
        }
    }, [showAlert]);

    const eliminar = useCallback((cedula) => {
        eliminarDestinatario(cedula);
        setShowAlert(true);
    }, [eliminarDestinatario]);


    return (
        <>
            {showAlert && (
                <Alert severity="success" className="alert-container">
                    <AlertTitle>Exito!</AlertTitle>
                    Se ha eliminado el destinatario
                </Alert>
            )}
            <Grid container spacing={4}>
                {
                    destinatarios && destinatarios.map(destinatario => (
                        <Grid item key={destinatario.userId}>
                            <CardDestinatario
                                nombre={destinatario.name}
                                cedula={destinatario.userId}
                                telefono={destinatario.phone}
                                email={destinatario.email}
                                genero={destinatario.genre}
                                eliminar={eliminar}
                            />
                        </Grid>
                    ))
                }
            </Grid>
        </>
    )


}

export default ListaDestinatarios;