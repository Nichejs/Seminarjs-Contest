/**
 * Standalone server, provides functionality like adding users,
 * admin settings for the contest... etc
 *
 * These are normally handled internaly from the admin system of Seminarjs
 */

var bodyParser = require('body-parser'),
  mongoose = require('mongoose'),
  User = require('./models/User.js');

module.exports = function (seminarjs) {
  seminarjs.app.get('/contest/admin.html', function (req, res, next) {
    if (req.method !== 'GET') {
      next();
      return;
    }
    res.sendFile(seminarjs.root + "/private/admin.html");
  });

  seminarjs.app.get('/', function (req, res) {
    res.redirect('/contest');
  });

  seminarjs.app.get('/api/contest/reset', function (req, res) {
    User
      .find({})
      .exec(function (err, results) {
        if (err) {
          console.log('[ERROR] ' + err);
          next();
          return;
        }

        var userMap = [];

        results.forEach(function (user) {
          user.contest.progress = 0;
          user.contest.round = 0;
          user.contest.date = Date.now();
          user.save();

          userMap.push(user);
        });

        res.send(userMap);
      });
  });

  // Getting a list of users
  seminarjs.app.get('/api/contest/users', function (req, res) {
    User
      .find({})
      .sort('+contest.progress')
      .exec(function (err, results) {
        if (err) {
          console.log('[ERROR] ' + err);
          next();
          return;
        }

        var userMap = [];

        results.forEach(function (user) {
          user.contest.progress = Math.floor(user.contest.progress);
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
  seminarjs.app.post('/api/contest/users', jsonParser, urlParser, function (req, res) {
    var name = req.body.name;

    if (typeof (name) === 'undefined' ||  !name ||  name.length < 1) {
      next();
      return;
    }

    var user = new User({
      name: name,
      contest: {
        round: 0,
        token: name,
        progress: 0
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