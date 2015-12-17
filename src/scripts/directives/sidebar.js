(function (){
    'use strict';
    var app = angular.module('rssReader');
	app.directive('rssSidebar', function() {
		return {
			templateUrl: 'src/views/sidebar.html',
			controller: 'sidebarCtrl as sidebar',
			replace: true,
			restrict: 'E'
		}
	});
})();