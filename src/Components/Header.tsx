import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import { CloseSharp, GitHub } from '@mui/icons-material';

function Header() {
  return (
    <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={2}>
      <Box gridColumn="span 4" display="flex" justifyContent="flex-start" alignItems="flex-start">
        <IconButton style={{ color: '#000000' }} href="https://github.com/codestepper/" target="_blank">
          <GitHub />
        </IconButton>
      </Box>
      <Box gridColumn="span 4" display="flex" justifyContent="center" alignItems="center">
        <img style={{ width: '60%' }} alt="logo" src={require('./Assets/codestepper.png')} />
      </Box>
      <Box gridColumn="span 4" display="flex" justifyContent="flex-end" alignItems="flex-end">
        <IconButton>
          <CloseSharp onClick={() => chrome.runtime.sendMessage({ toggle: true })} />
        </IconButton>
      </Box>
    </Box>
  );
}

export default Header;
