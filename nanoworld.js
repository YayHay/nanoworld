//Main server
var Nano = module.exports = {};
Nano = {
	r: {
		fs: require('fs')
	},
	wss: null,
	logins: {},
	
	init: function(wss) {
		this.wss = wss;
	},
	connection: function(ws) {
		ws.on('message', function(msg) {
			Nano.wsmsg(ws, msg);
		});
		var wsId = Nano.makeGUID();
		ws.nano = {"guid": wsId};
		ws.send(JSON.stringify({id:wsId}));
	},
	broadcast: function(msg) {
		this.wss.clients.forEach(function each(client) {
			client.send(data);
		});
	},
	wsmsg: function(ws, msg) {
		try {
			var d = JSON.parse(ws);
		} catch(ex) {
			ws.send('{"act": "error", "data": "Invalid JSON"}');
			return;
		}
		
		if(d.act == "login") {
			if(Nano.Auth.login(d.data.user, d.data.pass)) {
				Nano.logins[d.data.user] = {"guid": ws.nano.guid};
			}
		}
	},
	makeGUID: function() {
		function s4() {
			return Math.floor((1 + Math.random()) * 0x10000)
				.toString(16)
				.substring(1);
		}
		return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
			s4() + '-' + s4() + s4() + s4();
	},
	
	Auth: {
		login: function(uname, pass) {
			//TODO: Actual login
			return true;
		}
	},
	Game: {
		World: {
			getPub: function(name) {
				
			},
			getRoom: function(name) {
				
			}
		}
	}
}
