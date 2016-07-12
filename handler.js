/*
NanoWorld connection handler
For running both HTTP and WS servers on the same port
*/

console.log('Starting server');
var WebSocketServer = require('ws').Server,
	wss = new WebSocketServer({port: (process.env.PORT || 5000)}),
	nanoworld = require('./nanoworld.js');

nanoworld.init(wss);
//wss.on('connection', nanoworld.connection);
wss.on('connection', function(ws) {
	ws.send('Connected');
	ws.on('message', function(msg) {
		ws.send(msg);
	});
});
console.log('Server started');
