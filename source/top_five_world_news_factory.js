function make(reddit){
    reddit('/r/worldnews/hot').listing({
        limit: 5
    });
}

exports.make = make;