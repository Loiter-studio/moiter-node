/* Task View */

var app = app || {};

app.TaskView = Backbone.View.extend({
	
	template: _.template($("#task-template").html()),
	events: {
		'click .changeStatus': 'changeStatus'
	},
	
	initialize: function () {
		this.model.bind('change', this.render, this);
		this.model.bind('destroy', this.remove, this);
	},
	
	render: function () {
		$(this.el).html(this.template(this.model.toJSON()));
		return this;
	},
	
	remove: function () {
		$(this.el).remove();
	},
	
	changeStatus: function () {
		var model = this.model;
		var currentStatus = 'finised'; //获得当前状态
		model.set({status: currentStatus});
	}
});