import Alert from "@mui/material/Alert";
import Slide from "@mui/material/Slide";

export default function SlideAlert({ showAlert, type, txt }) {
  return (
    <Slide in={showAlert} direction="right">
      <Alert
        variant="filled"
        sx={{ position: "absolute", bottom: "20px", left: "20px" }}
        severity={type}
      >
        {txt}
      </Alert>
    </Slide>
  );
}
