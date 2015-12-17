(function (){
    'use strict';
    var app = angular.module('rssReader');
	app.directive('rssItems', function() {
		return {
			templateUrl: 'src/views/rssItems.html',
			scope: {
				rssCurrentItem: '='
			},
			replace: true,
			restrict: 'E'
		}
	});
})();