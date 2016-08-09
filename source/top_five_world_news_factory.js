function make(redditAPI, made){
    redditAPI('/r/worldnews/hot').listing({
        limit: 5
    }).then(function (result) {
        var newsSet = [];
        rank = 1;
        result.children.forEach(function (post) {
            var news = {
                rank: rank,
                title: post.data.title,
                //summary: "",
                //url: post.data.url
            };
            newsSet.push(news);
            rank++;
        });
        made(newsSet);
    });
}

exports.make = make;