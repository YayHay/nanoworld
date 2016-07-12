/*
NanoWorld connection handler
For running both HTTP and WS servers on the same port
*/

console.log('Attempting to start webserver');

var express = require('express');
var app = express();
var expressWs = require('express-ws')(app);
var phpExpress = require('php-express')({
	binPath: 'php'
});
var nanoworld = require('nanoworld');

app.set('port', (process.env.PORT || 5000));
app.set('views', __dirname + '/views');
app.engine('php', phpExpress.engine);
app.set('view engine', 'php');
app.all(/.+\.php$/, phpExpress.router);

app.get('/', function(request, response) {
	response.render('pages/index');
});
app.ws('/', function(ws, req) {
	nanoworld.connection(ws);
});
var aWss = expressWs.getWss('/');
nanoworld.init(aWss);

app.listen(app.get('port'), function() {
	console.log('Webserver running on port ', app.get('port'));
});