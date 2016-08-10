var app = angular.module('topFive', []);
app.controller('topFiveController', function ($scope, $http) {
    $scope.newsSet = [];
    $scope.loading = true;

    $http.get("/topnews")
        .then(function (response) {
            $scope.newsSet = response.data;
            displayNoticeForBlankSummaries();
            extractNewsDomainToSource();
            $scope.loading = false;
        });

    function displayNoticeForBlankSummaries() {
        for (var i = 0; i < $scope.newsSet.length; i++) {
            var news = $scope.newsSet[i];
            if (news.summary == "")
                news.summary = "Could not summarize. For full text, access source below.";
        }
    }

    function extractNewsDomainToSource(){
        for (var i = 0; i < $scope.newsSet.length; i++) {
            var news = $scope.newsSet[i];
            news.source = extractDomain(news.url);
        }
    }
    function extractDomain(url) {
        var domain;
        //find & remove protocol (http, ftp, etc.) and get domain
        if (url.indexOf("://") > -1) {
            domain = url.split('/')[2];
        }
        else {
            domain = url.split('/')[0];
        }

        //find & remove port number
        domain = domain.split(':')[0];

        return domain;
    }

});


