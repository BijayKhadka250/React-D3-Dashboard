import React from "react";
import { makeStyles, ThemeProvider } from "@material-ui/core/styles";
import theme from "./theme";
import "./App.css";
import DashboardMain from "./dashboard";

const useStyles = makeStyles((theme) => ({
  root: {
    flex: 1,
  },
  paper: {
    flex: 1,
  },
  toolbar: theme.mixins.toolbar,
}));

function App() {
  const classes = useStyles();

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <div className={classes.root}>
          <div className={classes.toolbar} />
          <DashboardMain />
        </div>
      </ThemeProvider>
    </div>
  );
}

export default App;
