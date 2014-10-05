/**
 * Nodejs Contest system for Seminarjs
 */

var bodyParser = require('body-parser')

module.exports = function (seminarjs) {
	console.log("[Start] Seminarjs Contest server");

	// This will come from the database later on
	// It includes the contest round they are in
	var users = [
		{
			'id': 1,
			'name': 'test1',
			'level': 'user',
			'round': 0
		},
		{
			'id': 2,
			'name': 'test2',
			'level': 'user',
			'round': 1
		}
	];

	// Tokens array, mapping token => user_id
	// the user data already contains the round they are in
	var tokens = [
		{
			token: '123',
			user: 1
		}
	];

	// Contest data, should also come from the db at some point
	// this might change quite a lot in future versions

	var contestData = [
		// Round 1
		{
			// Input can be fixed or a function
			'input': [
				123456,
				91747,
				45717
			],
			// Output can be fixed or a function
			'output': [
				1,
				9,
				4
			]
		},
		// Round 2
		{
			// Input can be fixed or a function
			'input': [
				'abc'
			],
			// Output can be fixed or a function
			'output': [
				3
			]
		}
	];

	// Now expose the API endpoints

	seminarjs.app.get('/contest/input', function (req, res) {
		res.setHeader('Content-Type', 'text/plain');

		var token = req.query.token,
			user = getUserFromToken(token);

		if (!user) {
			res.status(401).send('Error: Invalid token');
			return;
		}

		res.send(contestData[user.round].input.join("\n"));
	});

	var textParser = bodyParser.text();

	seminarjs.app.post('/contest/output', textParser, function (req, res) {
		res.setHeader('Content-Type', 'text/plain');

		if (typeof req.body !== 'string' || !req.body || req.body.length < 1) return res.status(400).send('Error: No output received');

		var token = req.query.token,
			user = getUserFromToken(token);

		if (!user) {
			res.status(401).send('Error: Invalid token');
			return;
		}

		// Make sure body is a string
		req.body += "";

		// Validate the output
		var output = req.body.split("\n"),
			total = contestData[user.round].output.length,
			correct = 0;

		res.write('Line	|	Status' + "\n");

		for (var i = 0; i < total; i++) {
			var line = i + '	|	',
				status = 'FAIL';
			if (typeof output[i] !== 'undefined' && output[i] == contestData[user.round].output[i]) {
				correct++;
				status = 'OK';
			}
			res.write(line + status + "\n");
		}

		res.write('--------------------------' + "\n");

		var passed = false,
			percentage = correct * 100 / total,
			status = 'FAIL';

		if (percentage == 100) {
			passed = true;
			status = 'OK';
		}

		res.write('STATUS ' + percentage + '% ' + status + "\n");

		if (passed) {
			removeToken(user.id);
			var token = generateNewToken(user.id);
			updateUserData(user.id, 'round', user.round + 1);

			res.write('New token: ' + token);
		}
		res.end();
	});

	// --------------------------------------- //
	//          Internal functions             //
	// --------------------------------------- //

	/**
	 * Return the user associated with a given token
	 * @param  {String} token User token
	 * @return {Object}       User data object
	 */
	function getUserFromToken(token) {
		var numTokens = tokens.length,
			numUsers = users.length,
			usid = -1;

		for (var i = 0; i < numTokens; i++) {
			if (tokens[i].token == token) {
				usid = tokens[i].user;
				break;
			}
		}
		if (usid < 0) {
			return false;
		}
		// Return the user
		for (var i = 0; i < numUsers; i++) {
			if (users[i].id == usid) {
				return users[i];
			}
		}
		return false;
	}

	/**
	 * Update a field in a user model
	 * @param  {int} 	usid  User id
	 * @param  {String} data  Column to update
	 * @param  {String} value New value
	 * @return {boolean}      Whether it was updated
	 */
	function updateUserData(usid, data, value) {
		var numUsers = users.length,
			index = -1;

		for (var i = 0; i < numUsers; i++) {
			if (users[i].id == usid) {
				users[i][data] = value;
				return true;
			}
		}

		return false;
	}

	/**
	 * Remove all tokens associated with a user id
	 * @param  {int} 	usid User id
	 * @return {boolean}     True if deleted
	 */
	function removeToken(usid) {
		var numTokens = tokens.length;
		for (var i = 0; i < numTokens; i++) {
			if (tokens[i].user == usid) {
				delete tokens[i];
			}
		}
		return true;
	}

	/**
	 * Generate a new token for a user
	 * @param  {int} 	usid User id
	 * @return {String}      Token
	 */
	function generateNewToken(usid) {
		var token = Math.floor(Math.random() * 10000) + 100;
		tokens.push({
			'token': token,
			'user': usid
		});
		return token;
	}
}