import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Comment from './Comment'
import Page from './Page'
import Buttons from './Buttons'
import { CodeReview } from '../Store/CodeReview';

type EntryProps = {
  url: string;
  data: CodeReview[]
};

type EntryState = {
  id: string;
  page: number;
  pages: number;
  comment: string;
  codeReview: CodeReview;
}

const initialEntryState = {
  id: "",
  page: 1,
  pages: 1,
  comment: "",
  codeReview: { url: "", anchors: [] },
}

class Entry extends React.Component<EntryProps, EntryState> {
  state: Readonly<EntryState> = initialEntryState;

  handlePaginationChange(_: any, page: number): void {
    let comment = ""
    let anchor = this.state.codeReview.anchors[page - 1]
    if (anchor !== undefined) {
      comment = anchor.comment;
    }

    const newState = {
      page,
      comment,
    };

    this.setState(newState);
  }

  componentDidUpdate(prevProps: EntryProps) {
    if (prevProps.url === this.props.url) {
      return;
    }

    for (let codeReview of this.props.data) {
      let currentURL: URL;
      let storedURL: URL;

      try {
        currentURL = new URL(this.props.url);
        storedURL = new URL(codeReview.url);
      } catch (e) {
        console.debug("error parsing url:", e);
        return;
      }

      const currentURLKey = currentURL.origin + currentURL.pathname;
      const storedURLKey = storedURL.origin + storedURL.pathname;

      if (currentURLKey === storedURLKey) {
        let page = this.state.page;
        if (page > codeReview.anchors.length) {
          page = 1;
        }

        const newState = {
          id: currentURL.searchParams.toString(),
          page: page,
          pages: codeReview.anchors.length + 1,
          comment: codeReview.anchors[page - 1].comment,
          codeReview,
        }

        this.setState(newState);
        return;
      }
    }

    this.setState(initialEntryState);
    return
  }

  render() {
    return (
      <Box sx={{ flexGrow: 1, width: 400, height: 300 }}>
        <Grid container p={2} spacing={1}>
          <Grid item xs={12}>
            <Comment text={this.state.comment} />
          </Grid>
          <Grid item xs={12}>
            <Page currentPage={this.state.page} totalPages={this.state.pages} handlePaginationChange={this.handlePaginationChange.bind(this)} />
          </Grid>
          <Grid item xs={12}>
            <Buttons />
          </Grid>
        </Grid>
      </Box>
    );
  }
}

export default Entry;
