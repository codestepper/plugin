import TextField from '@mui/material/TextField';

type Props = {
  text: string;
};

export default function Comment(props: Props) {
  return (
    <TextField id="outlined-multiline-static" style={{ width: '100%' }} multiline defaultValue={props.text} rows={4} />
  );
}
