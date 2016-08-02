var express = require('express');
var app = express();
app.set('port', (process.env.PORT || 3000));

//var Snoocore = require('snoocore');
//var reddit = new Snoocore();

app.use(express.static(__dirname + '/public'));
app.use('/bower_components',  express.static(__dirname + '/bower_components'));

app.get('/topnews', function (request, response) {
  response.send('Hello World!');
});

//To avoid Heroku $PORT error
app.get('/', function(request, response) {
  var result = 'App is running'
  response.send(result);
}).listen(app.get('port'), function() {
  console.log('App is running, server is listening on port ', app.get('port'));
});