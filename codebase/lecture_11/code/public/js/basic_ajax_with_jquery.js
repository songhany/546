(function($) {
	// Let's start writing AJAX calls!

	var todoArea = $('#todo-area'),  // get a reference from todo-area in <div class="col-sm-12 col-md-6" id="todo-area"> 
		myNewTaskForm = $('#new-item-form'),  // <form id="new-item-form">
		newNameInput = $('#new-task-name'),
		newDecriptionArea = $('#new-task-description');

	function bindEventsToTodoItem(todoItem) {
		todoItem.find('.finishItem').on('click', function(event) {  // every time we should re-bind Evets to each of "Finish" <a> tag in todo_items.handlebars
			event.preventDefault();  // prevent default behavior of link
			var currentLink = $(this);
			var currentId = currentLink.data('id');

			var requestConfig = {  // ❤ when people click that "Finish" link, it will go to router.post('/todo/compelete/:id', (req, res) => {}); and call todoData.finishToDo() to complete that task
				method: 'POST',
				url: '/api/todo/complete/' + currentId
			};

			//❤ $.ajax(requestConfig) will hit the router on server																									
			$.ajax(requestConfig).then(function(responseMessage) {  // reponseMessage is HTML here, which is "response.render('partials/todo_item', { layout: null, ...updatedData });".
				var newElement = $(responseMessage);
				bindEventsToTodoItem(newElement);  // After getting response, we call bindEventsToTodoItem() to bind event 
				todoItem.replaceWith(newElement);  // replace with newElement we are adding
			});
		});
	}

	
	todoArea.children().each(function(index, element) {  // https://stackoverflow.com/questions/3024391/how-do-i-iterate-through-children-elements-of-a-div-using-jquery
		bindEventsToTodoItem($(element));
	});


	myNewTaskForm.submit(function(event) {
		event.preventDefault();
		var newName = newNameInput.val();  // Task Name string
		var newDescription = newDecriptionArea.val();  // Task Description string
		var newContent = $('#new-content');  //❤ <div id="new-content"></div> in "home.handlebars"

		if (newName && newDescription) {
			var useJson = false;  // If true we do json. If false we do html
			if (useJson) {
				var requestConfig = {
					method: 'POST',
					url: '/api/todo',
					contentType: 'application/json',
					data: JSON.stringify({
						name: newName,
						description: newDescription
					})
				};

				$.ajax(requestConfig).then(function(responseMessage) {  // responseMessage is JSON here, "response.json({ success: true, message: xss(request.body.description) });"
					console.log(responseMessage);
					newContent.html(responseMessage.message);  // only add json.message in page
					//                alert("Data Saved: " + msg);
				});
			} 
			else {
				var requestConfig = {
					method: 'POST',
					url: '/api/todo.html',
					contentType: 'application/json',
					data: JSON.stringify({
						name: newName,
						description: newDescription
					})
				};

				$.ajax(requestConfig).then(function(responseMessage) {  // reponseMessage is HTML here, which is "response.render('partials/todo_item', { layout: null, ...newTodo });"
					console.log(responseMessage);
					var newElement = $(responseMessage);  // responseMessage here is HTML
					bindEventsToTodoItem(newElement);

					todoArea.append(newElement);  // add todo_item's HTML into todo area 
				});
			}
		}
	});
})(window.jQuery);
