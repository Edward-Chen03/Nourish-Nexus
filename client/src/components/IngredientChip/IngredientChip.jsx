import * as React from 'react';
import Chip from '@mui/material/Chip';

export default function IngredientChip({label, index, onDelete}) {
  const handleClick = () => {
    console.info('You clicked the Chip.');
  };

  const handleDelete = () => {
    onDelete(index)
    console.info('You clicked the delete icon.');
  };

  return (
      <Chip
        sx={{width: "fit-content"}}
        label={label}
        variant="outlined"
        onClick={handleClick}
        onDelete={handleDelete}
      />
  );
}