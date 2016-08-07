var express = require('express');
var favicon = require('serve-favicon');
var path = require('path');
var fileSystem = require('fs');

var redditAPIConfig = require('./source/reddit_api_config.js');

var app = express();

app.set('port', (process.env.PORT || 3000));

app.use(express.static(__dirname + '/public'));
app.use('/bower_components', express.static(__dirname + '/bower_components'));
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

var Snoocore = require('snoocore');


var reddit;
var makeRedditAPI = function (APIconfig) {
    reddit = new Snoocore(APIconfig);
};

redditAPIConfig.define(makeRedditAPI);

app.get('/topnews', function (request, response) {
    var newsSet = [];

    reddit('/r/worldnews/hot').listing({
        limit: 5
    }).then(function (result) {
            rank = 1;
            result.children.forEach(function (post) {
                console.log(post);
                var news = {
                    rank: rank,
                    title: post.data.title,
                    summary: "",
                    url: post.data.url
                };
                newsSet.push(news);
                rank++;
            });
        response.send(newsSet);
    });

});

//To avoid Heroku $PORT error
app.get('/', function (request, response) {
    var result = 'App is running';
    response.send(result);
}).listen(app.get('port'), function () {
    console.log('App is running, server is listening on port ', app.get('port'));
});