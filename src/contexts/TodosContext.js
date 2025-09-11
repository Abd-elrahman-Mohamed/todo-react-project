import { createContext, useReducer } from "react";
import todosReducer from "../Reducers/todosReducer";

export const TodosContext = createContext([]);

export const TodosProvider = ({ children }) => {
  const [todos, dispatch] = useReducer(todosReducer, []);
  return (
    <TodosContext.Provider value={{ todos, dispatch }}>
      {children}
    </TodosContext.Provider>
  );
};
