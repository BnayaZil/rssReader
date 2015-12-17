(function (){
    'use strict';

	var app = angular.module('rssReader', ['ui.router', 'LocalStorageModule']);
	app.config(function($stateProvider) {
	  	$stateProvider
	    .state('body', {
	      url: "/{index}",
	      templateUrl: "src/views/body.html",
	      controller: "bodyCtrl as body",
	      params: {
	      	index: ''
	      }
	    });
	});
})();