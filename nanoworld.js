//Main server
module.exports = {
	aws: null,
	
	init: function(aws) {
		this.aws = aws;
	},
	connection: function(ws) {
		ws.on('message', function(msg) {
			whis.wsmsg(ws, msg);
		});
		ws.send('Connected');
	},
	broadcast: function(msg) {
		this.aws.clients.forEach(function(client) {
			client.send(msg);
		});
	},
	wsmsg: function(ws, msg) {
		
	}
}