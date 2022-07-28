import * as React from 'react';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/SaveAlt';
import Stack from '@mui/material/Stack';

export default function Buttons() {
  return (
      <Stack direction="row" justifyContent="center" alignItems="center" spacing={2}>
      <Button variant="outlined" startIcon={<DeleteIcon />}>
        Delete
      </Button>
      <Button variant="contained" endIcon={<SaveIcon />}>
        Save
      </Button>
    </Stack>
  );
}
