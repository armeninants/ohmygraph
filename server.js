#!/usr/bin/env node

/**
 * server.js
 * Executes the whole website
 * @author Armen Inants <armen@inants.com>
 */

'use strict';

const DEF_PORT = 8031;

const http = require('http');
const path = require('path');
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const router = express.Router();
const rp = require('request-promise');


const devMode = process.env.SB_ENV === 'development';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

const port = DEF_PORT;
app.set('port', port);


if (!devMode) {
  app.use(express.static(path.join(__dirname, '/client/dist')));
}

// Proxy
app.get('/proxy', (req, res) => {
	const endpoint = req.query.endpoint;
	const sparql = req.query.sparql;
	
	if (!endpoint) return res.status(400).json({ error: 'No endpoint' });

	const urlToEndpoint = endpoint + '?format=json&query=' + encodeURIComponent(sparql);

	rp(urlToEndpoint)
	.then((respStr) => {
		return res.status(200).send(respStr);
	})
	.catch((err) => {
		return res.status(400).json({ error: 'Unknown error' });
	});
});


// Static
if (devMode) {
  app.get('/*', require('express-http-proxy')('localhost:8080'));
} else {
  app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '/client/dist/index.html'));
  });
}

// Error handling
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: devMode ? err : {}
  });
});


// Create HTTP server.
const server = http.createServer(app);
server.listen(port);
console.log('Server running on localhost:', port);