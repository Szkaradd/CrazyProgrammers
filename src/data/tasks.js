export class Location {
  constructor(block_number, sector) {
    this.block_number = block_number;
    this.sector = sector;
  }
}

class Task {
  constructor(weight, location, destination, total_distance, package_id) {
    this.weight = weight;
    this.location = location;
    this.destination = destination;
    this.total_distance = total_distance;
    this.package_id = package_id;
  }
}

export function DeleteTask(tasks, id) {
  return tasks.filter((task) => task.package_id !== id);
}

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

export function GetDistance(locA, locB) {
  var block_distance = Math.abs(locA.block_number - locB.block_number);
  var sector_distance = Math.abs(locA.sector.localeCompare(locB.sector));
  return block_distance * 100 + sector_distance * 10;
}

// get task with random weight(1,30), random location, random destination
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

export function GetTasks(how_much) {
  var tasks = [];
  for (var i = 0; i < how_much; i++) {
    tasks.push(RandomTask(i));
  }
  return tasks;
}

//export const tasks = GetTasks(TASKS_NUMBER);
