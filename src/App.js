import "./App.css";
import TodoList from "./components/TodoList";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { TodosContext } from "./contexts/TodosContext";
import AlertProvider from "./contexts/ShowAlertContext";
import { useState } from "react";

const initialToDO = [];

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
  const [todos, setTodos] = useState(initialToDO);

  return (
    <ThemeProvider theme={theme}>
      <div className="App" dir="rtl">
        <TodosContext.Provider value={{ todos, setTodos }}>
          <AlertProvider>
            <TodoList />
          </AlertProvider>
        </TodosContext.Provider>
      </div>
    </ThemeProvider>
  );
}

export default App;
