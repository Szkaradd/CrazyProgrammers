import React from "react";
import AuthContext from "./AuthContext";
import { TaskProvider } from "../tasks/TaskContext";
import { CurrentTaskProvider } from "../context/CurrentTaskContext";

export const AppContext = ({ children }) => {
  const [user, setUser] = React.useState(null);

  return (
    <CurrentTaskProvider>
      <TaskProvider>
        <AuthContext.Provider value={{ user, setUser }}>
          {children}
        </AuthContext.Provider>
      </TaskProvider>
    </CurrentTaskProvider>
  );
};
