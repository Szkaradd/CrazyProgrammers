/*
This file contains a global task context -
a list of possible tasks visible to all components
*/

import React, {useState} from 'react';
import { GetTasks } from '../data/tasks';

export const TaskContext = React.createContext();

export const TaskProvider = ({ children }) => {
    var initial_tasks = GetTasks(50);
    const [tasks, setTasks] = useState(initial_tasks);
  
    return (
      <TaskContext.Provider value={{ tasks, setTasks }}>
        {children}
      </TaskContext.Provider>
    );
  };