import React from "react";
import { Card, CardMedia, CardContent, Typography, CardActions } from "@mui/material";
import LoadingButton from '@mui/lab/LoadingButton';
import DeleteIcon from "@mui/icons-material/Delete"
import MaleImage from "../static/images/user_male.svg";
import FemaleImage from "../static/images/user_female.svg";
import { useLazyAxios } from "use-axios-client";
import axiosInstance from "../utils/api";

function CardDestinatario({nombre, cedula, telefono, email, genero, setShowAlert, refetch}) {
    const [deleteData, { loading }] = useLazyAxios({
            axiosInstance,
            url: `destinatario/${cedula}`,
            method: 'DELETE'
        });

    const onDeleteHandler = () => {
        deleteData()
            .then(res => {
                setShowAlert(true);
                refetch();
            })
    }

    return (
        <Card sx={{ maxWidth: 345 }} elevation={3}>
            <CardMedia
                component="img"
                alt="user image"
                image={genero === "HOMBRE" ? MaleImage: FemaleImage}
                className="media"
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {nombre}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {`Cédula: ${cedula}`}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                        {`Celular: ${telefono}`}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                        {`Email: ${email}`}
                </Typography>
            </CardContent>
            <CardActions>
                <LoadingButton
                    variant="outlined"
                    startIcon={<DeleteIcon />}
                    onClick={() => onDeleteHandler()}
                    loadingPosition="start"
                    loading={loading} >
                        Eliminar
                </LoadingButton>
            </CardActions>
        </Card>
    );
}

export default CardDestinatario;