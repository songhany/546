const express = require('express');
const router = express.Router();
const todoData = require('../data');
const xss = require('xss');

router.post('/todo', function(request, response) {
	todoData.makeToDo(xss(request.body.name), xss(request.body.description));

	// response.json({ success: true, message: request.body.description });
	response.json({ success: true, message: xss(request.body.description) });
});

router.post('/todo/complete/:id', function(request, response) {
	const updatedData = todoData.finishToDo(parseInt(request.params.id));  // updatedData is singleTask
	response.render('partials/todo_item', { layout: null, ...updatedData });
});

router.post('/todo.html', function(request, response) {
	const newTodo = todoData.makeToDo(xss(request.body.name), xss(request.body.description));

	response.render('partials/todo_item', { layout: null, ...newTodo });
});

module.exports = router;
