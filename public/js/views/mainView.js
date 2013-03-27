/*Main view*/


var app = app || {};

app.MainView = Backbone.View.extend({
	el: "#main",
	
	//statsTemplate: _.template($("#main-template").html()),
	
	events: {
	},
	
	initialize: function () {
		//显示用户信息
		$('#front-header-producer').html(currentUser.get("name"));
		
		//绑定事件
		app.Stages.bind('add', this.addOne, this);
		app.Stages.bind('reset', this.addAll, this);
		//app.Stages.fetch();
		
		
	},

	addOne: function (stage) {
		var view = new app.StageView({model: app.Stage});
		$("#stageForm-list").append(view.render().el);
	},
	
	addAll: function () {
		app.Stages.each(this.addOne);
	}
});
