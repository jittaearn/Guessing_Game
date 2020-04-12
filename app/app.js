'use strict'; 
const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
// Connection URL
const url = 'mongodb://mongodb:27017';

// Database Name
const dbName = 'pantip';
// Create a new MongoClient
const client = new MongoClient(url, { useUnifiedTopology: true });

const urlLogger = (request, response, next) => {
  console.log('Request URL:', request.url);
  next();
};

const timeLogger = (request, response, next) => {
  console.log('Datetime:', new Date(Date.now()).toString());
  next();
};

// Constants
const PORT = 9000;
const HOST = '0.0.0.0';

// App
const app = express();

app.use(urlLogger, timeLogger);
app.use(express.static('public'));

app.get('/', (request, response) => {
  // We don't need to explicitly use this handler or send a response
  // because Express is using the default path of the static assets
  // to serve this content
});

app.get('/json', (request, response) => {
  response.status(200).json({"name": "Robbie"});
});

app.listen(PORT, () => {
  console.log(`Running on http://${HOST}:${PORT}`)})
