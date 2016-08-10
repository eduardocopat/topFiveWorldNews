function build(redditAPI, summarizer, worldNewsFactory, built){
    redditAPI('/r/worldnews/hot').listing({
        limit: 5
    }).then(function (result) {
        var newsSet = [];
        rank = 1;
        result.children.forEach(function (post) {
            worldNewsFactory.make(post.data, summarizer, function(news){
                news.rank = rank;
                newsSet.push(news);
                if(rank == 5)
                    built(newsSet);
                else
                    rank++;
            });
        });
    });
}

exports.build = build;