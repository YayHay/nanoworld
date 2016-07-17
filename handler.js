/*
NanoWorld connection handler
For running both HTTP and WS servers on the same port
*/

console.log('Starting server');
var WebSocketServer = require('ws').Server,
	wss = new WebSocketServer({port: (process.env.PORT || 5000)}),
	nanoworld = require('./nanoworld.js'),
	firebase = require('firebase');

firebase.initializeApp({
	serviceAccount: JSON.parse(process.env.firebaseSA),
	databaseURL: process.env.firebaseDB
});
	
nanoworld.init(wss);
wss.on('connection', nanoworld.connection);
console.log('Server started');
