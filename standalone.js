var express = require('express'),
	app = express(),
	contestServer = require('./index.js'),
	http = require('http'),
	mongoose = require('mongoose'),
	dotenv = require('dotenv');

dotenv.load();

try {
	// Seminar mockup for standalone contests
	var Seminar = {
			app: app,
			httpServer: http.createServer(app),
			mongo: mongoose.connect(process.env.MONGO),
			root: __dirname
		},
		port = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 3000;

	Seminar.httpServer.listen(port, function () {
		console.log("[START] Standalone Contest Server on port " + port);
		// Start the contest server
		var contest = contestServer(Seminar);

		require('./src/standalone-server.js')(Seminar);
	});

} catch (e) {
	console.error('[ERROR] ' + e.getMessage());
}