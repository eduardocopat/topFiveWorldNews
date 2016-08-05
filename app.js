var express = require('express');
var favicon = require('serve-favicon');
var path = require('path');
var fileSystem = require('fs');

/*
 var aCallBack = function(foobar) {
 console.log(foobar);
 };
 */

var readRedditAPIConfig = function (result) {
    var redditApiConfig = {
        userAgent: 'topFiveWorldNews',
        oauth: {
            type: 'script',
            // make sure to set all the scopes you need.
            scope: ['read']
        }
    };

    fileSystem.readFile('./config/reddit_api_developer.config', 'utf8', function (error, redditApiDeveloperConfigRaw) {
        if (error) {
            console.log(error);
        }
        else {
            var redditApiDeveloperConfig = JSON.parse(redditApiDeveloperConfigRaw);

            redditApiConfig.oauth.key = redditApiDeveloperConfig.key;
            redditApiConfig.oauth.secret = redditApiDeveloperConfig.secret;
            redditApiConfig.oauth.username = redditApiDeveloperConfig.username;
            redditApiConfig.oauth.password = redditApiDeveloperConfig.password;

            result(redditApiConfig);
        }
    });
};


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

readRedditAPIConfig(makeRedditAPI);


app.get('/topnews', function (request, response) {
    var newsSet = [];

    reddit('/r/worldnews/hot').listing({
        limit: 5
    }).then(function (result) {
            result.children.forEach(function (post, rank) {
                console.log(post);

                var news = {
                    rank: rank,
                    title: post.data.title,
                    summary: "",
                    url: post.data.url
                };
                newsSet.push(news);
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