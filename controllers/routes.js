var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({extended:false});

var subscribe = require('./subscribe');

module.exports = function(app) {

	// User requests home page
	app.get('/', function(req, res) {
		res.render('index');
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
