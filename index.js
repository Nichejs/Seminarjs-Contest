var path = require('path'),
	mime = require('mime');

module.exports = function (seminarjs) {
	if (typeof (seminarjs) == 'undefined') {
		console.error('[ERROR] Seminarjs not detected');
		process.exit(-1);
	}

	try {

		// Start the server
		var contestServer = require('./src/contest-server.js')(seminarjs);

		// Add the contest endpoint to show each user's progress
		seminarjs.app.use('/contest/', function (req, res, next) {
			if (req.method !== 'GET') {
				next();
				return;
			}
			res.sendFile(__dirname + "/public/" + req.path);
		});

		/*// Contest plugin endpoint for css/js client files
		seminarjs.app.use('/plugins/contest/', function (req, res, next) {
			if (req.method !== 'GET') {
				next();
				return;
			}
			res.sendFile(__dirname + "/public/" + req.path);
		});*/

	} catch (e) {
		console.error(e.getMessage());
	}
};