const app = require('./server/app.js');
// const express = require('express');
// const path = require('path');

// app.use('/prints', express.static(path.join(__dirname, '/public')));

app.set('port', process.env.PORT || 8080);
app.listen(app.get('port'), 
  () => console.log("~server~on~line~(in~port~8080)~")
);

