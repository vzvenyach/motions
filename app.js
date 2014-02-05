/**
 * Module dependencies.
 */
var express = require('express');
var http = require('http');
var path = require('path');

var app = express();
var cons = require('consolidate');

//Need to link up to MongoDB
var mongoose = require('mongoose');
var Motion = require('./motionsdb');
var db = mongoose.connect('mongodb://vdavez:test@dharma.mongohq.com:10018/motions');

// all environments
app.set('port', process.env.PORT || 5000);
app.set('views', path.join(__dirname, ''));
//app.set('view engine', 'jade');
//app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, './')));

// Registering underscore template
app.engine('html', cons.underscore);
app.set('view engine', 'html');

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

app.get('/motions', function (req, res){
  motion = new Motion();
  id = req.query["d"] + "-" + req.query["m"];
  console.log("GET: " + id);
  Motion.findById(id, {"_id":0}, function (err, doc) {
    res.send(doc);
  });
})

app.post('/motions', function (req, res) {
  motion = new Motion(req.body);
  motion["_id"] = motion["date"] + "-" + motion["motion_number"];
  console.log("POST: " + motion["_id"]);
  Motion.update({"_id":motion["_id"]},req.body, {upsert:true, strict:false}, function (err, doc) {
    if (err) {throw err}
      else {console.log("record added: " + doc)}
  })
  

// Start server
server.listen(app.get('port'), function() {
  console.log('Express/socket server listening on port ' + app.get('port'));
});