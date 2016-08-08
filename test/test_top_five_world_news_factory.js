var assert = require('chai').assert;
var topFiveWorldNewsFactory = require('../source/top_five_world_news_factory.js');


var subredditQueried = "";
var listing = function(){ };

function createMockRedditAPI() {
    return function (subredditQuery) {
        subredditQueried = subredditQuery;
        var api = {};
        api.listing = listing;
        return api;
    };
}
describe('Top Five World News Maker', function () {
    describe('when querying subreddit world news', function () {
        it('it should query by hot relevance ', function () {
            var mockRedditAPI = createMockRedditAPI();

            topFiveWorldNewsFactory.make(mockRedditAPI);

            assert.equal(subredditQueried, "/r/worldnews/hot");
        });
        it('it should only query the top five articles', function () {
            var actualParameters;

            listing = function (listingParameters) {
                actualParameters = listingParameters;
            };

            var mockRedditAPI = createMockRedditAPI();

            topFiveWorldNewsFactory.make(mockRedditAPI);

            //noinspection JSUnusedAssignment
            assert.deepEqual(actualParameters, { limit: 5 });
        });
    });
});