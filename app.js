//Connect to the MongoDB
require( './motionsdb' );

/**
 * Module dependencies.
 */
var express = require('express');
var http = require('http');
var path = require('path');

var app = express();
var cons = require('consolidate');

//Need to link up to MongoDB
//var redis = require('mongoose');

// all environments
app.set('port', process.env.PORT || 5000);
app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'jade');
//app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// Registering underscore template
app.engine('html', cons.underscore);
app.set('view engine', 'html');

//create MongoDB client
//var client = CLIENT!!! 

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// Create server and websockets
var server = require('http').createServer(app);
var opts = {sockjs_url: "https://d1fxtkz8shb9d2.cloudfront.net/sockjs-0.3.js"};
var sockjs = require('sockjs').createServer(opts);
sockjs.installHandlers(server, {prefix:'/sockjs'});
app.set('sockets', sockjs);

// Routes
var user = require('./routes/user');
app.get('/users', user.list);
require('./routes/index')(app);

app.get('/json', function (req, res) {
	res.render("static_form.html");
});

/*

//Ideally, I'd like to present the 


var motions = require('./routes/motions.js');

//This is the heart and soul of the motionsDB CRUD operations

app.get("/motions.json", function	(req, res) {
    //This is the going to be getting the applicable motions JSON object
    var jsonObject = motions.get(req);
    //res.json(jsonObject);
});

app.put("/motions.json", function (req, res) {
	//This is to create a motion record
});

app.post("/motions.json", function (req, res) {
	//This is to update a motion record
});

app.delete("/motions.json", function (req, res) {
	//This is to delete a motion record... should be rare
});
*/

// Start server
server.listen(app.get('port'), function() {
  console.log('Express/socket server listening on port ' + app.get('port'));
});