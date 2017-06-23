var mysql = require('./mysql');

module.exports = function(callback) {

	var stats = {
		subs: 0,
		posts: 0,
		upvts: 0
	}

	mysql("SELECT * FROM subscriber", function(err, rows, fields) {
		if(rows.length > 0) stats.subs = rows.length;
		mysql("SELECT * FROM post", function(err, rows, fields) {
			if(rows.length > 0) stats.posts = rows.length;
			mysql("SELECT * FROM scraps", function(err, rows, fields) {
				if(rows.length > 0) {
					for(var i=0;i<rows.length;i++) {
						stats.upvts += rows[i].upvotes;
					}
				}
				return callback(stats);
			});
		});
	});

};
