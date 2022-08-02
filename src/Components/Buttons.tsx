import * as React from 'react';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/SaveAlt';
import Stack from '@mui/material/Stack';
import { CodeReview } from '../Store/Types';

type ButtonProps = {
  id: string;
  comment: string;
  url: string;
  saveFn: (url: string, id: string, comment: string) => CodeReview[];
  deleteFn: (url: string, id: string) => CodeReview[];
};

class Buttons extends React.Component<ButtonProps> {
  handleDelete() {
    this.props.deleteFn(this.props.url, this.props.id);
  }

  handleSave() {
    this.props.saveFn(this.props.url, this.props.id, this.props.comment);
  }

  render() {
    return (
      <Stack direction="row" justifyContent="center" alignItems="center" spacing={2}>
        <Button variant="outlined" startIcon={<DeleteIcon />} onClick={this.handleDelete.bind(this)}>
          Delete
        </Button>
        <Button variant="contained" endIcon={<SaveIcon />} onClick={this.handleSave.bind(this)}>
          Save
        </Button>
      </Stack>
    );
  }
}

export default Buttons;
