import React from "react";
import AuthContext from "./AuthContext";
import { TaskProvider } from "../tasks/TaskContext";

export const AppContext = ({ children }) => {
  const [user, setUser] = React.useState(null);

  return (
    <TaskProvider>
      <AuthContext.Provider value={{ user, setUser }}>
        {children}
      </AuthContext.Provider>
    </TaskProvider>
  );
};
