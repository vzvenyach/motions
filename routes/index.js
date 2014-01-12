// websocket connections
var connections = {};

// SockJS helper functions
var writeToAllSockets = function (data) {
  for (var key in connections) {
    if(connections.hasOwnProperty(key)) {
      if (connections[key]) {
        connections[key].write(JSON.stringify(data));
      }
    }
  }
};

var writeToSocket = function (data, socket) {
  socket.write(JSON.stringify(data));
};

var routes = function (app) {
  var sockets = app.get('sockets');

  app.get('/', function(req, res){
    res.render('index.html', { title: 'Express', body:"Hello World"});
  });

  // websockets
  sockets.on('connection', function (socket) {
    console.log('socket connected:', socket.id);

    // Add to list of connections
    connections[socket.id] = socket;
    console.log("Number of socket connections:", Object.keys(connections).length);

    // Start sending data
    setInterval(function () {
      var data = { msg: 'ping' };
      writeToSocket(data, socket);
    }, 2000);

    socket.on('close', function () {
      console.log('socket disconnected:', socket.id);

      // Remove from list of connections
      delete connections[socket.id];
      console.log("Number of socket connections:", Object.keys(connections).length);
    });

    socket.on('data', function (data) {
      console.log('received data:', data);
    });
  });

  // Send something to all sockets
  setInterval(function () {
    var data = { global: true, msg: 'Allez Cuisine!' };
    writeToAllSockets(data);
  }, 5000);
};

module.exports = routes;