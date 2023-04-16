import React, { useState } from "react";

export const CurrentTaskContext = React.createContext();

export const CurrentTaskProvider = ({ children }) => {
  const [currentTaskVar, setCurrentTaskVar] = useState(null);

  return (
    <CurrentTaskContext.Provider value={{ currentTaskVar, setCurrentTaskVar }}>
      {children}
    </CurrentTaskContext.Provider>
  );
};
