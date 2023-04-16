/*
This file contains:
- Location class representaing package location
- Task class representing a particular task assigned to a worker
- some utility functions to make them easier to use
*/

// package location is defined by a block number and a section
export class Location {
  constructor(block_number, sector) {
    this.block_number = block_number;
    this.sector = sector;
  }
}

// this class contains the necessary information to assign and deliver a package
class Task {
  constructor(weight, location, destination, total_distance, package_id) {
    this.weight = weight;
    this.location = location;
    this.destination = destination;
    this.total_distance = total_distance;
    this.package_id = package_id;
  }
}

// this function deletes a task from the task list
export function DeleteTask(tasks, id) {
  return tasks.filter((task) => task.package_id !== id);
}

// this functions returns a task details list
export function GetTaskDetails(task) {
  var loc_str =
    "Block " + task.location.block_number.toString() + task.location.sector;
  var dest_str =
    "Block " +
    task.destination.block_number.toString() +
    task.destination.sector;

  return [
    { label: "Weight", value: `${task.weight}kg` },
    { label: "Location", value: loc_str },
    { label: "Destination", value: dest_str },
    { label: "Total Distance", value: `${task.total_distance}m` },
    { label: "Package ID", value: task.package_id },
  ];
}

// this function calculates the distance between locations A and B
export function GetDistance(locA, locB) {
  var block_distance = Math.abs(locA.block_number - locB.block_number);
  var sector_distance = Math.abs(locA.sector.localeCompare(locB.sector));
  return block_distance * 100 + sector_distance * 10;
}

// this function a task with random values and a given id
function RandomTask(id) {
  var weight = Math.floor(Math.random() * 30) + 1;
  var location = new Location(
    Math.floor(Math.random() * 5) + 1,
    String.fromCharCode(Math.floor(Math.random() * 5) + 65)
  );
  var destination = new Location(
    Math.floor(Math.random() * 5) + 1,
    String.fromCharCode(Math.floor(Math.random() * 5) + 65)
  );
  var total_distance = GetDistance(location, destination);
  var package_id = id;
  return new Task(weight, location, destination, total_distance, package_id);
}

// this function generates a list of random tasks
export function GetTasks(how_much) {
  var tasks = [];
  for (var i = 0; i < how_much; i++) {
    tasks.push(RandomTask(i));
  }
  return tasks;
}
