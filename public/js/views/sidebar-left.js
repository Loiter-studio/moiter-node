/* Left Sidebar View */

var app = app || {};

app.LeftSidebarView = Backbone.View.extend({
	el: '#sidebar-left',
	
	//statsTemplate: _.template($('#sidebar-left-template').html()),
	
	//
	events: {			
	},
	
	initialize: function () {
		var currentUser = {};
		
		//$('.pro-menu-picture').html(currentUser.avatar);
		$('#pro-user-name').html(currentUser.name);
		$('#pro-user-position').html(currentUser.position);
		
		//$('#pro-menu-head2').html("<li>我的项目</li>");
		
		this.listenTo(app.Projects, 'add', this.addOne);
		this.listenTo(app.Projects, 'reset', this.addAll);
		this.listenTo(app.Projects, 'all', this.render);		
		//app.Projects.fetch();

		//拉取当前用户的project列表
		var project_id = new Array(1364284327759, 1364303294209, 1364303341662, 1364303405228, 1364303476321);
		for(var i = 0 ; i < project_id.length ; i++){		
			
			socket.emit("request-project",{_id:project_id[i]});
				
		}
		
		socket.on("request-project-response",function  (data) {
			// body...
			var proj = new app.Project();
			console.log(data);
			proj.set({_id: data._id, 
						startTime: data.startTime, 
						endTime: data.endTime, 
						name: data.name, 
						summary: data.summary});
						
			var view = new app.ProjectView({model: proj});
			$('#projectList').append(view.render().el);
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
