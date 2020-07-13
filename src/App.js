import React from "react";
import { makeStyles, ThemeProvider } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Dashboard from "./dashboard";
import theme from "./theme";
import "./App.css";

const useStyles = makeStyles(theme => ({
  root: {
    flex: 1
  },
  paper: {
    flex: 1
  },
  toolbar: theme.mixins.toolbar
}));

function App() {
  const classes = useStyles();
  return (
    // <div className="App">
    //   <ThemeProvider theme={theme}>
    //     <div className={classes.root}>
    //       <AppBar color="primary" position="fixed">
    //         <Toolbar>
    //           <Typography variant="h6">Saint Mary's University Students Data Dashboard</Typography>
    //         </Toolbar>
    //       </AppBar>
    //       <div className={classes.toolbar} />
          <Dashboard />
    //      </div>
    //    </ThemeProvider>
    //  </div>
  );
}

export default App;
