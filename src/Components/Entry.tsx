import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Comment from './Comment'
import Page from './Page'
import Buttons from './Buttons'

if (window.chrome !== undefined) {
  window.chrome.tabs.query({ active: true, lastFocusedWindow: true }, tabs => {
    let url = tabs[0].url;
    // use `url` here inside the callback because it's asynchronous!
    console.log(url)
  });
}

export default function Entry() {
  return (
    <Box sx={{ flexGrow: 1, width: 400, height: 300 }}>
      <Grid container p={2} spacing={1}>
        <Grid item xs={12}>
          <Comment />
        </Grid>
        <Grid item xs={12}>
          <Page />
        </Grid>
        <Grid item xs={12}>
          <Buttons />
        </Grid>
      </Grid>
    </Box>
  );
}
