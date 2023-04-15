import { useContext } from 'react';
import { TaskContext } from './TaskContext';
import { GetDistance } from '../data/tasks';


export function AssignTask(loc, gender, pref) {
    const [tasks] = useContext(TaskContext);

    var min_points = 100000;
    var best_task = null;
    var task_points = 0;
    for (let i = 0; i < tasks.length; i++) {
        task_points += GetDistance(loc, tasks[i].location);
        if (gender == "F") task_points += tasks[i].weight * 3;
        if (pref == "FAR") task_points += tasks[i].weight * 5;
        if (pref == "HEAVY") task_points += GetDistance(tasks[i].location, tasks[i].destination) / 2;
        if (task_points < min_points) {
            min_points = task_points;
            best_task = tasks[i];
        }
        task_points = 0;
    }
    return best_task;
}