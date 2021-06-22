const express = require('express');
const router = express.Router();
const todoData = require('../data');
const xss = require('xss');

// router.get('/', function (req, res) {
//   res.render('home', {pageTitle: 'So Much ToDo!', todoItems: todoData.getAll()});
// });

router.post('/todo', (req, res) => {
  todoData.makeToDo(req.body.name, req.body.description);
  res.json({ success: true, message: req.body.description });
});


router.post('/todo/complete/:id', function(req, res) { 
  const updatedData = todoData.finishToDo(parseInt(req.params.id));
  res.render('partials/todo_item', { layout: null, ...updatedData });
});


router.post('/todo.html', (req, res) => {
  const newTodo = todoData.makeToDo(req.body.name, req.body.description);
  res.render('partials/todo_item', { layout: null, ...newTodo })
});

module.exports = router;
