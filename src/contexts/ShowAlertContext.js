import { createContext } from "react";

export const ShowAlertContext = createContext({
  addTask: false,
  editTask: false,
  warningDelete: false,
  deleteAlert: false,
});
