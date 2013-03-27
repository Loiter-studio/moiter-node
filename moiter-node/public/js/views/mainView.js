/*Main view*/


var app = app || {};

app.MainView = Backbone.View.extend({
	el: "#main",
	
	//statsTemplate: _.template($("#main-template").html()),
	
	events: {
	},
	
	initialize: function () {
		var currentUser = {};
		var currentProject = {};
		$('#project-name').html(currentProject.name+" Moiter项目管理");
		$('#front-header-producer').html('魏志华大煞笔');
		$('#front-header-pro-description').html(currentProject.summary+" 项目管理移动客户端");
		
		app.Stages.bind('add', this.addOne, this);
		app.Stages.bind('reset', this.addAll, this);
		//app.Stages.fetch();
		
		// 显示Stage
		var stage = new app.Stage();
		socket.emit("request-stage", {_id:1364285568656});
		socket.on("request-stage-response", function (data) {
			console.log(data);
			stage.set({_id: data._id,
						project_id: data.project_id,
						user_id: data.user_id,
						startTime: data.startTime,
						endTime: data.endTime,
						name: data.name,
						status: data.status,
						summary: data.summary,
						task: data.task
						});	

			for(var i = 0; i < stage.get("task").length; i++){
				var tempTask = new app.Task();
				tempTask.set({time: stage.get("task")[i].time,
						user_id: stage.get("task")[i].user_id,
						content: stage.get("task")[i].content,
						status: stage.get("task")[i].status,
						deadline: stage.get("task")[i].deadline
				});
				
				var taskview = new app.TaskView({model: tempTask});
				$("#stage-area-"+stage.get("_id")).append(taskview.render().el);
			}
		});
		var view = new app.StageView({model: stage});
		$("#stageForm-list").append(view.render().el);
	},

	addOne: function (stage) {
		var view = new app.StageView({model: app.Stage});
		$("#stageForm-list").append(view.render().el);
	},
	
	addAll: function () {
		app.Stages.each(this.addOne);
	}
});
