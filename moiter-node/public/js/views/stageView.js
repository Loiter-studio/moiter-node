/* Stage View */

var app = app || {};
var count = 0;

app.StageView = Backbone.View.extend({
	tagName: 'div',
	className: 'stageForm',
	id: 'stageForm-'+(count++),
	template: _.template($("#stage-template").html()),
	events: {
		'click .addTask': 'addTask',
		//'click .changeStatus': 'changeStatus'
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
	
	addTask: function () {
		/*
		 * 弹出添加任务的窗口
		 */
		
		var newTask = {};
		
		/*
		 * 从输入框中读入数据
		 */
		newTask.time = getTime(),
		newTask.user_id = '1234',
		newTask.content = $('.input-content').innerText,
		newTask.status = 'Unfinished',
		newTask.deadline = $('.input-deadline');
					
		/*
		 * 验证函数
		 */
		if(newTask.user_id === '' || newTask.content === '' || newTask.deadline === ''){
			return "input form can't be empty";
		}
		
		/*
		 * 打包成createTask对象
		 */
		var createTask = {};
		createTask.stage_id = this.model.get('_id');
		createTask.task = newTask;
		 
		socket.emit("create-task", createTask);
		socket.on("create-task-response", function(data){
			if(data.message === "create task successfully"){
				(this.model.toJSON()).task.push(newTask);
			}
		});
		
	}
});