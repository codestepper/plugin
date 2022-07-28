import TextField from '@mui/material/TextField';

export default function Comment() {
  return (
      <TextField
          id="outlined-multiline-static"
          label="Context"
          style={{ width: "100%" }}
          multiline
          rows={4}
          defaultValue="Additional context here"
      />
  );
}
