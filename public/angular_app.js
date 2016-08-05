var app = angular.module('topFive', []);
app.controller('topFiveController', function($scope, $http) {
    $scope.newsSet = [];

    $http.get("/topnews")
        .then(function(response) {
            $scope.newsSet = response.data;
        });
/*
    var news = {
        rank: 1,
        title:'Scientists caught off-guard by record temperatures linked to climate change. "We predicted moderate warmth for 2016, but nothing like the temperature rises we' + "'" + "ve seen",
        link:"http://www.reuters.com/article/us-weather-climatechange-science-idUSKCN1061RH?rpc=401",
        summary:
        "LONDON - Record temperatures in the first half of 2016 have taken scientists by surprise despite widespread recognition that extreme weather events are becoming more frequent and intense, the director of the World Climate Research Program said."
+ "\n\n" +
        "Temperatures recorded mainly in the northern hemisphere in the first six months of the year, coupled with an early and fast Arctic sea ice melt and New highs in heat-trapping carbon dioxide levels, point to quickening climate change, it said."
+ "\n\n" +
         "Carlson called for global leaders to put climate action higher on national agendas following the Paris Agreement to limit global warming to well below 2°C above pre-industrial levels."
    };
    var news2 = {
        rank: 2,
        title:"Japan to unveil huge $266bn economic stimulus, say reports: Shinzo Abe aims to breathe life into moribund economy with expected boost for low earners and infrastructure schemes",
        link:"https://www.theguardian.com/world/2016/jul/27/japan-to-unveil-huge-266bn-economic-stimulus-say-reports",
        summary:"Japan is planning to launch a massive economic stimulus package worth more than 28 trillion yen, according to media reports."
+ "\n\n" +
        "Prime minister Shinzo Abe announced the programme in a speech in south-western Japan, giving few details except to say it would include about 13 trillion yen in fiscal measures including government spending, according to Jiji Press news agency."
+ "\n\n" +
       "Abe promised a stimulus package - which earlier reports had varied at being worth 10 to 30 trillion yen - after Britain's vote last month to quit the European Union sparked a rally in the yen that threatened the profits of Japan exporters."
    };

    $scope.newsSet.push(news);
    $scope.newsSet.push(news2);

     var news3 = angular.copy(news);
    news3.rank = 3;
    $scope.newsSet.push(news3);

    var news4 = angular.copy(news);
    news4.rank = 4;
    $scope.newsSet.push(news4);

    var news5 = angular.copy(news);
    news5.rank = 5;
    $scope.newsSet.push(news5);

*/
});


