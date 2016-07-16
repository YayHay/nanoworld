//Main server
var Nano = {
	r: {
		fs: require('fs')
	},
	wss: null,
	logins: {},
	Worlds: {
		Public: {},
		Private: {}
	},
	playerData: {},
	
	init: function(wss) {
		Nano.wss = wss;
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
		Nano.wss.clients.forEach(function each(client) {
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
				Nano.logins[d.data.user] = {"guid": ws.nano.guid, "world": {name: "", type: ""}};
				Nano.playerData[d.data.user] = {
					pos: [0, 0],
					facing: 1,
					character: {}
				};
				
				Nano.sendPacket(ws, "login", "success", "");
			} else Nano.sendPacket(ws, "login", "fail", "");
		} else if(d.act == "get") {
			if(d.data.get == "world") {
				if(d.data.type == "public") {
					if(typeof Nano.Worlds.Public[d.data.name] === "object")
						Nano.sendPacket(ws, "world", "success", Nano.Worlds.Public[d.data.name].data);
					
					Nano.r.fs.readFile("./worlds/public/" + d.data.name.replace(/\W/g, "") + ".json", "utf8", function(err, dat) {
						if(err) Nano.sendPacket(ws, "world", "fail", err);
						else Nano.sendPacket(ws, "world", "success", JSON.parse(dat));
						
						Nano.Worlds.Public[d.data.name] = {
							data: JSON.parse(dat)
						};
					});
				} else if(d.data.type == "home") {
					
				}
			}
		} else if(d.act == "enter") {
			var user;
			for(var uname in Nano.logins) {
				if(Nano.logins[uname].guid == ws.nano.guid) {
					user = uname;
					break;
				}
			}
			Nano.logins[uname].world = d.data;
			Nano.sendPacket(ws, "enter", "success", "");
		} else if(d.act == "list") {
			if(d.data.list == "players") {
				var lst = [];
				for(var uname in Nano.logins) {
					if(Nano.logins[uname].world.type == d.data.world.type && Nano.logins[uname].world.name == d.data.world.name) {
						var a = Nano.playerData[uname];
						a.uname = uname;
						lst.push(a);
					}
				}
				Nano.sendPacket(ws, "list", "success", lst);
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
	
	getPlayerCharacter: function(uname) {
		//TODO: Actual fetch by username
		return {
			parts: {
				body: 1, head: 1, eyes: 1, mouth: 1, hair: 1, arms: 1, legs: 1
			},
			traits: {}
		};
	},
	
	Auth: {
		login: function(uname, pass) {
			//TODO: Actual login
			return true;
		},
		signup: function(uname, pass) {
		
		}
	},
	Game: {
		
	}
};

module.exports = Nano;
