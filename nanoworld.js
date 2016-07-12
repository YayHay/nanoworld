//Main server
module.exports = {
	wss: null,
	
	init: function(wss) {
		this.wss = wss;
	},
	connection: function(ws) {
		ws.on('message', function(msg) {
			module.exports.wsmsg(ws, msg);
		});
		ws.send('Connected');
	},
	broadcast: function(msg) {
		this.wss.clients.forEach(function each(client) {
			client.send(data);
		});
	},
	wsmsg: function(ws, msg) {
		ws.send(msg);
	}
}
