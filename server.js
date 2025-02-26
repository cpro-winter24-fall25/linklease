const express = require('express');
const bodyParser = require('body-parser');
const { User, Property, Payment, Review } = require('./models');
const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());

