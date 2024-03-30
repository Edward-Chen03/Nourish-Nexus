import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function BasicSelect() {
  const [goal, setGoal] = React.useState('');

  const handleChange = (event) => {
    setGoal(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 120, width: "75%"}}>
      <FormControl fullWidth>
        <InputLabel id="basic-select-label">Fitness Goal</InputLabel>
        <Select
          labelId="basic-select-label"
          id="basic-select"
          value={goal}
          label="Fitness Goal"
          onChange={handleChange}
        >
          <MenuItem value={"Gain Weight"}>Gain Weight</MenuItem>
          <MenuItem value={"Lose Weight"}>Lose Weight</MenuItem>
          <MenuItem value={"Get Swoll"}>Get Swoll</MenuItem>
          <MenuItem value={"Maintain Weight"}>Maintain Weight</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}