import { v4 as uuidv4 } from "uuid";

export default function reducer(currentTodos, action) {
  switch (action.type) {
    case "added": {
      const newTodo = {
        id: uuidv4(),
        title: action.payload.taskInput,
        description: "",
        isCompleted: false,
      };
      const updatedTodos = [...currentTodos, newTodo];

      return updatedTodos;
    }
    case "delete": {
      const updatedTodos = currentTodos.filter(
        (todo) => todo.id !== action.payload.deleteSelectedTodo.id
      );
      return updatedTodos;
    }
    case "edit": {
      const newTasks = currentTodos.map((todo) => {
        if (todo.id === action.payload.editSelectedTodo.id) {
          todo.title = action.payload.editInputs.titleInput;
          todo.description = action.payload.editInputs.descriptionInput;
        }
        return todo;
      });

      return newTasks;
    }
    case "get": {
      const storageTodos = JSON.parse(localStorage.getItem("todos")) || [];
      return storageTodos;
    }
    case "checkMark": {
      const updatedTodos = currentTodos.map((todo) => {
        if (todo.id === action.payload.task.id) {
          return { ...todo, isCompleted: !todo.isCompleted };
        }
        return todo;
      });
      return updatedTodos;
    }
    default: {
      throw Error("unKnown Action" + action.type);
    }
  }
  return [];
}
