import * as React from 'react';
import TextField from '@mui/material/TextField';

type Props = {
  updateComment: (comment: string) => void;
  text: string;
};

class Comment extends React.Component<Props> {
  handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    this.props.updateComment(e.target.value);
  }

  render() {
    return (
      <TextField
        id="outlined-multiline-static"
        style={{ width: '100%' }}
        multiline
        rows={4}
        onChange={this.handleChange.bind(this)}
        value={this.props.text}
      />
    );
  }
}

export default Comment;
