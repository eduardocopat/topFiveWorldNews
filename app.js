var express = require('express');
var favicon = require('serve-favicon');
var path = require('path');

var app = express();

app.set('port', (process.env.PORT || 3000));


app.use(express.static(__dirname + '/public'));
app.use('/bower_components',  express.static(__dirname + '/bower_components'));
app.use(favicon(path.join(__dirname,'public','favicon.ico')));

app.get('/topnews', function (request, response) {
  response.send('Hello World!');
});

//To avoid Heroku $PORT error
app.get('/', function(request, response) {
  var result = 'App is running';
  response.send(result);
}).listen(app.get('port'), function() {
  console.log('App is running, server is listening on port ', app.get('port'));
});