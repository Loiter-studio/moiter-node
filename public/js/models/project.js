/* Project Model */

var app = app || {};

app.Project = Backbone.Model.extend({
	initialize: function () {
		console.log("A new project has been created!");
		return "A new project has been created!";
	},		
	
	defaults: {
		_id: '',
		startTime: '',
		endTime: '',
		status: 'Unfinished',
		name: '',
		summary: ''			
	},
	
	validate: function (attributes) {
		if(attributes.project_id === ''){
			return "project_id can't be empty.";
		}else if(attributes.startTime > attributes.endTime){
			return "You can not end this task before it starts.";
		}
	}
});
