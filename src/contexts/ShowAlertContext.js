import { createContext, useState, useContext } from "react";
import SlideAlert from "../components/SlideAlert";

const ShowAlertContext = createContext({});

export default function AlertProvider({ children }) {
  const [showAlert, setShowAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");

  function showHideAlert(msg) {
    setAlertMsg(msg);
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 2000);
  }

  return (
    <>
      <ShowAlertContext.Provider value={{ showHideAlert }}>
        <SlideAlert showAlert={showAlert} txt={alertMsg} type={"success"} />
        {children}
      </ShowAlertContext.Provider>
    </>
  );
}

export const useAlert = () => useContext(ShowAlertContext);
