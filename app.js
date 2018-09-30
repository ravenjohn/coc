const bodyParser = require('body-parser');
const express = require('express');
const moment = require('moment');
const http = require('http');
const path = require('path');
const api = require('./api');

const app = express();

app.disable('x-powered-by');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Log every request
app.use((req, res, next) => {
  console.log(moment().format(), req.method, req.url);
  next();
});

// API requests go through the submodule
app.use('/api', api);

// If a static file exists for the URL then send it
app.use(express.static(path.join(__dirname, 'static'), { index: false }));

// For all other URLs send the frontend `index.html`
app.get('/*', (req, res) => {
  res.redirect('index.html');
});

http.createServer(app).listen(3000);
console.log('HTTP server running on port', 3000);
