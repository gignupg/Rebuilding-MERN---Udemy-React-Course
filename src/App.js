import React from 'react';
import Login from './components/auth/Login';
import Registration from './components/auth/Registration';
import AppLayout from './components/layout/AppLayout';
import { ThemeProvider } from '@material-ui/core/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import { blueGrey } from '@material-ui/core/colors';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";



const theme = createMuiTheme({
  palette: {
    primary: {
      main: blueGrey[900]
    }
  }
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/registration">
            <Registration />
          </Route>
          <Route path="/">
            <AppLayout />
          </Route>
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;
