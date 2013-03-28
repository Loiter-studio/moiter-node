/* project View */

var app = app || {};

app.ProjectView = Backbone.View.extend({
	tagName: 'div',
	className: 'pro-menu-item',
	template: _.template($("#project-template").html()),
	events: {
		'click #proj-list-item': 'show'		//when click, call function "show"
	},
	
	initialize: function () {
		this.model.bind('change', this.render, this);
		this.model.bind('destroy', this.remove, this);
	},
	
	show: function () {
		//get the project id
		var project_id = this.model.get("_id");
		console.log(project_id);
		
		//request project by socket.io
		socket.emit("request-project",{_id:project_id});
	},
	
	render: function () {
		$(this.el).html(this.template(this.model.toJSON()));
		return this;
	},
	
	remove: function () {
		$(this.el).remove();
	},
	
	/*
	clear: function () {
		this.model.destroy();
	}
	*/
});
