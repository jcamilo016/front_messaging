import React, {useCallback, useEffect, useState} from "react";
import {Alert, AlertTitle, ToggleButton, ToggleButtonGroup} from '@mui/material';
import ViewListIcon from '@mui/icons-material/ViewList';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ListaDestinatarios from "../components/ListaDestinatarios";
import FormDestinatario from "../components/FormDestinatario";
import useActions from "../hooks/useActions";


function Destinatarios() {
    const [showAlert, setShowAlert] = useState(false);
    const [alignment, setAlignment] = React.useState("lista");

    const {crearDestinatario} = useActions();

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


    const onFormSubmit = useCallback(async (values) => {
        await crearDestinatario(values);
        setShowAlert(true);
        setAlignment("lista");
    }, [crearDestinatario]);


    const handleChange = (event, newAlignment) => {
        setAlignment(newAlignment);
    };

    return (
        <>
            <div className="toggle-buttons-container">
                <ToggleButtonGroup
                    color="primary"
                    value={alignment}
                    exclusive
                    onChange={handleChange}
                >
                    <ToggleButton value="lista">
                        <ViewListIcon/>{"Lista de Usuarios"}
                    </ToggleButton>
                    <ToggleButton value="crear">
                        <AccountCircleIcon/>Crear Usuario
                    </ToggleButton>
                </ToggleButtonGroup>
            </div>
            {showAlert && (
                <Alert severity="success" className="alert-container">
                    <AlertTitle>Exito!</AlertTitle>
                    Se ha creado el destinatario
                </Alert>
            )}
            {alignment === "lista" && (<ListaDestinatarios/>)}
            {alignment === "crear" && (<FormDestinatario onFormSubmit={onFormSubmit}/>)}
        </>
    );
}

export default Destinatarios