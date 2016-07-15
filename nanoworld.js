//Main server
var Nano = {
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
		Nano.sendPacket(ws, "connection", "success", {id: wsId});
	},
	broadcast: function(msg) {
		this.wss.clients.forEach(function each(client) {
			client.send(data);
		});
	},
	wsmsg: function(ws, msg) {
		try {
			var d = JSON.parse(msg);
		} catch(ex) {
			Nano.sendPacket(ws, "packet", "fail", "Invalid JSON");
			return;
		}
		
		if(d.act == "login") {
			if(Nano.Auth.login(d.data.user, d.data.pass)) {
				Nano.logins[d.data.user] = {"guid": ws.nano.guid, "room": ""};
				Nano.sendPacket(ws, "login", "success", "");
			} else Nano.sendPacket(ws, "login", "fail", "");
		} else if(d.act == "get") {
			if(d.data.get == "world") {
				if(d.data.type == "public") {
					Nano.r.fs.readFile("./worlds/public/" + d.data.name.replace(/\W/g, "") + ".json", "utf8", function(err, dat) {
						if(err) Nano.sendPacket(ws, "world", "fail", err);
						else Nano.sendPacket(ws, "world", "success", JSON.parse(dat));
					});
				} else if(d.data.type == "home") {
					
				}
			}
		}
	},
	sendPacket: function(ws, subj, stat, dat) {
		ws.send(JSON.stringify({subject: subj, status: stat, data: dat}));
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
};

module.exports = Nano;
