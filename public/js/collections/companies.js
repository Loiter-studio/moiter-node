/* User Collection */

var app = app || {};

app.CompanyList = Backbone.Collection.extend({
	model: app.Company,
	localStorage: new Backbone.LocalStorage("companyList");
});
