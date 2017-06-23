var mysql = require('./mysql');
var validator = require('validator');
var statData = require('./statdata');

module.exports = function(req, res, email) {

	if(!email) {
		statData(function(stats) {
			res.render('index', {
			 	error: 'Please enter your email !',
		 		stats: stats});
		});
		return;
	}

	if(email.length < 6 || email.length > 256) {
		statData(function(stats) {
			res.render('index', {
				error: 'Email must containt between 6 and 256 characters !',
				stats: stats});
		});
		return;
	}

	if(!validator.isEmail(email)) {
		statData(function(stats) {
			res.render('index', {
				error: 'Email is not valid !',
				stats: stats});
		});
		return;
	}

	// Checking if email already exists in database
	mysql("SELECT * FROM subscriber WHERE email='" + email + "';", function(err, rows, fieds) {

		// If it does not exits we save it
		if(rows.length == 0) {
			mysql("INSERT INTO subscriber (email) VALUES ('" + email + "');", function(err, rows, fields) {
				statData(function(stats) {
					res.render('index', {
						info: 'Your email is added sucessfully to our subscribers list !',
						stats: stats});
				});
				return;
			});

		// If it exists we delete it
		} else {
			if(rows[0].active === 1) {
				mysql("UPDATE subscriber SET active=0 WHERE email='" + email + "';", function(err, rows, fields) {
					statData(function(stats) {
						res.render('index', {
							info: 'Your email is deactivated from our subscribers list !',
							stats: stats});
						});
						return;
				});
			} else {
					mysql("UPDATE subscriber SET active=1 WHERE email='" + email + "';", function(err, rows, fields) {
						statData(function(stats) {
							res.render('index', {
								info: 'Your email is activated from our subscribers list !',
								stats: stats});
							});
							return;
					});
			}
		}
	});

};
