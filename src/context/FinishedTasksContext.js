import React, { useState } from "react";

export const FinishedTasksContext = React.createContext();

export const FinishedTasksProvider = ({ children }) => {
  const [finishedTasks, setFinishedTasks] = useState(0);

  return (
    <FinishedTasksContext.Provider value={{ finishedTasks, setFinishedTasks }}>
      {children}
    </FinishedTasksContext.Provider>
  );
};
