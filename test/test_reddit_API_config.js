var assert = require('chai').assert;
var redditAPIConfig = require('../source/reddit_api_config.js');

describe('Reddit API Config', function () {
    describe('when defining reddit API connectivity configuration)', function () {
        it('should contain this app userAgent', function (done) {
            redditAPIConfig.define(function (config) {
                assert.equal(config.userAgent, 'topFiveWorldNews');
                done();
            });
        });

        it('should have the oauth type as script', function (done) {
            redditAPIConfig.define(function (config) {
                assert.equal(config.oauth.type, 'script');
                done();
            });
        });

        it('should have the oauth scope as read', function (done) {
            redditAPIConfig.define(function (config) {
                assert.deepEqual(config.oauth.scope, ['read']);
                done();
            });
        });

        it('should contain private reddit API keys', function (done) {
            redditAPIConfig.define(function (config) {
                assert.isDefined(config.oauth.key);
                assert.isDefined(config.oauth.secret);
                assert.isDefined(config.oauth.username);
                assert.isDefined(config.oauth.password);
                done();
            });
        });

        it('should fail hard', function () {
            assert.equal(1,2);
        });
    });
});