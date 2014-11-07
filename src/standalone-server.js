/**
 * Standalone server, provides functionality like adding users,
 * admin settings for the contest... etc
 *
 * These are normally handled internaly from the admin system of Seminarjs
 */

var bodyParser = require('body-parser'),
	mongoose = require('mongoose');

var Schema = mongoose.Schema;

var userSchema = new Schema({
	name: String,
	contest: {
		round: Number,
		token: String
	}
});

var User = mongoose.model('User', userSchema);

module.exports = function (seminarjs) {
	seminarjs.app.get('/contest/admin.html', function (req, res, next) {
		if (req.method !== 'GET') {
			next();
			return;
		}
		res.sendFile(seminarjs.root + "/private/admin.html");
	});

	// Getting a list of users
	seminarjs.app.get('/contest/api/users', function (req, res) {
		User
			.find({}, function (err, results) {
				if (err) {
					console.log('[ERROR] ' + err);
					next();
					return;
				}

				var userMap = [];

				results.forEach(function (user) {
					userMap.push(user);
				});

				res.send(userMap);
			});
	});

	var jsonParser = bodyParser.json(),
		urlParser = bodyParser.urlencoded({
			extended: true
		});
	// Adding users
	seminarjs.app.post('/contest/api/users', jsonParser, urlParser, function (req, res) {
		var name = req.body.name;

		if (typeof (name) === 'undefined' ||  !name ||  name.length < 1) {
			next();
			return;
		}

		var user = new User({
			name: name,
			contest: {
				round: 1,
				token: name
			}
		});

		user.save(function (err) {
			if (err) {
				console.log('[ERROR] ' + err);
				next();
				return;
			}
			User.findById(user, function (err, doc) {
				if (err) {
					console.log('[ERROR] ' + err);
					next();
					return;
				}
				console.log(doc); // { name: 'mongodb.org', _id: '50341373e894ad16347efe12' }
				res.send(doc);
			})
		})
	});
};