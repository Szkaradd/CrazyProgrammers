import React, { useState } from "react";

export const TasksDeclinedContext = React.createContext();

export const TasksDeclinedProvider = ({ children }) => {
  const [tasksDeclined, setTasksDeclined] = useState(0);

  return (
    <TasksDeclinedContext.Provider value={{ tasksDeclined, setTasksDeclined }}>
      {children}
    </TasksDeclinedContext.Provider>
  );
};
