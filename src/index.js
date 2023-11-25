import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material';
import App from './App';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import DataProvider from './redux/store';

const customTheme = createTheme({
    palette: {
        primary: {
            main: '#4a154b',
            contrastText: '#fff'
        },
        secondary: {
            main: '#007a5a',
            contrastText: '#fff'
        }
    }
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <DataProvider>
        <ThemeProvider theme={customTheme}>
            <CssBaseline />
            <App />
        </ThemeProvider>
    </DataProvider>
);
