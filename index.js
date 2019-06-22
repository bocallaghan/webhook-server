/* jshint node:true, esversion: 6*/

"use strict";
/*
 * Webhook-server - index.js
 * @Author: Brenton O'Callaghan
 * @Date: 22nd June 2019
 * @Description: A simple server responding and triggering
 *  			 shell scripts as a result of a ping from
 * 				 a webhook.
 */

var express = require('express'),
	bodyParser = require('body-parser'),
	app = express(),
	fs = require('fs'),
	app_info,
	port = 0,
	config;

// We add a timestamp to every console log
require('console-stamp')(console, 'HH:MM:ss.l');

// Try to load the info about this app for banner messages
try {
	app_info = JSON.parse(fs.readFileSync('package.json', 'utf8'));
} catch (error) {
	console.log("Could not read the package info file - integrity check failed - exiting");
	process.exit();
}

// Try to load the user-defined configuration file
try {
	config = JSON.parse(fs.readFileSync('config.json', 'utf8'));
} catch (error) {
	console.log("Could not open the configuration file - exiting");
	process.exit();
}

// Try to read the user-specified port number
try {
	port = config.port;
	if (port === 0) {
		console.log("Port is set to 0 defaulting to port 5001");
		port = 5001;
	} else if (port === 443) {
		console.log("Port 443 requires TLS security which is as yet unsupported - please update your configuration file)");
		process.exit();
	}
} catch (error) {
	console.log("Could not retrieve the port number - please check your config file");
	process.exit();
}

// Assign the module "BodyParser" to the express app
app.use(bodyParser.json());

// For every webhook config provided we setup the handler.
config.webhooks.forEach(e => {
	app.post(e.path, function (req, res) {

		const {
			exec
		} = require('child_process');
		exec(e.script, (err, stdout, stderr) => {
			if (err) {
				// node couldn't execute the command
				console.log("Error executing script " + e.script);
				return;
			}
			console.log("Webhook " + e.path + " successfully handled");
		});

		res.json({
			message: 'OK'
		});
	});
});

// Finally we setup the server to listen on the configured port.
var server = app.listen(port, function () {
	console.log("############################################################");
	console.log("Launching " + app_info.name + " " + app_info.version);
	console.log('Server is now listening on port ' + port);
	console.log("############################################################");
});