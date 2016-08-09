var app = angular.module('topFive', []);
app.controller('topFiveController', function($scope, $http) {
    $scope.newsSet = [];

    $http.get("/topnews")
        .then(function(response) {
            $scope.newsSet = response.data;
        });
});


