import React from 'react';
import './App.css';
import { Grid, Card, CssBaseline } from '@mui/material';
import { useTheme, ThemeProvider, createTheme } from '@mui/material';
import NavBar from './components/NavBar';
import QuestContainer from './components/QuestContainer';

import IconButton from '@mui/material/IconButton';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

const ColorModeContext = React.createContext({ toggleColorMode: () => {} });

function App() {
  const theme = useTheme();
  const colorMode = React.useContext(ColorModeContext);
  return (
    <div className="App" id='app'>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Grid container spacing={2} sx={{height: '100%'}}>
          <Grid item xs={12} sm={12}>
            <Card className='NavBar'>
              <NavBar />
              <IconButton sx={{ ml: 1 }} onClick={colorMode.toggleColorMode} color="inherit">
                {theme.palette.mode === 'light' ? <Brightness7Icon /> : <Brightness4Icon />}
              </IconButton>
            </Card>
          </Grid>
          <Grid item xs={12} sm={12} style={{height: '90%'}}>
            <QuestContainer/>
          </Grid>
        </Grid>
      </ThemeProvider>
    </div>
  );
}

export default function ToggleColorMode() {
  const [mode, setMode] = React.useState('dark');
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    [],
  );

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode],
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}