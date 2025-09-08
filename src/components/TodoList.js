import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Todo from "./Todo";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { v4 as uuidv4 } from "uuid";
import { useState, useContext, useEffect } from "react";
import { TodosContext } from "../contexts/TodosContext";
import { ShowAlertContext } from "../contexts/ShowAlertContext";

export default function TodoList() {
  // states
  const { todos, setTodos } = useContext(TodosContext);
  const { showAlert, setShowAlert } = useContext(ShowAlertContext);

  const [taskInput, setTaskInput] = useState("");

  // variables
  const [filter, setFilter] = useState("all");

  const visibleTodos = todos.filter((todo) => {
    if (filter === "completed") return todo.isCompleted;
    if (filter === "inCompleted") return !todo.isCompleted;
    return true;
  });

  const todosJsx = visibleTodos.map((t) => <Todo key={t.id} task={t} />);
  //functions

  const storageTodos = JSON.parse(localStorage.getItem("todos")) || [];

  const handelAddClick = () => {
    const newTodo = {
      id: uuidv4(),
      title: taskInput,
      description: "",
      isCompleted: false,
    };

    const updatedTodos = [...todos, newTodo];

    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
    // continue showAlertContext
    /* 
 showAlert = {
  addTask: false,
  editTask: false,
  warningDelete: false,
  deleteAlert: false,
  }
    */
    setShowAlert(showAlert);
    setShowAlert({ ...showAlert, addTask: true });
    setTimeout(() => {
      setShowAlert({ ...showAlert, addTask: false });
    }, 1000);
    // set it to true + push the component
    setTaskInput("");
  };

  useEffect(() => {
    if (todos.includes(...storageTodos)) return;
    setTodos(storageTodos);
  }, []);

  return (
    <Container maxWidth="sm">
      <Card sx={{ minWidth: 275, maxHeight: "80vh", overflowY: "scroll" }}>
        <CardContent>
          <Typography sx={{ userSelect: "none" }} variant="h2">
            مهامي
          </Typography>
          <Divider sx={{ marginTop: "25px", marginBottom: "-20px" }} />

          {/* FilterButtons */}
          <ToggleButtonGroup
            color="primary"
            value={filter}
            exclusive
            onChange={(e, val) => val && setFilter(val)}
            aria-label="Platform"
            style={{ direction: "ltr", marginTop: "30px" }}
          >
            <ToggleButton value="inCompleted">غير المنجز</ToggleButton>
            <ToggleButton value="completed">المنجز</ToggleButton>
            <ToggleButton value="all">الكل</ToggleButton>
          </ToggleButtonGroup>
          {/* ==FilterButtons== */}

          {/* All Todos */}
          {todosJsx}
          {/* ==All Todos== */}

          {/* input + add btn */}
          <Grid
            container
            sx={{ marginTop: "20px" }}
            spacing={2}
            display={"flex"}
            justifyContent={"space-around"}
            alignItems={"center"}
          >
            <Grid size={8}>
              <TextField
                id="standard-basic"
                label="عنوان المهمه"
                variant="outlined"
                sx={{ width: "100%" }}
                value={taskInput}
                onChange={(e) => setTaskInput(e.target.value)}
              />
            </Grid>
            <Grid size={4}>
              <Button
                variant="contained"
                sx={{ width: "100%", height: "100%" }}
                onClick={() => {
                  handelAddClick();
                }}
                disabled={taskInput.trim() === ""}
              >
                اضافة
              </Button>
            </Grid>
          </Grid>
          {/* ==input + add btn== */}
        </CardContent>
      </Card>
    </Container>
  );
}
