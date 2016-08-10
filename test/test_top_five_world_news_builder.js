var expect = require('chai').expect;

var topFiveWorldNewsBuilder = require('../source/top_five_world_news_builder.js');

var subredditQueried = "";
var listingResult = createFakeListingResult();
var dummyNewsSet = function () {};
var actualParameters;

var dummySummarizer = { };
var dummyWorldNewsFactory = {
    make: function(dummyRedditPost, dummySummarizer, aCallback){
        aCallback({});
    }
};


describe('Top Five World News Builder', function () {
    describe('when querying subreddit world news', function () {
        it('it should query by hot relevance ', function () {
            var mockRedditAPI = createMockRedditAPI();

            topFiveWorldNewsBuilder.build(mockRedditAPI, dummySummarizer, dummyWorldNewsFactory, dummyNewsSet);

            expect(subredditQueried).to.equal("/r/worldnews/hot");
        });
        it('it should only query the top five articles', function () {
            var mockRedditAPI = createMockRedditAPI();

            topFiveWorldNewsBuilder.build(mockRedditAPI, dummySummarizer, dummyWorldNewsFactory, dummyNewsSet);

            expect(actualParameters).to.deep.equal({limit: 5});
        });
    });
    describe('when creating news set', function () {
        it('it should contains only 5 news ', function (done) {
            var mockRedditAPI = createMockRedditAPI();

            topFiveWorldNewsBuilder.build(mockRedditAPI, dummySummarizer, dummyWorldNewsFactory, function (actualNewsSet) {
                expect(actualNewsSet.length).to.equal(5);
                done();
            });
        });
        it('it should contains be ordered with rank', function (done) {
            var mockRedditAPI = createMockRedditAPI();

            topFiveWorldNewsBuilder.build(mockRedditAPI, dummySummarizer, dummyWorldNewsFactory, function (actualNewsSet) {
                expect(actualNewsSet[0].rank).to.equal(1);
                expect(actualNewsSet[1].rank).to.equal(2);
                expect(actualNewsSet[2].rank).to.equal(3);
                expect(actualNewsSet[3].rank).to.equal(4);
                expect(actualNewsSet[4].rank).to.equal(5);
                done();
            });
        });
    });
});

function createMockRedditAPI() {
    listingPromise = {
        then: function (callback) {
            callback(listingResult);
        }
    };

    listing = function (listingParameters) {
        actualParameters = listingParameters;
        return listingPromise;
    };

    return function (subredditQuery) {
        subredditQueried = subredditQuery;
        var api = {};
        api.listing = listing;
        return api;
    };
}

function createFakeListingResult(){
    var listingResult = [];
    listingResult.children = [
        {
            data: {title: "Some news 1"}
        },
        {
            data: {title: "Some news 2"}
        },
        {
            data: {title: "Some news 3"}
        },
        {
            data: {title: "Some news 4"}
        },
        {
            data: {title: "Some news 5"}
        },
    ];
    return listingResult;
}