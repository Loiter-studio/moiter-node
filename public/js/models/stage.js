/* Task Collection */
var app = app || {};

app.Stage = Backbone.Model.extend({
	initialize: function () {
		console.log("A new Stage has been created!");
		return "A new stage has been created!";
	},		
	
	defaults: {
		_id: '',
		project_id: '',
		user_id: '',
		startTime: '',
		endTime: '',
		status: 'Unfinished',
		summary: '',
		task: new Array()
	},
	
	validate: function (attributes) {
		if(attributes.project_id === ''){
			return "project_id can't be empty.";
		}else if(attributes.user_id === ''){
			return "user_id can't be empty.";			
		}else if(attributes.stage_id === ''){
			return "stage_id can't be empty.";
		}else if(attributes.startTime > attributes.endTime){
			return "You can not end this stage before it starts.";
		}
	}
});
