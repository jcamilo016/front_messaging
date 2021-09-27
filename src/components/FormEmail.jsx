import React from "react";
import { useFormik } from 'formik';
import {Button, InputAdornment, MenuItem, TextField} from "@mui/material";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import SubjectIcon from '@mui/icons-material/Subject';
import SendIcon from '@mui/icons-material/Send';

function FormEmail({ onFormEmailSubmit, destinatarios }){
    const [emailTo, setEmailTo] = React.useState("");
    const emailList = destinatarios.map( d => ({ value: d.email, label: d.email}));

    const handleEmailToChange = (event) => {
        setEmailTo(event.target.value);
        formik.setFieldValue("to", event.target.value);
    };

    const formik = useFormik({
        initialValues: {
            to: "",
            subject: "",
            text: "",
        },
        onSubmit: onFormEmailSubmit,
    });

    return (
        <div>
            <form onSubmit={formik.handleSubmit} className="mensajeria-form-container">
                <TextField
                    id="to"
                    select
                    value={emailTo}
                    label="Hacia"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <AlternateEmailIcon />
                            </InputAdornment>
                        ),
                    }}
                    onChange={handleEmailToChange}
                    helperText="Cuenta de correo a la que quiere enviar el mensaje"
                >
                    {emailList.map(g => (
                        <MenuItem key={g.value} value={g.value}>
                            {g.label}
                        </MenuItem>
                    ))}
                </TextField>
                <TextField
                    id="subject"
                    label="Asunto"
                    onChange={formik.handleChange}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SubjectIcon />
                            </InputAdornment>
                        ),
                    }}
                />
                <TextField
                    id="text"
                    label="Mensaje"
                    multiline
                    rows={6}
                    onChange={formik.handleChange}
                    helperText="Cuerpo del mensaje a enviar"
                />
                <Button variant="contained" size="large" className="create-button" type="submit">
                    <SendIcon/><span className="button-span">Enviar Email</span>
                </Button>
            </form>
        </div>
    )
}

export default FormEmail;