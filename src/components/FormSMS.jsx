import React, {useState} from "react";
import {useFormik} from 'formik';
import {InputAdornment, MenuItem, TextField} from "@mui/material";
import LoadingButton from '@mui/lab/LoadingButton';
import PermPhoneMsgIcon from '@mui/icons-material/PermPhoneMsg';
import SendIcon from "@mui/icons-material/Send";
import { useLazyAxios } from "use-axios-client";
import axiosInstance from "../utils/api";

function FormSMS({destinatarios, setShowAlert }) {
    const [smsTo, setSmsTo] = useState("");
    const phoneList = destinatarios.map(d => ({value: d.phone, label: `${d.phone} - ${d.name}`}));

    const [saveData, { loading }] = useLazyAxios({
        axiosInstance,
        url: "mensajeria/enviarSms",
        method: "POST"
    });

    const onFormSMSSubmit = (values) => {
        saveData(values)
            .then(res => {
                setShowAlert(true);
            })
    }

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
                <LoadingButton
                    variant="contained"
                    size="large"
                    className="create-button"
                    type="submit"
                    startIcon={<SendIcon/>}
                    loadingPosition="start"
                    loading={loading} >
                        Enviar Sms
                </LoadingButton>
            </form>
        </div>
    )

}

export default FormSMS;