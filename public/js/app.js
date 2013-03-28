/* Global View */

var app = app || {};
var socket = io.connect("http://localhost:3001");
var currentUser = new app.User();
var currentProject = new app.Project();

//get user_id from url
var user_id = "" + window.location.pathname.toString();
user_id = user_id.substr(1);
user_id = parseInt(user_id);
console.log(user_id);


socket.emit("request-user", {_id:user_id});
socket.on("request-user-response", function (data) {
	console.log(data);
	
	if(data.code === "failure"){
		//Login Failed
		alert("Login failed!");
	}else{
		//create currentUser
		
		currentUser.set({
			_id: data._id,
			isLogined: data.isLogined,
			name: data.name,
			position: data.position,
			sex: data.sex,
			about: data.about,
			project_id: data.project_id
		});
	
		console.log(currentUser.toJSON());
	
		//Login succeeded, kick things off by creating the `App`
		new app.LeftSidebarView();
		new app.MainView();		
	}
	
});

/*
//Validate the user
socket.emit("request-login", {name: "wayzh", password: "123"});

//socket on "request-user"
socket.on("request-login-response", function (data) {
	if(!data.isLogin){
		//Login Failed
		alert("Login failed!");
	}else{
		//create currentUser
		
		currentUser.set({
			_id: data._id,
			isLogined: data.isLogined,
			name: data.name,
			position: data.position,
			sex: data.sex,
			about: data.about,
			project_id: data.project_id
		});
	
		//Login succeeded, kick things off by creating the `App`
		new app.LeftSidebarView();
		new app.MainView();		
	}
});
*/

//socket on "request-stage"
socket.on("request-stage-response", function (data) {
	for(var s = 0 ; s < data.length ; s+=1){
		var stage = new app.Stage();
		stage.set({_id: data[s]._id,
					project_id: data[s].project_id,
					user_id: data[s].user_id,
					startTime: data[s].startTime,
					endTime: data[s].endTime,
					name: data[s].name,
					status: data[s].status,
					summary: data[s].summary,
					task: data[s].task,
					index: data[s].index,
					});	
		
		var view = new app.StageView({model: stage});
		$("#stageForm-list").append(view.render().el);		
		
		for(var i = 0; i < stage.get("task").length; i+=1){
			var tempTask = new app.Task();
			tempTask.set({time: stage.get("task")[i].time,
					user_id: stage.get("task")[i].user_id,
					content: stage.get("task")[i].content,
					status: stage.get("task")[i].status,
					deadline: stage.get("task")[i].deadline
			});
			
			var taskview = new app.TaskView({model: tempTask});
			$("#stage-area-"+stage.get("_id")).append(taskview.render().el);
			
			
			//$(document).ready(function(){
				//$("#stage-area-"+stage.get("_id")).hide();
				
			//});
		}
		
		//add toggle function to stage form
		/*
		$("#stage-header-"+stage.get("_id")).click(function(){
			$(this).next("#stage-area-"+stage.get("_id")).slideToggle("slow");
		});
		*/
	}
	if($(".stage-header").hasClass(".toggleFlag")){
			console.log("good");
	}else{
		$(".stage-header").click(function(){
			$(this).next(".stage-area").slideToggle("slow");	
			$(this).addClass(".toggleFlag");//add Class
		});
	}
});		


//socket on "request-project"
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

	//show project info on the mainview
	drawCircle(0.88);
	
	$('#project-name').html('');	//先清空再显示,直接显示有问题，原因未知
	$('#front-header-pro-description').html('');
	$('#project-name').html(currentProject.get("name"));		
	$('#front-header-pro-description').html(currentProject.get("summary"));
	
	//get and show stage info of current project
	$("#stageForm-list").html('');
	socket.emit("request-stage", {project_id:currentProject.get("_id")});
});	


