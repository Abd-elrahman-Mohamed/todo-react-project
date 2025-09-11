import "./App.css";
import TodoList from "./components/TodoList";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import AlertProvider from "./contexts/ShowAlertContext";
import { TodosProvider } from "./contexts/TodosContext";

const theme = createTheme({
  typography: {
    fontFamily: ["alexandria"],
  },
  palette: {
    primary: {
      main: "#ff3d00",
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App" dir="rtl">
        <AlertProvider>
          <TodosProvider>
            <TodoList />
          </TodosProvider>
        </AlertProvider>
      </div>
    </ThemeProvider>
  );
}

export default App;
