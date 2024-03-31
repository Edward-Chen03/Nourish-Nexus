import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

export default function DeleteButton({onClick}) {

  return (
      <IconButton aria-label="delete" onClick={onClick}>
        <DeleteIcon />
      </IconButton>
  );
}