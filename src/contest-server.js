/**
 * Nodejs Contest system for Seminarjs
 */

var bodyParser = require('body-parser'),
  User = require('./models/User.js');

module.exports = function (seminarjs) {
  console.log("[Start] Seminarjs Contest server");

  // Contest data, should also come from the db at some point
  // this might change quite a lot in future versions

  var contestData = [
  // Round 1
    {
      // Input can be fixed or a function
      'input': [
    '2 4 8 -3 18 -5',
    '1 29 -100 9983838 -4',
    '0 -78 3672 10000000 -10000000',
    '1e10 1e11 1e30 -1e30'
   ],
      // Output can be fixed or a function
      'output': [
    '24',
    '9983764',
    '3594',
    '-890000000000'
   ]
  },
  // Round 2
    {
      // Input can be fixed or a function
      'input': [
    'sasjdkfjalsdjf asdjfk asdfkasdjflkjasdkfjalsdfj jsadkf fasd',
    'a 4 -5 gjghg ·%&/·%$&$G >ZDdfw+`+'
   ],
      // Output can be fixed or a function
      'output': [
    '*****************************',
    '* sasjdkfjalsdjf            *',
    '* asdjfk                    *',
    '* asdfkasdjflkjasdkfjalsdfj *',
    '* jsadkf                    *',
    '* fasd                      *',
    '*****************************',
    '**************',
    '* a          *',
    '* 4          *',
    '* -5         *',
    '* gjghg      *',
    '* ·%&/·%$&$G *',
    '* >ZDdfw+`+  *',
    '**************'
   ]
  },
  // Round 3
    {
      // Input can be fixed or a function
      'input': [
    2178309,
    2178509,
    3524578,
    3524579,
    5702887,
    9227465,
    14930352,
    24157817
   ],
      // Output can be fixed or a function
      'output': [
    'si',
    'no',
    'si',
    'no',
    'si',
    'si',
    'si',
    'si'
   ]
  }
 ];

  // Now expose the API endpoints
  seminarjs.app.get('/contest/input', function (req, res) {
    res.setHeader('Content-Type', 'text/plain');

    var token = req.query.token;

    getUserFromToken(token, function (user) {
      if (!user) {
        res.status(401).send('Error: Invalid token');
        return;
      } else {
        res.send(contestData[user.contest.round].input.join("\n"));
      }
    });
  });

  var textParser = bodyParser.text();

  seminarjs.app.post('/contest/output', textParser, function (req, res) {
    res.setHeader('Content-Type', 'text/plain');

    if (typeof req.body !== 'string' || !req.body || req.body.length < 1) return res.status(400).send('Error: No output received');

    var token = req.query.token;

    getUserFromToken(token, function (user) {
      if (!user) {
        res.status(401).send('Error: Invalid token');
        return;
      }

      // Make sure body is a string
      req.body += "";

      // Validate the output
      var output = req.body.split("\n"),
        total = contestData[user.contest.round].output.length,
        correct = 0;

      res.write('Welcome ' + user.name + "\n");
      res.write('Line	|	Status' + "\n");

      for (var i = 0; i < total; i++) {
        var line = i + '	|	',
          status = 'FAIL';
        if (typeof output[i] !== 'undefined' && output[i] == contestData[user.contest.round].output[i]) {
          correct++;
          status = 'OK';
        } else {
          console.log("[Verify] User=" + user.name + ', Round=' + user.contest.round + ', output=' + output[i]);
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

      if (percentage > user.contest.progress) {
        user.contest.progress = percentage;
        user.contest.date = Date.now();
      }

      if (passed) {
        //var token = Math.floor(Math.random() * 10000) + 100;

        //user.contest.token = token;
        user.contest.round = user.contest.round + 1;
        user.contest.progress = 0;

        res.write('New token: ' + user.contest.token);
      }

      user.save(function (err) {
        if (err) return handleError(err);

        res.end();
      });
    });

  });

  // --------------------------------------- //
  //          Internal functions             //
  // --------------------------------------- //

  /**
   * Return the user associated with a given token
   * @param  {String} token User token
   * @return {Object}       User data object
   */
  function getUserFromToken(token, callback) {

    User.findOne({
      'contest.token': token
    }, function (err, person) {
      if (err) {
        console.log('[ERROR] ' + err);
        callback(false);
      }
      callback(person);
    });
  }
}