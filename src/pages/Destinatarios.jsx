import React, {useCallback, useEffect, useState} from "react";
import {Alert, AlertTitle, ToggleButton, ToggleButtonGroup} from '@mui/material';
import ViewListIcon from '@mui/icons-material/ViewList';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ListaDestinatarios from "../components/ListaDestinatarios";
import FormDestinatario from "../components/FormDestinatario";
import { useLazyAxios } from "use-axios-client";
import axiosInstance from "../utils/api";

function Destinatarios() {
    const [showAlert, setShowAlert] = useState(false);
    const [alignment, setAlignment] = React.useState("lista");

    const [saveData, { loading }] = useLazyAxios({
        axiosInstance,
        url: `destinatario/crear`,
        method: "POST"
    });

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


    const onFormSubmit = useCallback( (values) => {
        saveData(values)
            .then(res => {
                setAlignment("lista");
                setShowAlert(true);
            });
    }, [saveData]);


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
                        <ViewListIcon/><span className="button-span">{"Lista de destinatarios"}</span>
                    </ToggleButton>
                    <ToggleButton value="crear">
                        <AccountCircleIcon/><span className="button-span">{"Crear destinatario"}</span>
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
            {alignment === "crear" && (<FormDestinatario onFormSubmit={onFormSubmit} isLoading={loading}/>)}
        </>
    );
}

export default Destinatarios