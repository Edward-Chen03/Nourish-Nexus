import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function BasicSelect({label, options}) {
  const [goal, setGoal] = React.useState('');

  const handleChange = (event) => {
    setGoal(event.target.value);
    onSelectGoal(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 120, width: "75%"}}>
      <FormControl fullWidth>
        <InputLabel id="basic-select-label">{label}</InputLabel>
        <Select
          labelId="basic-select-label"
          id="basic-select"
          value={goal}
          label={label}
          onChange={handleChange}
        >
          {options.map((option, index) => {
            return <MenuItem key={index} value={option}>{option}</MenuItem>
          })}

        </Select>
      </FormControl>
    </Box>
  );
}