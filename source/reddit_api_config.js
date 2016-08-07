var fileSystem = require('fs');

function define(result){
    var redditApiConfig = {
        userAgent: 'topFiveWorldNews',
        oauth: {
            type: 'script',
            scope: ['read']
        }
    };
    fileSystem.readFile('./config/reddit_api_developer.config', 'utf8', function (error, redditApiDeveloperConfigRawFile) {
        if (error) {
            redditApiConfig.oauth.key = process.env.REDDIT_KEY;
            redditApiConfig.oauth.secret = process.env.REDDIT_SECRET;
            redditApiConfig.oauth.username = process.env.REDDIT_USERNAME;
            redditApiConfig.oauth.password = process.env.REDDIT_PASSWORD;
        }
        else {
            var redditApiDeveloperConfig = JSON.parse(redditApiDeveloperConfigRawFile);

            redditApiConfig.oauth.key = redditApiDeveloperConfig.key;
            redditApiConfig.oauth.secret = redditApiDeveloperConfig.secret;
            redditApiConfig.oauth.username = redditApiDeveloperConfig.username;
            redditApiConfig.oauth.password = redditApiDeveloperConfig.password;
        }
        result(redditApiConfig);
    });
}

exports.define = define;