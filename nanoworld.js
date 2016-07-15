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
		var wsId = 
		ws.send(JSON.stringify({id:}));
	},
	broadcast: function(msg) {
		this.wss.clients.forEach(function each(client) {
			client.send(data);
		});
	},
	wsmsg: function(ws, msg) {
		ws.send(msg);
	},
	makeGUID: function() {
		function s4() {
			return Math.floor((1 + Math.random()) * 0x10000)
				.toString(16)
				.substring(1);
		}
		return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
			s4() + '-' + s4() + s4() + s4();
	}
}
