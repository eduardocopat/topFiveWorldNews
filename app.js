var express = require('express');
var favicon = require('serve-favicon');
var path = require('path');
var summarizer = require('node-sumuparticles');

var redditAPIConfig = require('./source/reddit_api_config');
var topFiveWorldNewsBuilder  = require('./source/top_five_world_news_builder');
var worldNewsFactory = require('./source/world_news_factory');


var app = express();
setUpApp(app);

var Snoocore = require('snoocore');

var reddit;
var makeRedditAPI = function (APIconfig) {
    reddit = new Snoocore(APIconfig);
};
redditAPIConfig.define(makeRedditAPI);

app.get('/topnews', function (request, response) {
    topFiveWorldNewsBuilder.build(reddit, summarizer, worldNewsFactory, function(newsSet) {
       response.send(newsSet);
    });
});

//To avoid Heroku $PORT error
app.get('/', function (request, response) {
    response.send('App is running');
}).listen(app.get('port'), function () {
    console.log('App is running, server is listening on port ', app.get('port'));
});

function setUpApp(app){
    app.set('port', (process.env.PORT || 3000));
    app.use(express.static(__dirname + '/public'));
    app.use('/bower_components', express.static(__dirname + '/bower_components'));
    app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
}