/*
NanoWorld connection handler
For running both HTTP and WS servers on the same port
*/

var WebSocketServer = require('ws').Server,
	wss = new WebSocketServer({port: (process.env.PORT || 5000)}),
	nanoworld = require('nanoworld');

nanoworld.init(wss);
wss.on('connection', nanoworld.connection);
