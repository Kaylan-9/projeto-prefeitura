const app = require('./app.js');
// const express = require('express');
// const path = require('path');

// app.use('/prints', express.static(path.join(__dirname, '/public')));

app.set('port', 8080 || process.env.PORT);
app.listen(app.get('port'), 
  () => console.log("~server~on~line~(in~port~8080)~")
);

