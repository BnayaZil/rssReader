(function (){
    'use strict';
    var app = angular.module('rssReader');
	app.controller('bodyCtrl', function($stateParams, dataManager){
		this.index = $stateParams.index;
		this.rssList = dataManager.rssList;
	});
})();