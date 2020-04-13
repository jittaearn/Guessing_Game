'use strict'; 
const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'pantip';
// Create a new MongoClient
const client = new MongoClient(url, { useUnifiedTopology: true });


// Constants
const PORT = 9000;
const HOST = '0.0.0.0';

// App
const app = express();
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/json', (request, response) => {
  response.status(200).json({"name": "Jitta"});
});


// Use connect method to connect to the Server
client.connect(function(err) {
  assert.equal(null, err);
  console.log("Successfully connected to server");

  const db = client.db(dbName);
  const col = db.collection('game');

  // get index html template
  app.get('/', async (req, res) => {
    // Get first two documents that match the query
    col.find({}).limit(1).toArray(function(err, docs) {
      assert.equal(null, err);
      // res.send(JSON.stringify(docs));
      res.render('index');
      client.close();
    });
  });
  //receive data when users hit the button
  app.post('/', async function(req, res) {
    console.log(req.body.name);
    res.render('index');
  })
});


app.listen(PORT);
console.log(`Running on http://localhost:${PORT}`);

