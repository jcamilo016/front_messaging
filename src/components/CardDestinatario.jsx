import React from "react";
import { Card, CardMedia, CardContent, Typography, CardActions, Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete"
import MaleImage from "../static/images/user_male.svg";
import FemaleImage from "../static/images/user_female.svg";

function CardDestinatario({nombre, cedula, telefono, email, genero, eliminar}) {
    return (
        <Card sx={{ maxWidth: 345 }}>
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
                <Button variant="outlined" startIcon={<DeleteIcon />} onClick={() => eliminar(cedula)}>
                    Eliminar
                </Button>
            </CardActions>
        </Card>
    );
}

export default CardDestinatario;