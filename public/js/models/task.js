/* Task Model */

var app = app || {};

app.Task = Backbone.Model.extend({
	//When an instance is created, this function will be called.
	initialize: function () {
		console.log("A new task has been created!");
		return "A new task has been created!";
	},
	
	// Default attributes of a Task.
	defaults: {
		time: '',
		user_id: '',
		content: '',
		status: 'Unfinished',
		deadline: ''
	},
	
	validate: function (attributes) {
		if(attributes.content === ''){
			return "Task content can't be empty.";
		}else if(attributes.start_time > attributes.end_time){
			return "You can not end this task before it starts.";
		}
	}
});
