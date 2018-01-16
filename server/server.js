#!/usr/bin/env node

/**
 * server.js
 * Web server application
 * @author Armen Inants <armen@inants.com>
 */

'use strict';
const http = require('http');
const path = require('path');
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const router = express.Router();
const rp = require('request-promise');
require('dotenv').config({path: path.join(__dirname, '/../')});

const CLIENT_PUBLIC_DIR = path.join(__dirname, '/../client/dist');
const devMode = process.env.SB_ENV === 'development';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

const port = process.env.SB_PORT || 8031;
app.set('port', port);


if (!devMode) {
  app.use(express.static(CLIENT_PUBLIC_DIR));
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

// Proxy
app.post('/contactus', (req, res) => {
  const name = req.body.name;
	const msg = req.body.msg;

  const nameValidator = (name) => { return !name || (typeof name === 'string' && name.length <= 30) };
  const msgValidator = (msg) => { return typeof msg === 'string' && msg.length >= 3 && msg.length <= 500 };
	
  if (!nameValidator(name)) return res.status(400).json({ error: 'Invalid name' });
	if (!msgValidator(msg)) return res.status(400).json({ error: 'Missing or invalid message' });

  // send an email
  const mailer = require('./server/helpers/mailer');

  mailer.sendAnonymousEmail({
    senderName: name,
    msg: msg, 
  })
  .then(() => {
		return res.status(200).json({ message: 'Sent successfully.' });
  })
  .catch((err) => {
		return res.status(400).json({ error: 'Could not send the message.' });
  });
});


// Static
if (devMode) {
  app.get('/*', require('express-http-proxy')('localhost:8080'));
} else {
  app.get('/*', (req, res) => {
    res.sendFile(path.join(CLIENT_PUBLIC_DIR, '/index.html'));
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
