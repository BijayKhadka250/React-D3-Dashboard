import { createMuiTheme, responsiveFontSizes } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#C5CAE9",
      main: "#3F51B5",
      dark: "#303F9F"
    },
    secondary: {
      light: "#BBDEFB",
      main: "#2196F3",
      dark: "#1976D2"
    }
  },
  typography: {
    fontFamily: ["Roboto", "Helvetica", "Arial", "sans-serif"],
    fontSize: 16,
    useNextVariants: true
  }
});
export default responsiveFontSizes(theme);
