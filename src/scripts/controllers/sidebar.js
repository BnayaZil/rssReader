(function (){
    'use strict';
    var app = angular.module('rssReader');
	app.controller('sidebarCtrl', function($state, dataManager){
		var self = this;
		self.rssList = dataManager.rssList;
		self.submit = function() {
			self.error = false;
			dataManager.newRss(self.url).then(function(response) {
				self.rssList = dataManager.rssList;
				$state.go("body", {index: self.rssList.length});
			}).catch(function(response) {
				self.error = response;
			});
		};
		self.switchCurrent = function(index) {
			$state.go("body", {index: index});
		};
		self.remove = function(index) {
			dataManager.remove(index);
			$state.go("body", {index: self.rssList.length - 1});
		}
	});

})();