/*Main view*/


var app = app || {};

app.MainView = Backbone.View.extend({
	el: "#main",
	
	//statsTemplate: _.template($("#main-template").html()),
	
	events: {
	},
	
	initialize: function () {
		//show user info
		$('#front-header-producer').html(currentUser.get("name"));
		
		//bind events
		app.Stages.bind('add', this.addOne, this);
		app.Stages.bind('reset', this.addAll, this);
		//app.Stages.fetch();
		
		//request the newest project info and show
		var pListLength = currentUser.get("project_task_id").length;
		var currentPid = currentUser.get("project_task_id")[pListLength-1];
		socket.emit("request-project", {_id: currentPid});		
	},

	addOne: function (stage) {
		var view = new app.StageView({model: app.Stage});
		$("#stageForm-list").append(view.render().el);
	},
	
	addAll: function () {
		app.Stages.each(this.addOne);
	}
});
