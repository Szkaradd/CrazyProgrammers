/*
This file contains the function assigning the tasks to the workers
It takes into consideration:
- Current worker location (simplified, based on the previously delivered package)
- Employee's gender and preferations (longer distances or heavier packages)
*/

import { GetDistance } from '../data/tasks';
import { Gender, WorkPreference } from '../User';

export function AssignTask(tasks, loc, gender, pref) {
  var min_points = 100000;
  var best_task = tasks[0];
  var task_points = 0;
  for (let i = 0; i < tasks.length; i++) {
    task_points += GetDistance(loc, tasks[i].location);
    if (gender == Gender.FEMALE) task_points += tasks[i].weight * 3;
    if (pref == WorkPreference.SMALL_FAR_PACKAGES)
      task_points += tasks[i].weight * 5;
    else
      task_points += GetDistance(tasks[i].location, tasks[i].destination) / 2;

    if (task_points < min_points) {
      min_points = task_points;
      best_task = tasks[i];
    }
    task_points = 0;
  }
  return best_task;
}
