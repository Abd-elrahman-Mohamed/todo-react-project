import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckIcon from "@mui/icons-material/Check";
import { useContext, useState } from "react";
import { TodosContext } from "../contexts/TodosContext";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { ShowAlertContext } from "../contexts/ShowAlertContext";

export default function Todo({ task }) {
  const initialShowAlert = {
    addTask: false,
    editTask: false,
    warningDelete: false,
    deleteAlert: false,
  };
  const { todos, setTodos } = useContext(TodosContext);
  const { showAlert, setShowAlert } = useContext(ShowAlertContext);
  const [showDeleteModel, setShowDeleteModel] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editInputs, setEditInputs] = useState({
    titleInput: task.title,
    descriptionInput: task.description,
  });

  // event handlers
  const handelCheckClick = () => {
    //
    // if there is no incomplete task show congrats msg
    //
    const updatedTodos = todos.map((todo) => {
      if (todo.id === task.id) todo.isCompleted = !todo.isCompleted;
      return todo;
    });
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
    setTodos(updatedTodos);
  };

  const handleClickDeleteOpen = () => {
    setShowDeleteModel(true);
    setShowAlert(initialShowAlert);
    setShowAlert({ ...showAlert, warningDelete: true });
    setTimeout(() => {
      setShowAlert({ ...showAlert, warningDelete: false });
    }, 1000);
  };

  const handleDeleteClose = () => {
    setShowDeleteModel(false);
  };

  const handleDeleteConfirm = () => {
    const updatedTodos = todos.filter((todo) => todo.id !== task.id);
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
    setShowAlert(initialShowAlert);
    setShowAlert({ ...showAlert, deleteAlert: true });
    setTimeout(() => {
      setShowAlert({ ...showAlert, deleteAlert: false });
    }, 1000);
  };

  const handleClickEditOpen = () => {
    setShowEditModal(true);
  };

  const handleEditClose = () => {
    setShowEditModal(false);
  };

  const handelSubmitEditClick = () => {
    const newTasks = todos.map((todo) => {
      if (todo.id === task.id) {
        todo.title = editInputs.titleInput;
        todo.description = editInputs.descriptionInput;
      }
      setShowAlert(initialShowAlert);
      setShowAlert({ ...showAlert, editTask: true });
      setTimeout(() => {
        setShowAlert({ ...showAlert, editTask: false });
      }, 1000);
      return todo;
    });

    setTodos(newTasks);
    localStorage.setItem("todos", JSON.stringify(newTasks));
    setShowEditModal(false);
  };

  const handelTitleOnChange = (e) => {
    setEditInputs({ ...editInputs, titleInput: e.target.value });
  };

  const handelDescriptionOnChange = (e) => {
    setEditInputs({ ...editInputs, descriptionInput: e.target.value });
  };

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
            autoFocus
            required
            margin="dense"
            label="عنوان المهمة"
            fullWidth
            variant="standard"
            value={editInputs.titleInput}
            onChange={handelTitleOnChange}
          />
          <TextField
            autoFocus
            required
            margin="dense"
            label="تفاصيل المهمة"
            fullWidth
            variant="standard"
            value={editInputs.descriptionInput}
            onChange={handelDescriptionOnChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditClose}>اغلاق</Button>
          <Button onClick={handelSubmitEditClick}>تأكيد</Button>
        </DialogActions>
      </Dialog>
      {/* ==UpdateModal== */}
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
              <Typography variant="h6" sx={{ textAlign: "right" }}>
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
                onClick={handelCheckClick}
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
