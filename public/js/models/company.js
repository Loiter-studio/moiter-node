/* Company Model */

var app = app || {};

app.Company = Backbone.Model.extend({
	initialize: function () {
		console.log("A new Company has been created!");
		return "A new company has been created!";
	},		
	
	defaults: {
		_id: '',
		project_id: new Array(),
		name: '',
		about: ''
	}
	
	validate: function (attributes) {
		if(attributes.company_id === ''){
			return "project_id can't be empty.";
		}else if(attributes.name === ''){
			return "Company name can't be empty";
		}else if(attributes.startTime > attributes.endTime){
			return "You can not end this task before it starts.";
		}
	}
});
