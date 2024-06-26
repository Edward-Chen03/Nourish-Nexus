import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function BasicTextField ({label, required, onChange, type, defaultValue}) {

    const [value, setValue] = React.useState(defaultValue ? defaultValue : "");

    const handleChange = (event) => {
        onChange(event.target.value)
        setValue(event.target.value)
    }

    return (
        <>
        <TextField required={required} error={value.length > 70} 
            helperText={value.length > 70 ? "Too Long" : ""} onChange={handleChange} type = {type}
            sx={{width: "75%"}} id="outlined-basic" label={label} value={value} variant="outlined"
        />
        </>
    )  
};