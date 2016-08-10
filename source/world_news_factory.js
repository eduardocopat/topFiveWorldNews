function make(redditPost, summarizer, made){
    var news = {};
    news.title = redditPost.title;
    news.url = redditPost.url;
    news.permalink = "http://www.reddit.com" + redditPost.permalink;
    news.number_of_reddit_comments = redditPost.num_comments;
    summarizer.summarize(news.url, function(title, summary, failure){
        if(!failure)
            news.summary = summary.join("\n");
        made(news);
    });

}

exports.make = make;