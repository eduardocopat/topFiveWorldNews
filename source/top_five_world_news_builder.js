function build(redditAPI, summarizer, worldNewsFactory, built){
    redditAPI('/r/worldnews/hot').listing({
        limit: 5
    }).then(function (result) {
        var newsSet = [];
        result.children.forEach(function (post) {
            worldNewsFactory.make(post.data, summarizer, function(news){
                newsSet.push(news);
                if(newsSet.length == 5)
                    built(newsSet);
            });
        });
    });
}

exports.build = build;