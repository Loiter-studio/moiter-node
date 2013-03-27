/* Global View */

var app = app || {};
var socket = io.connect("http://localhost:3001");

// kick things off by creating the `App`

new app.MainView();
new app.LeftSidebarView();
