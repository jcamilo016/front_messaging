import React from "react";
import { useFormik } from 'formik';
import { TextField, InputAdornment, MenuItem, Button } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import PhoneIcon from '@mui/icons-material/Phone';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import WcIcon from '@mui/icons-material/Wc';
import AddCircleIcon from '@mui/icons-material/AddCircle';

const genres = [
    {
        value: 'HOMBRE',
        label: 'Hombre',
    },
    {
        value: 'MUJER',
        label: 'Mujer',
    }
];

function FormDestinatario({ onFormSubmit }){
    const [genero, setGenero] = React.useState('HOMBRE');

    const handleGenreChange = (event) => {
        setGenero(event.target.value);
        formik.setFieldValue("genre", event.target.value);
    };

    const formik = useFormik({
        initialValues: {
            userId: "",
            phone: "",
            name: "",
            email: "",
            genre: "HOMBRE",
        },
        onSubmit: onFormSubmit,
    });

    return (
        <div>
            <form onSubmit={formik.handleSubmit} className="destinatario-form-container">
                <TextField
                    id="userId"
                    label="Cédula"
                    onChange={formik.handleChange}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <VpnKeyIcon />
                            </InputAdornment>
                        ),
                    }}
                />
                <TextField
                    id="name"
                    label="Nombre del destinario"
                    onChange={formik.handleChange}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <AccountCircle />
                            </InputAdornment>
                        ),
                    }}
                />
                <TextField
                    id="phone"
                    label="Teléfono"
                    onChange={formik.handleChange}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <PhoneIcon />
                            </InputAdornment>
                        ),
                    }}
                />
                <TextField
                    id="email"
                    label="E-mail"
                    onChange={formik.handleChange}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <AlternateEmailIcon />
                            </InputAdornment>
                        ),
                    }}
                />
                <TextField
                    id="genre"
                    select
                    value={genero}
                    label="Género"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <WcIcon />
                            </InputAdornment>
                        ),
                    }}
                    onChange={handleGenreChange}
                    helperText="Por favor seleccione su género"
                >
                    {genres.map(g => (
                        <MenuItem key={g.value} value={g.value}>
                            {g.label}
                        </MenuItem>
                    ))}
                </TextField>
                <Button variant="contained" size="large" className="create-button" type="submit">
                    <AddCircleIcon/><span className="button-span">Crear Destinatario</span>
                </Button>
            </form>
        </div>
    )
}

export default FormDestinatario;