import React, {useState} from "react";
import {useFormik} from 'formik';
import {Button, InputAdornment, MenuItem, TextField} from "@mui/material";
import PermPhoneMsgIcon from '@mui/icons-material/PermPhoneMsg';
import SendIcon from "@mui/icons-material/Send";

function FormSMS({destinatarios, onFormSMSSubmit }) {
    const [smsTo, setSmsTo] = useState("");
    const phoneList = destinatarios.map(d => ({value: d.phone, label: d.phone}));

    const handlePhoneToChange = (event) => {
        setSmsTo(event.target.value);
        formik.setFieldValue("phoneTo", event.target.value);
    };

    const formik = useFormik({
        initialValues: {
            phoneTo: "",
            message: "",
        },
        onSubmit: onFormSMSSubmit,
    });

    return (
        <div>
            <form onSubmit={formik.handleSubmit} className="mensajeria-form-container">
                <TextField
                    id="phoneTo"
                    select
                    value={smsTo}
                    label="Teléfono"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <PermPhoneMsgIcon />
                            </InputAdornment>
                        ),
                    }}
                    onChange={handlePhoneToChange}
                    helperText="Teléfono al que desea enviar el sms"
                >
                    {phoneList.map(g => (
                        <MenuItem key={g.value} value={g.value}>
                            {g.label}
                        </MenuItem>
                    ))}
                </TextField>
                <TextField
                    id="message"
                    label="Mensaje"
                    multiline
                    rows={3}
                    onChange={formik.handleChange}
                    helperText="Texto del mensaje a enviar"
                />
                <Button variant="contained" size="large" className="create-button" type="submit">
                    <SendIcon/><span className="button-span">Enviar Sms</span>
                </Button>
            </form>
        </div>
    )

}

export default FormSMS;