(function (){
    'use strict';
    var app = angular.module('rssReader');
	app.service('dataManager', function(readRss, localStorageService, $q){
		var rssList = [];
		if(localStorageService.get('rssObj')) {
			rssList = localStorageService.get('rssObj');
		}
		var isThisRssExist = function(response) {
			var freshRss = true;
			if(rssList.length > 0) {
				angular.forEach(rssList, function(key, value) {
					if(response.responseData.feed.feedUrl === rssList[value].feed.feedUrl){
						freshRss = false;
					}
				});
			}
			return freshRss;
		};
		var newRssRequest = function(url) {
			return readRss.getRss(url).then(function(response) {
				if(response) {
					if(isThisRssExist(response)) {
						rssList.push(response.responseData);
						localStorageService.set('rssObj', rssList);
						return response.responseData;
					} else {
						return $q.reject("rss already exist");
					}
				} else {
					return $q.reject("connection error");
				}	
			});
		};
		var removeRss = function(index) {
			rssList.splice(index, 1);
			localStorageService.set('rssObj', rssList);
		};
		return {
			newRss: function(url) {
				return newRssRequest(url);
			},
			remove: function(index) {
				removeRss(index);
			},
			rssList: rssList
		};
	});
})();