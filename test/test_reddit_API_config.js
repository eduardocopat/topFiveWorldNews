var expect = require('chai').expect;

var redditAPIConfig = require('../source/reddit_api_config.js');



describe('Reddit API Config', function () {
    describe('when defining reddit API connectivity configuration', function () {
        it('should contain this app userAgent', function (done) {
            redditAPIConfig.define(function (config) {
                expect(config.userAgent).to.equal('topFiveWorldNews');
                done();
            });
        });

        it('should have the oauth type as script', function (done) {
            redditAPIConfig.define(function (config) {
                expect(config.oauth.type).to.equal('script');
                done();
            });
        });

        it('should have the oauth scope as read', function (done) {
            redditAPIConfig.define(function (config) {
                expect(config.oauth.scope).to.deep.equal(['read']);
                done();
            });
        });

        it('should contain private reddit API keys', function (done) {
            redditAPIConfig.define(function (config) {
                expect(config.oauth.key).to.not.be.undefined;
                expect(config.oauth.secret).to.not.be.undefined;
                expect(config.oauth.username).to.not.be.undefined;
                expect(config.oauth.password).to.not.be.undefined;
                done();
            });
        });
    });
});
