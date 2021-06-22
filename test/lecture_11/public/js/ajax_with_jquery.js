(function($) {

  let todoArea = $('#todo-area'),  // get a reference from todo-area in <div class="col-sm-12 col-md-6" id="todo-area"> 
  taskForm = $('#new-item-form'),  // <form id="new-item-form">
  taskName = $('#task-name'),
  taskDescription = $('#task-description');

  let newContent = $('#new-content');  // <div id="new-content"></div> in "home.handlebars"
  

  function bindEvents(task) {  // ❤这里的 task 是下面 todoArea.children().each() 中的 $(element)
    task.find('.finishItem').on('click', function(event) {  // ❤因为我们只想对 <a class="finishItem" data-id="{{id}}">Finish</a> 绑定events，所以我们要找到 $('#todo-area') 中的 <a class="finishItem" data-id="{{id}}">Finish</a>
      event.preventDefault();
      let currentLink = $(this);
      let currentId = currentLink.data('id');

      var requestConfig = {  // ❤ when people click that "Finish" link, it will go to router.post('/todo/compelete/:id', (req, res) => {}); and call todoData.finishToDo() to complete that task
				method: 'POST',
				url: '/api/todo/complete/' + currentId
			};  // ❤ hit router, which is router.post('/todo/complete/:id', (req, res) => { })
      
      $.ajax(requestConfig).then(function(resMessage) {  // ❤我可以使用这个方法完成 markCommentAsSolution, upvoteComment和downvoteComment.这里的 currentId 变成 commentId
        let newElement = $(resMessage);  // resMessage here is a singleTask Object returned by finishToDo()
        bindEvents(newElement);
        task.replaceWith(newElement);  // ❤ task是下面 todoArea.children().each() 中的 $(element), 所以才调用 jQuery method replaceWith()
      });
    });
  }

  // 对于那些没有添加一开始就存在的 todoItem, 我们绑定 events
  todoArea.children().each(function(index, element) {  //https://stackoverflow.com/questions/3024391/how-do-i-iterate-through-children-elements-of-a-div-using-jquery
    bindEvents($(element));  // ❤调用上面定义好的 bindEvents 对 $('#todo-area') 中的元素绑定 events
  });


  taskForm.submit(function(event) {
    event.preventDefault();
    let newTaskName = taskName.val();
    let newTaskDescription = taskDescription.val();

    if (newTaskName && newTaskDescription) {
      let useJson = false;

      if (useJson) {  // we make JSON
        var requestConfig = {
					method: 'POST',
					url: '/api/todo',
					contentType: 'application/json',
					data: JSON.stringify({
						name: newTaskName,
						description: newTaskDescription
					})
				};

        $.ajax(requestConfig).then(function(resMessage) {
          console.log(resMessage);
          newContent.html(resMessage.message);  // $('#new-content') 区域是为了添加 JSON
        });
      }
      else {  // we make HTML
        var requestConfig = {
					method: 'POST',
					url: '/api/todo.html',
					contentType: 'application/json',
					data: JSON.stringify({
						name: newTaskName,
						description: newTaskDescription
					})
				};

        $.ajax(requestConfig ).then(function(resMessage) {  //对于那些现在添加的todoItem，我们绑定 events
          console.log(resMessage);
          let newElement = $(resMessage);
          bindEvents(newElement);
          
          todoArea.append(newElement);  // $('#todo-area') 区域是为了添加 HTML，把才添加并且为 <a class="finishItem" data-id="{{id}}">Finish</a> 绑定了events的task添加到 $('#todo-area') 中
        });
      }
    }
  });
})(window.jQuery);