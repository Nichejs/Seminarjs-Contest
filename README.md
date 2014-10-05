Seminarjs-Contest
=================

Live programming contest plugin for Seminarjs


## Installation
Make sure you already have a working Seminarjs installation. If you don't follow [these steps](https://github.com/Nichejs/Seminarjs) first. You can also take a look at the [demo repository](https://github.com/Nichejs/demo.seminarjs) for a working example.

Install the plugin package:

```
npm install seminarjs-contest --save
```

Now in your main server file, after `seminarjs.start()`, load the plugin:

```javascript
seminarjs.loadPlugin('contest');
```

##Usage
Once you have the server installed make sure it's running, you can clone the demo project and run `npm start`.

Finally, you need the users of the programming contest to download the client. It is very simple to use, and it only requires Nodejs on their machines ([Download Nodejs](http://nodejs.org/download/))

First install the client:
```
npm install seminarjs-contestclient -g
```
>If someone doesn't want it as a global package they can browse to the folder where they will be developing the solutions, and install it locally there. The package exposes an executable, so they need access to that executable from the location of the contest files.

To submit a solution all you have to do is:

```
seminarjsContest [host] [token] [solutionFilename.js]
```

##Contest

*As of now, the user data, tokens, and challenge data are hardcoded into the server. This will change in the upcoming version obviously.*

Now start developing the first solution. The first round will give you one String per line, and it expects you to output the first character of each.

A good starting point for the submission code would be something like this:

```javascript
var readline = require('readline');
var rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

rl.on('line', function (line) {
	// Process each line of data to accomplish the requirements
});
```

The only valid token at the moment is `123`. You can add more in the file `src/contest-server.js`.

When you complete the first round you will automatically advance to the second round, where you have to return the number of characters in each line.
