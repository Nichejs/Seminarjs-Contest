var Contest = function (seminarjs) {
	if (typeof (seminarjs) == 'undefined') {
		console.error('[ERROR] Seminarjs not detected');
		process.exit(-1);
	}

	try {
		// Contest plugin endpoint for css/js client files
		seminarjs.app.use('/plugins/contest/', function (req, res, next) {
			if (req.method !== 'GET') {
				next();
				return;
			}
			res.sendFile(__dirname + "/public/" + req.path);
		});

		// Add the contest endpoint to show each user's progress
		seminarjs.app.use('/contest', function (req, res, next) {
			if (req.method !== 'GET') {
				next();
				return;
			}
			res.sendFile(__dirname + "/public/html/" + req.path);
		});

	} catch (e) {
		console.error(e.getMessage());
	}
};

Contest.prototype.start = function (options) {
	// Start the contest server
	var contestServer = require('./src/contest-server.js');
	contestServer(seminarjs);
}

var contest = module.exports = exports = new Contest();