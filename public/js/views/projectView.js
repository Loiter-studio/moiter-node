/* project View */

var app = app || {};

app.ProjectView = Backbone.View.extend({
	tagName: 'div',
	className: 'pro-menu-item',
	template: _.template($("#project-template").html()),
	events: {
		//'click .projectListItem': 'show'
		//'click .del': 'clear'
	},
	
	initialize: function () {
		this.model.bind('change', this.render, this);
		this.model.bind('destroy', this.remove, this);
	},
	
	show: function (e) {
		//var project_id = this.model.get('_id');
		var project_id = "123456";
		
		socket.emit("request-project", project_id);
		socket.on("request-project-response", function(data){
			console.log(data);
			//
			//
			//
			//
			//
		});
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
