import {useEffect, useState} from "react";
import {Alert, AlertTitle, ToggleButton, ToggleButtonGroup, Skeleton, Grid} from "@mui/material";
import EmailIcon from '@mui/icons-material/Email';
import SmsIcon from '@mui/icons-material/Sms';
import FormEmail from "../components/FormEmail";
import FormSMS from "../components/FormSMS";
import {useAxios} from "use-axios-client";
import axiosInstance from "../utils/api";

function Mensajeria() {
    const [showAlert, setShowAlert] = useState(false);
    const [sendOption, setSendOption] = useState("email");

    const { data: destinatarios, loading } = useAxios({
        axiosInstance,
        url: '/destinatario'
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

    const handleChange = (event, newOption) => {
        setSendOption(newOption);
    }

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
            {destinatarios && sendOption === "email" && (<FormEmail destinatarios={destinatarios} setShowAlert={setShowAlert}/>)}
            {destinatarios && sendOption === "sms" && (<FormSMS destinatarios={destinatarios} setShowAlert={setShowAlert}/>)}
            {loading && (
                <Grid container spacing={4} justifyContent="center" sx={{marginTop: "25px"}} direction="column" alignItems="center">
                    <Grid item>
                        <Skeleton variant="rectangular" width={536} height={40} />
                    </Grid>
                    <Grid item>
                        <Skeleton variant="rectangular" width={536} height={40} />
                    </Grid>
                    <Grid item>
                        <Skeleton variant="rectangular" width={536} height={138} />
                    </Grid>
                </Grid>
            )}
        </>
    )
}

export default Mensajeria;