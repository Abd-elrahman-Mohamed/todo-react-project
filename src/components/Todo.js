import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckIcon from "@mui/icons-material/Check";
import { useContext, useEffect } from "react";
import { TodosContext } from "../contexts/TodosContext";

export default function Todo({ task, showDelete, showEdit }) {
  const { todos, setTodos } = useContext(TodosContext);

  // event handlers
  const handleCheckClick = () => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === task.id) todo.isCompleted = !todo.isCompleted;
      return todo;
    });
    setTodos(updatedTodos);
  };

  const handleClickDeleteOpen = () => {
    showDelete(task);
  };

  const handleClickEditOpen = () => {
    showEdit(task);
  };

  useEffect(() => {
    if (Array.isArray(todos)) {
      localStorage.setItem("todos", JSON.stringify(todos));
    }
  }, [todos]);

  return (
    <>
      <Card
        className="todoCard"
        sx={{
          minWidth: 275,
          background: "#283593",
          color: "white",
          marginTop: "5px",
        }}
        //
      >
        <CardContent>
          <Grid container>
            <Grid size={8}>
              {" "}
              <Typography
                variant="h5"
                sx={{
                  textAlign: "right",
                  textDecoration: task.isCompleted ? "line-through" : "none",
                }}
              >
                {task.title}
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  textAlign: "right",
                  textDecoration: task.isCompleted ? "line-through" : "none",
                }}
              >
                {task.description}
              </Typography>
            </Grid>

            <Grid
              size={4}
              display="flex"
              justifyContent="space-around"
              alignItems="center"
            >
              {" "}
              <IconButton
                onClick={handleCheckClick}
                className="icon-btn"
                sx={{
                  border: "3px solid #8bc34a",
                  borderRadius: "50%",
                  color: task.isCompleted ? "#fff" : "#8bc34a",
                  background: task.isCompleted ? "#8bc34a" : "white",
                }}
              >
                <CheckIcon />
              </IconButton>
              <IconButton
                className="icon-btn"
                sx={{
                  border: "3px solid #1769aa",
                  borderRadius: "50%",
                  color: "#1769aa",
                  background: "white",
                }}
                onClick={handleClickEditOpen}
              >
                <EditIcon />
              </IconButton>
              <IconButton
                className="icon-btn"
                sx={{
                  border: "3px solid #b23c17",
                  borderRadius: "50%",
                  color: "#b23c17",
                  background: "white",
                }}
                onClick={handleClickDeleteOpen}
              >
                <DeleteIcon />
              </IconButton>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
}
