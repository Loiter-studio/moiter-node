/* User Collection */

var app = app || {};

var UserList = Backbone.Collection.extend({
	model: app.User,
	localStorage: new Backbone.LocalStorage("userList");
});

app.Users = new UserList();
