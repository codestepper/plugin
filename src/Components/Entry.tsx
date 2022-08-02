import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Comment from './Comment';
import Page from './Page';
import Buttons from './Buttons';
import { CodeReview, Anchor } from '../Store/Types';
import isEqual from 'lodash/isEqual';
import cloneDeep from 'lodash/cloneDeep';

type EntryProps = {
  url: string;
  data: CodeReview[];
  saveFn: (url: string, id: string, comment: string) => CodeReview[];
  deleteFn: (url: string, id: string) => CodeReview[];
  getFn: (url: string) => CodeReview;
};

type EntryState = {
  id: string;
  page: number;
  pages: number;
  comment: string;
  url: string;
  anchors: Anchor[];
};

const initialEntryState = {
  id: '',
  page: 1,
  pages: 1,
  comment: '',
  url: '',
  anchors: [],
};

class Entry extends React.Component<EntryProps, EntryState> {
  state: Readonly<EntryState> = initialEntryState;

  handlePaginationChange(_: any, page: number): void {
    let comment = '';
    let id = this.state.id;
    let anchor = this.state.anchors[page - 1];
    // If this pages anchor is set, fill the ID and comment
    if (anchor !== undefined) {
      comment = anchor.comment;
      id = anchor.id;
      chrome.tabs.update({ url: this.state.url + id });
    } else {
      // Unset the URL to avoid duplicates
      chrome.tabs.update({ url: this.state.url + '#' });
    }

    const newState = {
      id,
      page,
      comment,
    };

    this.setState(newState);
  }

  handleCommentUpdate(comment: string): void {
    this.setState({ comment });
  }

  componentDidUpdate(prevProps: EntryProps) {
    const codeReview = this.props.getFn(this.props.url);
    // Prevent a loop of state changes, define prevCodeReview to ensure we keep this datastructure updated
    if (prevProps.url === this.props.url && isEqual(this.state.anchors, codeReview.anchors)) {
      return;
    }

    let currentURL: URL;
    try {
      currentURL = new URL(this.props.url);
    } catch (e) {
      console.debug('error parsing url:', e);
      this.setState(initialEntryState);
      return;
    }

    let comment = '';
    let page = 1;
    let idx = 1;
    let found = false;
    // Attempt to set the data to the correct anchor
    for (let anchor of codeReview.anchors) {
      if (anchor.id === currentURL.hash) {
        comment = anchor.comment;
        page = idx;
        found = true;
        break;
      }
      idx++;
    }

    // Set the page to the last one if the anchor isn't found
    if (!found) {
      page = codeReview.anchors.length + 1;
    }

    const newState = {
      id: currentURL.hash,
      page,
      url: currentURL.origin + currentURL.pathname,
      pages: codeReview.anchors.length + 1,
      comment,
      anchors: cloneDeep(codeReview.anchors),
    };

    this.setState(newState);
    return;
  }

  render() {
    return (
      <Box sx={{ flexGrow: 1, width: 400, height: 300 }}>
        <Grid container p={2} spacing={1}>
          <Grid item xs={12}>
            <Comment updateComment={this.handleCommentUpdate.bind(this)} text={this.state.comment} />
          </Grid>
          <Grid item xs={12}>
            <Page
              currentPage={this.state.page}
              totalPages={this.state.pages}
              handlePaginationChange={this.handlePaginationChange.bind(this)}
            />
          </Grid>
          <Grid item xs={12}>
            <Buttons
              id={this.state.id}
              comment={this.state.comment}
              url={this.state.url}
              saveFn={this.props.saveFn}
              deleteFn={this.props.deleteFn}
            />
          </Grid>
        </Grid>
      </Box>
    );
  }
}

export default Entry;
