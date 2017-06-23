var mysql = require('./mysql');
var validator = require('validator');

module.exports = function(req, res, email) {

	if(!email) {
		res.render('index', {error: 'Please enter your email !'});
		return;
	}

	if(email.length < 6 || email.length > 256) {
		res.render('index', {error: 'Email must containt between 6 and 256 characters !'});
		return;
	}

	if(!validator.isEmail(email)) {
		res.render('index', {error: 'Email is not valid !'});
		return;
	}

	// Checking if email already exists in database
	mysql("SELECT * FROM subscriber WHERE email='" + email + "';", function(err, rows, fieds) {

		// If it does not exits we save it
		if(rows.length == 0) {
			mysql("INSERT INTO subscriber (email) VALUES ('" + email + "');", function(err, rows, fields) {
				res.render('index', {info: 'Your email is added sucessfully to our subscribers list !'});
			});

		// If it exists we delete it
		} else {
			mysql("DELETE FROM subscriber WHERE email='" + email + "';", function(err, rows, fields) {
				res.render('index', {info: 'Your email is deleted from our subscribers list !'});
			});
		}
	});

};
