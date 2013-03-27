/* User Collection */

var app = app || {};

app.StageList = Backbone.Collection.extend({
	model: app.Stage,
	localStorage: new Backbone.LocalStorage("stageList")
});

app.Stages = new app.StageList();
