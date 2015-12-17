(function (){
    'use strict';
    var app = angular.module('rssReader');
	app.service('readRss', function($http, $q){
		var getRssJson = function(url) {
			var responseRss = $http.jsonp('//ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=50&callback=JSON_CALLBACK&q=' + url).
			then(function(response) {
				if(response.data.responseStatus == 400) {
					$q.reject("Please check your link");
				} else {
					return response.data;
				}
			}).catch(function(response) { 
				$q.reject("Sorry, we haveing connection trouble");
			});
			return responseRss;
		};
		return {
			getRss: function(url) {
				return getRssJson(url);
			}
		};
	});
})();