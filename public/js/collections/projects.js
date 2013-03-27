/* User Collection */

var app = app || {};

var ProjectList = Backbone.Collection.extend({
	model: app.Project,
	localStorage: new Backbone.LocalStorage("projectList")
});

app.Projects = new ProjectList();
