/* Left Sidebar View */

var app = app || {};

app.LeftSidebarView = Backbone.View.extend({
	el: '#sidebar-left',
	
	events: {			
	},
	
	initialize: function () {
		//$('.pro-menu-picture').html(currentUser.avatar);
		$('#pro-user-name').html(currentUser.get("name"));
		$('#pro-user-position').html(currentUser.get("position"));
		
		this.listenTo(app.Projects, 'add', this.addOne);
		this.listenTo(app.Projects, 'reset', this.addAll);
		this.listenTo(app.Projects, 'all', this.render);		
		//app.Projects.fetch();

		//get Project List of currentUser
		var pListLength = currentUser.get("project_task_id").length;
		for(var i = 0 ; i < pListLength ; i+=1){		
			var proj = new app.Project();
			//console.log(data);
			proj.set({_id: currentUser.get("project_task_id")[i].pid, 						
						name: currentUser.get("project_task_id")[i].pname, 
			});
						
			var view = new app.ProjectView({model: proj});
			$('#projectList').append(view.render().el);
		}
	},
	
	//show user info
	render: function () {
		this.$avatar.show();
		this.$name.show();
		this.$position.show();
		
		this.$proj-list-title.show();				
	},
	
	//create project view and add it to project list
	addOne: function () {			
		var view = new app.ProjectView({model: Project});
		$('#projectList').append(view.render().el);
	},
	
	//clear project list and re-render
	addAll: function () {
		this.$('#projectList').html('');
		app.Projects.each(this.addOne, this);
	},
	
	remove: function () {
		
	},
});
