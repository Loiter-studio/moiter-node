
	//server =  require('http').createServer(app)
	//sio = require('socket.io').listen(server);
var db = require('mongoskin').db('mongodb://localhost/moiter');


var express = require('express')
  , http = require('http')
  , path = require('path');

var app = express();

/**
 * socket io
 */
var io = require('socket.io').listen(3001);

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});



io.sockets.on('connection' , function (socket) {
	// body...

	//login - request
	socket.on('request-login',function (userData){

		db.collection('users').findOne({name : userData.name , password : userData.password},function(err,result){
			if(result){
				result.isLogin = true;
				socket.emit('request-login-response',result);
			}
			else
				socket.emit('request-login-response',{isLogin : false});
		});
	});

	//create company，project，stage，task
	socket.on('create-company' , function (data){
		if(data._id === undefined)
			data._id = getCurrentTime();
		db.collection('companies').insert(data);
		db.collection('companies').findOne(data,function(err,result){
			if(result)
				socket.emit("create-company-response",{'code':'success','_id':result._id});
			else
				console.emit("create-company-response",{"code":'failed','message' : 'create company failde'});
		});

	});

	socket.on('create-project' , function  (data) {
		// body...
		if(data._id === undefined)
			data._id = getCurrentTime();
		tmpData = {'_id':data._id , 
				   'name':data.name , 
				   'startTime':data.startTime , 
				   'endTime':data.endTime,
				   'status':data.status,
				   'summary':data.summary};

		db.collection('projects').insert(tmpData);

		db.collection('projects').findOne(tmpData,function(err , result){
			if(result){
				db.collection('companies').update({'_id':data.company_id},{$addToSet:{project_id:result._id}});
				db.collection('companies').findOne({'_id':data.company_id,"project_id":result._id},function(err,result_1){
					if(result_1)
						socket.emit("create-project-response",{'code':'success',"_id":result._id});
					else{
						db.collection('projects').remove({'_id':result._id},true);
						socket.emit("create-project-response",{'code':'failed','message':"create project failed"});
					}
				});
			}
			else
				socket.emit("create-project-response",{'code':'failed','message':"create project failed"});
		});
	});

	socket.on('create-stage', function (data){
		data._id = getCurrentTime();
		db.collection('stages').insert(data);
		db.collection('stages').findOne(data,function(err , result){
				if(result)
					socket.emit('create-stage-response',{'code' : 'failed' , 'message' : 'create stage failed'});
				else
					socket.emit('create-stage-response',{'code': 'failed' , '_id' : result._id});
		});
	});

	socket.on('create-task' , function (data){
		db.collection('stages').update({"_id": data.stage_id},{$addToSet : {task : data.task}});
		db.collection('stages').findOne({"_id":data.stage_id},{"task":{$elemMatch:data.task}},function (err,result){
			if(result.task[0])
				socket.emit("create-task-response",{message : "create task successfully"});
			else
				socket.emit("create-task-response",{message : "create task failed"});
		});
	});


	//对于client请求返回相关数据

	socket.on('request-user', function (data) {
		db.collection('users').findOne({'_id': data._id},function(err,result){
			if(result)
				socket.emit('request-user-response',result);
		});
	});


	//return the content of the company
	socket.on('request-company', function (data) {
		db.collection('companies').findOne({'_id': data._id},function(err,result){
			if(result)
				socket.emit('request-company-response',result);
			else 
				socket.emit("request-company-response",{code:"failed"});
		});
	});


	// return the content of project
	socket.on('request-project', function (data){
		db.collection('projects').findOne({'_id': data.project_id},function(err,result){
			if(result)
				socket.emit('request-project-response',result);
			else
				socket.emit('request-stage-response',{"code":"failed" , "message":"searching failed"});

		});
	});

	//return the content of the stage
	socket.on('request-stage',function (data){
		db.collection('stages').findOne({'_id':data._id},function(err,result){
			if(result)
				socket.emit('request-stage-response',result);
			else
				socket.emit('request-stage-response',{"code":"failed" , "message":"searching failed"});
		});
	});

	//update data
	socket.on('update-task',function(data){
		db.collection('stages').update({"_id":data.stage_id},{$pull:{"task":data.oldTask}});
		db.collection('stages').findOne({"_id":data.stage_id},{"task":{$elemMatch:data.oldTask}},function(err,result){
			if(result.task){
				socket.emit("update-task-response",{code:"failed",message:"update task failed"});
			}
			else{
				db.collection('stages').update({"_id":data.stage_id},{$addToSet:{task:data.newTask}});
				db.collection('stages').findOne({"_id":data.stage_id},{"task":{$elemMatch:data.newTask}},function(err,result_1){
					if(result_1.task)
						socket.emit("update-task-response",{"code":"failed", "message":"update task successfully"});
					else
						socket.emit("update-task-response",{"code":"failed", "message":"update task failed"});
				});
			}
				
		});
	});
	socket.on('update-project-status',function(data){
		db.collection('projects').update({"_id":data._id},{$set:{"status":data.status}});
		db.collection('projects').findOne({"_id":data._id,"status":data.status},function(err,result){
			if(result)
				socket.emit("update-project-status-response",{"code":"success", "message":"update project status successfully"});
			else
				socket.emit("update-project-status-response",{"code":"failed", "message":"update project status failed"});
		});

	});
	socket.on('update-stage-status',function(data){

		db.collection('stages').update({"_id":data._id},{$set:{"status":data.status}});
		db.collection('stages').findOne({"_id":data._id,"status":data.status},function(err,result){
			if(result)
				socket.emit("update-stage-status-response",{"code":"success", "message":"update stage status successfully"});
			else
				socket.emit("update-stage-status-response",{"code":"failed", "message":"update stage status failed"});
		});
	});




	socket.on('delete-company',function(data){
		db.collection('companies').remove({"_id":data._id},true);
		db.collection('companies').findOne({"_id":data._id},function(err,result){
			if(result)
				socket.emit("delete-company-response",{"code":"failed","message":"delete failed"});
			else
				socket.emit("delete-company-response",{"code":"success","message":"delete successfully"});
		})
	});

	socket.on('delete-project',function(data){
		db.collection('projects').remove({"_id":data._id},true);
		db.collection('projects').findOne({"_id":data._id},function(err,result){
			if(result)
				socket.emit("delete-project-response",{"code":"failed","message":"delete failed"});
			else
				socket.emit("delete-project-response",{"code":"success","message":"delete successfully"});
		})
	});

	socket.on('delete-stage',function(data){
		db.collection('stages').remove({"_id":data._id},true);
		db.collection('stages').findOne({"_id":data._id},function(err,result){
			if(result)
				socket.emit("delete-stage-response",{"code":"failed","message":"delete failed"});
			else
				socket.emit("delete-stage-response",{"code":"success","message":"delete successfully"});
		});
	});
	socket.on('delete-task',function(data){
		db.collection('stages').update({"_id":data.stage_id},{$pull:{"task":data.task}});
		db.collection('stages').findOne({"_id":data.stage_id},{"task":{$elemMatch:data.task}},function(err,result){
			if(result.task)
				socket.emit("delete-task-response",{"code":"failed","message":"delete failed"});
			else
				socket.emit("delete-task-response",{"code":"success","message":"delete successfully"});
		});
	});


});
	

var getCurrentTime = function (){

	var now = new Date();
	var ss = now.getTime(); // from 1970/01/01  to now   (ms)
	//console.log(ss);
	return ss;
}


		