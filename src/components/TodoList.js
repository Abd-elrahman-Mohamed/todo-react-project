// react imports
import { useState, useContext, useEffect, useMemo } from "react";
// mui imports
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
// id library
import { v4 as uuidv4 } from "uuid";
// components
import Todo from "./Todo";
// contexts
import { TodosContext } from "../contexts/TodosContext";
import { ShowAlertContext } from "../contexts/ShowAlertContext";

export default function TodoList() {
  // useContexts
  const { todos, setTodos } = useContext(TodosContext);
  const { showHideAlert } = useContext(ShowAlertContext);
  // states
  const [showDeleteModel, setShowDeleteModel] = useState(false);
  const [deleteSelectedTodo, setDeleteSelectedTodo] = useState(null);
  const [editSelectedTodo, setEditSelectedTodo] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [taskInput, setTaskInput] = useState("");
  const [editInputs, setEditInputs] = useState({
    titleInput: "",
    descriptionInput: "",
  });
  const [filter, setFilter] = useState("all");

  // variables
  const storageTodos = JSON.parse(localStorage.getItem("todos") ?? "[]");

  // another Hooks
  const visibleTodos = useMemo(() => {
    return todos.filter((todo) => {
      if (filter === "completed") return todo.isCompleted;
      if (filter === "inCompleted") return !todo.isCompleted;
      return true;
    });
  }, [todos, filter]);

  // handlers
  const handleAddClick = () => {
    const newTodo = {
      id: uuidv4(),
      title: taskInput,
      description: "",
      isCompleted: false,
    };

    const updatedTodos = [...todos, newTodo];

    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
    showHideAlert("تم اضافه المهمة بنجاح");
    setTaskInput("");
  };

  const handleOpenDeleteDialog = (todo) => {
    setDeleteSelectedTodo(todo);
    setShowDeleteModel(true);
  };
  const handleDeleteClose = () => {
    setShowDeleteModel(false);
  };

  const handleDeleteConfirm = () => {
    const updatedTodos = todos.filter(
      (todo) => todo.id !== deleteSelectedTodo.id
    );
    setTodos(updatedTodos);
    setShowDeleteModel(false);
    showHideAlert("تم حذف المهمة بنجاح");
  };

  const handleClickEditOpen = (todo) => {
    setEditSelectedTodo(todo);
    setEditInputs({
      titleInput: todo.title,
      descriptionInput: todo.description,
    });
    setShowEditModal(true);
  };

  const handleEditClose = () => {
    setShowEditModal(false);
  };

  const handleSubmitEditClick = () => {
    const newTasks = todos.map((todo) => {
      if (todo.id === editSelectedTodo.id) {
        todo.title = editInputs.titleInput;
        todo.description = editInputs.descriptionInput;
      }
      showHideAlert("تم تعديل المهمة بنجاح");
      return todo;
    });

    setTodos(newTasks);
    setShowEditModal(false);
  };

  const handleTitleOnChange = (e) => {
    setEditInputs({ ...editInputs, titleInput: e.target.value });
  };

  const handleDescriptionOnChange = (e) => {
    setEditInputs({ ...editInputs, descriptionInput: e.target.value });
  };

  useEffect(() => {
    if (todos.includes(...storageTodos)) return;
    setTodos(storageTodos);
  }, []);

  const todosJsx = visibleTodos.map((t) => (
    <Todo
      key={t.id}
      task={t}
      showDelete={handleOpenDeleteDialog}
      showEdit={handleClickEditOpen}
    />
  ));

  return (
    <>
      {/* Delete Modal */}
      <Dialog
        open={showDeleteModel}
        onClose={handleDeleteClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{ direction: "rtl" }}
      >
        <DialogTitle id="alert-dialog-title">
          {"هل انت متأكد من رغبتك بحذف المهمة؟"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            حيث انه لا يمكنك التراحع عن الحذف بعد اتمامه
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteClose}>اغلاق</Button>
          <Button onClick={handleDeleteConfirm} autoFocus>
            نعم, قم بلحذف
          </Button>
        </DialogActions>
      </Dialog>
      {/* ==Delete Modal== */}
      {/* UpdateModal */}
      <Dialog
        sx={{ direction: "rtl" }}
        open={showEditModal}
        onClose={handleEditClose}
      >
        <DialogTitle>تعديل مهمة</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="عنوان المهمة"
            fullWidth
            variant="standard"
            value={editInputs.titleInput}
            onChange={handleTitleOnChange}
          />
          <TextField
            margin="dense"
            label="تفاصيل المهمة"
            fullWidth
            variant="standard"
            value={editInputs.descriptionInput}
            onChange={handleDescriptionOnChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditClose}>اغلاق</Button>
          <Button onClick={handleSubmitEditClick}>تأكيد</Button>
        </DialogActions>
      </Dialog>
      {/* ==UpdateModal== */}
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

              <Grid sx={{ height: "100%" }} size={4}>
                <Button
                  sx={{ width: "100%", height: "100%" }}
                  variant="contained"
                  onClick={() => {
                    handleAddClick();
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
    </>
  );
}
