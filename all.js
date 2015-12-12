/**
*  Module
*
* Description
*/
var app = angular.module('rssReader', ['ui.router']);
app.controller('rssMain', ['$scope', '$http', 'readRss', '$state', 'localstorage', function($scope, $http, readRss, $state, localstorage){
	$scope.rssList = [];
	if(localstorage.getLocal()) {
		$scope.rssList = localstorage.getLocal();
	}
	$scope.submit = function() {
		$scope.error = false;
		var newRss = true;
		readRss.getRss($scope.url).then(function(response) {
			angular.forEach($scope.rssList, function(key, value) {
				if(response.responseData.feed.feedUrl == $scope.rssList[value].feed.feedUrl)
					newRss = false;
			});
			if(newRss) {
				$scope.rssList.push(response.responseData);
				localstorage.updateLocal($scope.rssList);
				$state.go("body", {index: $scope.rssList.length - 1});
			}
		}, function(response) {
			$scope.error = response;
		});
	};
	$scope.switchCurrent = function(index) {
		$state.go("body", {index: index});
	};
	$scope.remove = function(index) {
		$scope.rssList.splice(index, 1);
		localstorage.updateLocal($scope.rssList);
		$state.go("body", {index: $scope.rssList.length - 1});
	}
}]);

app.controller('bodyCtrl', ['$scope', 'readRss', '$stateParams', function($scope, readRss, $stateParams){
	$scope.index = $stateParams.index
}]);

app.config(function($stateProvider) {
  	$stateProvider
    .state('body', {
      url: "/{index}",
      templateUrl: "body.html",
      controller: "bodyCtrl",
      params: {
      	index: ''
      }
    });
});

app.directive('rssItems', function() {
	return {
		templateUrl: 'rssItems.html',
		scope: {
			rssCurrentItem: '='
		},
		replace: true,
		restrict: 'E'
	}
});

app.service('readRss', ['$http', '$q', function($http, $q){
	var getRssJson = function(url) {
		var deferred = $q.defer();
		$http.jsonp('//ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=50&callback=JSON_CALLBACK&q=' + url).
		then(function(response) {
			if(response.data.responseStatus == 400) {
				deferred.reject("Please check your link");
			} else {
				deferred.resolve(response.data);
			}
		}, function(response) { 
			deferred.reject("Sorry, we haveing connection trouble");
		});
		return deferred.promise;
	};
	return {
		getRss: function(url) {
			return getRssJson(url);
		}
	};
}]);

app.service('localstorage', ['$http', '$q', function($http, $q){
	return {
		getLocal: function() {
			return JSON.parse(localStorage.getItem("rssObj"));
		},
		updateLocal: function(data) {
			localStorage.setItem("rssObj", JSON.stringify(data));
		}
	};
}]);