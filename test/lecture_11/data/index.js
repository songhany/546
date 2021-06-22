let currId = 0;
let todoListEntries = {};

function makeToDo (title, task) {
  if (!title) throw 'Must provide a titile';
  if (!task) throw 'Must povide a task';
  
  let newTask = {
    id: ++currId,
    title: title,
    task: task,
    done: false,
    notDone: true
  };

  todoListEntries[newTask.id] = newTask;
  return newTask;
};


function getToDo (id) {  // get a Single Task with taskId
  if (!todoListEntries[id]) throw 'No such entry exists';
  return todoListEntries[id];
};

function getAll () {  // get all Task
  return Object.keys(todoListEntries).map(function (key) {
    return todoListEntries[key];
  });
};

function getFinished () {
  return getAll().filter(function (entry) {
    return entry.done;
  });
};

function getUnfinished () {
  return getAll().filter(function (entry) {
    return !entry.done;
  });
};


function finishToDo (id) {  
  let entry = getToDo(id);  // entry means singleTask
  entry.done = true;
  entry.notDone = false;

  return entry;
};

function updateToDo (id, newTitle, newTask) {
  let entry = getToDo(id);
  if (newTitle) entry.title = newTitle;
  if (newTask) entry.task = newTask;

  return entry;
};

module.exports = {
  getToDo: getToDo,
  finishToDo: finishToDo,
  updateToDo: updateToDo,
  getAll: getAll,
  getFinished: getFinished,
  getUnfinished: getUnfinished,
  makeToDo: makeToDo
};

module.exports.makeToDo('Take Out The Trash', "Don't forget to take out the trash every Sunday and Wednesday night");
module.exports.makeToDo('Pay Cable Bill', 'Pay on the 15th of the month');
