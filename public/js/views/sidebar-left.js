/* Left Sidebar View */

var app = app || {};

app.LeftSidebarView = Backbone.View.extend({
	el: '#sidebar-left',
	
	//statsTemplate: _.template($('#sidebar-left-template').html()),
	
	//
	events: {			
	},
	
	initialize: function () {
		//$('.pro-menu-picture').html(currentUser.avatar);
		$('#pro-user-name').html(currentUser.get("name"));
		$('#pro-user-position').html(currentUser.get("position"));
		
		//$('#pro-menu-head2').html("<li>我的项目</li>");
		
		this.listenTo(app.Projects, 'add', this.addOne);
		this.listenTo(app.Projects, 'reset', this.addAll);
		this.listenTo(app.Projects, 'all', this.render);		
		//app.Projects.fetch();

		//拉取当前用户的project列表
		//var project_id = new Array(1364284327759, 1364303294209, 1364303341662, 1364303405228, 1364303476321);
		var pListLength = currentUser.get("project_id").length;
		console.log(currentUser.toJSON());
		for(var i = 0 ; i < pListLength ; i++){		
			var proj = new app.Project();
			//console.log(data);
			proj.set({_id: currentUser.get("project_id")[i].pid, 						
						name: currentUser.get("project_id")[i].pname, 
						/*
						startTime: data.startTime, 
						endTime: data.endTime, 
						summary: data.summary
						*/});
						
			var view = new app.ProjectView({model: proj});
			$('#projectList').append(view.render().el);
		}
		
		/*
		socket.emit("request-project",{_id:project_id[i]});
		socket.on("request-project-response",function  (data) {
			// body...
			
			
			currentProject.set({
				_id: data._id,
				name: data.name,
				startTime: data.startTime,
				endTime: data.endTime,
				status: data.status,
				summary: data.summary
			});
			//在主界面显示project的信息
			$('#project-name').html(currentProject.get("name"));		
			$('#front-header-pro-description').html(currentProject.get("summary"));
		});	
		*/
		
		
		// 显示Stage		
		var stage_id = new Array(1364285568656, 1364285568657);
		for(var i = 0 ; i < stage_id.length ; i++) {			
			socket.emit("request-stage", {_id:stage_id[i]});
		}
		socket.on("request-stage-response", function (data) {
			var stage = new app.Stage();
			//console.log(data);
			stage.set({_id: data._id,
						project_id: data.project_id,
						user_id: data.user_id,
						startTime: data.startTime,
						endTime: data.endTime,
						name: data.name,
						status: data.status,
						summary: data.summary,
						task: data.task,
						index: data.index,
						});	
			
			var view = new app.StageView({model: stage});
			$("#stageForm-list").append(view.render().el);
			
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
	},
	
	//显示用户信息
	render: function () {
		this.$avatar.show();
		this.$name.show();
		this.$position.show();
		
		this.$proj-list-title.show();				
	},
	
	//创建项目视图并添加到项目列表中
	addOne: function () {			
		var view = new app.ProjectView({model: Project});
		$('#projectList').append(view.render().el);
	},
	
	//清空项目列表后重新渲染
	addAll: function () {
		this.$('#projectList').html('');
		app.Projects.each(this.addOne, this);
	},
	
	remove: function () {
		
	},
});
