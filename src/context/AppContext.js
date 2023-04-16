import React from "react";
import AuthContext from "./AuthContext";
import { TaskProvider } from "../tasks/TaskContext";
import { CurrentTaskProvider } from "../context/CurrentTaskContext";
import { TasksDeclinedProvider } from "../context/TasksDeclinedContext";

export const AppContext = ({ children }) => {
  const [user, setUser] = React.useState(null);

  return (
    <TasksDeclinedProvider>
      <CurrentTaskProvider>
        <TaskProvider>
          <AuthContext.Provider value={{ user, setUser }}>
            {children}
          </AuthContext.Provider>
        </TaskProvider>
      </CurrentTaskProvider>
    </TasksDeclinedProvider>
  );
};
