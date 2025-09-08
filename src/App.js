import "./App.css";
import TodoList from "./components/TodoList";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { TodosContext } from "./contexts/TodosContext";
import { ShowAlertContext } from "./contexts/ShowAlertContext";
import { useState } from "react";
import SlideAlert from "./components/SlideAlert";

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
  const [showAlert, setShowAlert] = useState(ShowAlertContext);

  return (
    <ThemeProvider theme={theme}>
      <div className="App" dir="rtl">
        <TodosContext.Provider value={{ todos, setTodos }}>
          <ShowAlertContext.Provider value={{ showAlert, setShowAlert }}>
            <TodoList />
          </ShowAlertContext.Provider>
        </TodosContext.Provider>
      </div>
      {/* add task */}
      <SlideAlert
        showAlert={showAlert.addTask}
        txt={"اضافة المهمة بنجاح"}
        type={"success"}
      />
      {/* warning deleting task */}
      <SlideAlert
        showAlert={showAlert.warningDelete}
        txt={"هل انت متأكد من انك تريد حذف المهمة ؟"}
        type={"warning"}
      />
      {/* successfully task edited */}
      <SlideAlert
        showAlert={showAlert.editTask}
        txt={"تم تعديل المهمة بنجاح"}
        type={"success"}
      />
      {/* successfully task deleted */}
      <SlideAlert
        showAlert={showAlert.deleteAlert}
        txt={"تم حذف المهمة بنجاح"}
        type={"error"}
      />
    </ThemeProvider>
  );
}

export default App;
