import React, {useCallback, useEffect, useState} from "react";
import {Alert, AlertTitle, ToggleButton, ToggleButtonGroup} from "@mui/material";
import EmailIcon from '@mui/icons-material/Email';
import SmsIcon from '@mui/icons-material/Sms';
import useActions from "../hooks/useActions";
import FormEmail from "../components/FormEmail";
import FormSMS from "../components/FormSMS";

function Mensajeria() {
    const [showAlert, setShowAlert] = useState(false);
    const [sendOption, setSendOption] = React.useState("email");
    const { destinatarios, enviarEmail, enviarSms } = useActions();

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

    const handleChange = (event, newOption) => {
        setSendOption(newOption);
    }

    const onFormEmailSubmit = useCallback(async (values) => {
        await enviarEmail(values);
        setShowAlert(true);
    }, [enviarEmail]);

    const onFormSMSSubmit = useCallback(async (values) => {
        await enviarSms(values);
        setShowAlert(true);
    }, [enviarSms]);

    return (
        <>
            <div className="toggle-buttons-container">
                <ToggleButtonGroup
                    color="primary"
                    value={sendOption}
                    exclusive
                    onChange={handleChange}
                >
                    <ToggleButton value="email">
                        <EmailIcon/><span className="button-span">{"Enviar E-Mail"}</span>
                    </ToggleButton>
                    <ToggleButton value="sms">
                        <SmsIcon/><span className="button-span">{"Enviar SMS"}</span>
                    </ToggleButton>
                </ToggleButtonGroup>
            </div>
            {showAlert && (
                <Alert severity="success" className="alert-container">
                    <AlertTitle>Exito!</AlertTitle>
                    Se ha enviado el mensaje
                </Alert>
            )}
            {sendOption === "email" && (<FormEmail destinatarios={destinatarios} onFormEmailSubmit={onFormEmailSubmit}/>)}
            {sendOption === "sms" && (<FormSMS destinatarios={destinatarios} onFormSMSSubmit={onFormSMSSubmit}/>)}
        </>
    )
}

export default Mensajeria;