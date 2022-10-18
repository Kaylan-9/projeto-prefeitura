const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

//Routers
const index = require('./src/routers/index');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors({origin: '*'}));
app.use('/', index);
app.use(express.static(path.join(__dirname, '..', 'client', 'build')));
                
module.exports = app;