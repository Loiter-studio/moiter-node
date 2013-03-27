/* Global View */

var app = app || {};
var socket = io.connect("http://localhost:3001");
var currentUser = new app.User();
var currentProject = new app.Project();

//Validate the user
socket.emit("request-login", {name: "wayzh", password: "123"});
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
		console.log(currentUser.toJSON());
	
		//Login succeeded, kick things off by creating the `App`
		new app.MainView();		
		new app.LeftSidebarView();
	}
});



