import React, {useState, useEffect} from "react";
import CardDestinatario from "./CardDestinatario";
import {Grid, AlertTitle, Alert, Skeleton} from "@mui/material";
import {useAxios} from "use-axios-client";
import axiosInstance from "../utils/api";

function ListaDestinatarios() {
    const [showAlert, setShowAlert] = useState(false);
    const { data, loading, error, refetch } = useAxios({
        axiosInstance,
        url: '/destinatario'
    });

    useEffect(() => {

        const timeId = setTimeout(() => {
            if (showAlert === true) {
                setShowAlert(false)
            }
        }, 3000)

        return () => {
            clearTimeout(timeId)
        }
    }, [showAlert]);

    console.log(data);

    return (
        <>
            {showAlert && (
                <Alert severity="success" className="alert-container">
                    <AlertTitle>Exito!</AlertTitle>
                    Se ha eliminado el destinatario
                </Alert>
            )}
            <Grid container spacing={4}>
                {data && data.map(destinatario => (
                    <Grid item key={destinatario.userId}>
                        <CardDestinatario
                            nombre={destinatario.name}
                            cedula={destinatario.userId}
                            telefono={destinatario.phone}
                            email={destinatario.email}
                            genero={destinatario.genre}
                            setShowAlert={setShowAlert}
                            refetch={refetch}
                        />
                    </Grid>
                ))}
                {loading && (
                    <Grid container spacing={2} justifyContent="center" sx={{marginTop: "25px"}}>
                        <Grid item>
                            <Skeleton variant="rectangular" width={300} height={300}/>
                        </Grid>
                        <Grid item>
                            <Skeleton variant="rectangular" width={300} height={300}/>
                        </Grid>
                        <Grid item>
                            <Skeleton variant="rectangular" width={300} height={300}/>
                        </Grid>
                        <Grid item>
                            <Skeleton variant="rectangular" width={300} height={300}/>
                        </Grid>
                        <Grid item>
                            <Skeleton variant="rectangular" width={300} height={300}/>
                        </Grid>
                        <Grid item>
                            <Skeleton variant="rectangular" width={300} height={300}/>
                        </Grid>
                        <Grid item>
                            <Skeleton variant="rectangular" width={300} height={300}/>
                        </Grid>
                        <Grid item>
                            <Skeleton variant="rectangular" width={300} height={300}/>
                        </Grid>
                    </Grid>
                )}
                {error && (
                    <Grid container justifyContent="center" sx={{marginTop: "25px"}}>
                        <Grid item>
                            Error :(
                        </Grid>
                    </Grid>
                )}
            </Grid>
        </>
    )


}

export default ListaDestinatarios;