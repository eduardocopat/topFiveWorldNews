var expect = require('chai').expect;

var topFiveWorldNewsFactory = require('../source/top_five_world_news_factory.js');

var subredditQueried = "";
var listingResult = createFakeListingResult();
var dummyNewsSet = function () {};
var actualParameters;

describe('Top Five World News Maker', function () {
    describe('when querying subreddit world news', function () {
        it('it should query by hot relevance ', function () {
            var mockRedditAPI = createMockRedditAPI();

            topFiveWorldNewsFactory.make(mockRedditAPI, dummyNewsSet);

            expect(subredditQueried).to.equal("/r/worldnews/hot");
        });
        it('it should only query the top five articles', function () {
            var mockRedditAPI = createMockRedditAPI();

            topFiveWorldNewsFactory.make(mockRedditAPI, dummyNewsSet);

            expect(actualParameters).to.deep.equal({limit: 5});
        });
    });
    describe('when creating news set', function () {
        it('it should contains only 5 news ', function () {
            var mockRedditAPI = createMockRedditAPI();

            topFiveWorldNewsFactory.make(mockRedditAPI, function (actualNewsSet) {
                expect(actualNewsSet.length).to.equal(5);
            });
        });
        it('it should contains be ordered with rank', function () {
            var mockRedditAPI = createMockRedditAPI();

            topFiveWorldNewsFactory.make(mockRedditAPI, function (actualNewsSet) {
                expect(actualNewsSet[0].rank).to.equal(1);
                expect(actualNewsSet[1].rank).to.equal(2);
                expect(actualNewsSet[2].rank).to.equal(3);
                expect(actualNewsSet[3].rank).to.equal(4);
                expect(actualNewsSet[4].rank).to.equal(5);
            });
        });
        it('it should contains the post title', function () {
            var mockRedditAPI = createMockRedditAPI();

            topFiveWorldNewsFactory.make(mockRedditAPI, function (actualNewsSet) {
                expect(actualNewsSet[0].title).to.equal(listingResult.children[0].data.title);
                expect(actualNewsSet[1].title).to.equal(listingResult.children[1].data.title);
                expect(actualNewsSet[2].title).to.equal(listingResult.children[2].data.title);
                expect(actualNewsSet[3].title).to.equal(listingResult.children[3].data.title);
                expect(actualNewsSet[4].title).to.equal(listingResult.children[4].data.title);
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