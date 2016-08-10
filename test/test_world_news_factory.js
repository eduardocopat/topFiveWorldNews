var expect = require('chai').expect;

var worldNewsFactory = require('../source/world_news_factory.js');

var fakeTitle;
var fakeSummary = [];
var fakeFailure = false;

var actualSummarizerUrl;

var mockSummarizer = {
    summarize: function (url, aCallBack) {
        actualSummarizerUrl = url;
        aCallBack(fakeTitle, fakeSummary, fakeFailure);
    }
};

describe('World News Factory', function () {
    describe('when making a world news', function () {
        it('should contain the post title', function (done) {
            var redditPost = {title: "aTitle"};
            worldNewsFactory.make(redditPost, mockSummarizer, function (news) {
                expect(news.title).to.equal(redditPost.title);
                done();
            });
        });
        it('should contain the post url', function (done) {
            var redditPost = {url: "www.google.com"};
            worldNewsFactory.make(redditPost, mockSummarizer, function (news) {
                expect(news.url).to.equal(redditPost.url);
                done();
            });
        });
        it('should contain the post permalink concatenated with the reddit domain', function (done) {
            var redditPost = {permalink: "/r/worldnews/comments/id/post_text"};
            worldNewsFactory.make(redditPost, mockSummarizer, function (news) {
                expect(news.permalink).to.equal("http://www.reddit.com" + redditPost.permalink);
                done();
            });
        });
        it('should contain the number of comments', function (done) {
            var redditPost = {num_comments: 42};
            worldNewsFactory.make(redditPost, mockSummarizer, function (news) {
                expect(news.number_of_reddit_comments).to.equal(redditPost.num_comments);
                done();
            });
        });
    });


    describe('when summarizing it', function () {
        it('should pass the URL to the summarizer', function (done) {
            var redditPost = {url: "www.google.com"};
            worldNewsFactory.make(redditPost, mockSummarizer, function (news) {
                expect(actualSummarizerUrl).to.equal(redditPost.url);
                done();
            });
        });
        it('should have the summarizer summary', function (done) {
            var redditPost = {url: "www.google.com"};
            fakeSummary = ["This is the google homepage"];
            worldNewsFactory.make(redditPost, mockSummarizer, function (news) {
                expect(news.summary).to.equal(fakeSummary[0]);
                done();
            });
        });
        it('should join the summarizer summary', function (done) {
            var redditPost = {url: "www.google.com"};
            fakeSummary = ["First paragraph", "Second paragraph"];
            worldNewsFactory.make(redditPost, mockSummarizer, function (news) {
                expect(news.summary).to.equal("First paragraph\nSecond paragraph");
                done();
            });
        });
        it('should blank the summary when failing', function (done) {
            var redditPost = {url: "www.google.com"};
            fakeFailure = true;
            worldNewsFactory.make(redditPost, mockSummarizer, function (news) {
                expect(news.summary).to.be.empty;
                done();
            });
        });
    });
});
