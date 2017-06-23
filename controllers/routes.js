var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({extended:false});

var subscribe = require('./subscribe');
var mysql = require('./mysql');
var statData = require('./statdata');

module.exports = function(app) {

	// User requests home page
	app.get('/', function(req, res) {
		statData(function(stats) {
			res.render('index', {stats: stats});
		});
	});
	//----------------------------------------------------------------------------

	// User sends email to subscribe/unsubscribe
	app.post('/email', urlencodedParser, function(req, res) {
		subscribe(req, res, req.body.email);
	});
	//----------------------------------------------------------------------------

	// Debug redirect
	app.get('/email', function(req, res) {
		res.redirect('/');
	});
	//----------------------------------------------------------------------------

};
