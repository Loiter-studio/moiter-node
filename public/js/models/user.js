/* User Model */

var app = app || {};

//User Model has 'user_id', 'project_id[]', 'isLogined' .. attributes.
app.User = Backbone.Model.extend({
	//When an instance is created, this function will be called.
	initialize: function () {
		console.log("A new user has been created!");
		return "A new user has been created!";
	},
	
	// Default attributes of a user.
	defaults: {
		project_id: new Array(),
		_id: '',
		isLogined: false,
		name: '',
		position: '',
		sex: '',
		about: ''
	},
	
	validate: function (attributes) {
		if(attributes.name === ''){
			return "username can't be empty.";
		}else if(attributes.sex === ''){
			return "sex can't be empty.";
		}
	},
	
	// Change the status 'isLogined' to 'true' after a user logins.
	login: function () {
		this.set({isLogined: true});
	},
	
	// Change the status 'isLogined' to 'false' after a user logouts.
	logout: function () {
		this.set({isLogined: false});
	}
});