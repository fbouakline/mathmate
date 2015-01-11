'use strict';

angular.module('mathMateApp')
  .controller('menuController', function ($scope) {
		$scope.linkIsDisabled = true;
		$scope.isCol2 = true;
		$scope.hidden = {overflow: 'hidden'};
		$scope.user = {};

		var chatRef = new Firebase('https://mathmate.firebaseio.com/');
		var auth = new FirebaseSimpleLogin(chatRef, function(error, user) {
			if (user) {
				$scope.isLoggedIn = true;
				var userRef = new Firebase('https://mathmate.firebaseio.com/user/' + user.id + '/name');
				userRef.on('value', function(snapshot) {
					$scope.$apply(function(){
						$scope.linkIsDisabled = false;
						$scope.user.name = snapshot.val();
					});
				});
			}
		});
		// Menu items
		$scope.menulijst = [
			// {naam: 'Home', icon: 'fa fa-home', url: '#'},
			{naam: 'Rekenen', icon: 'fa fa-book', url: '#rekenen',class:'hidelink'},
			{naam: 'Rad', icon: 'fa fa-repeat', url: '#rad',class:'hidelink'},
			{naam: 'Generate', icon: 'fa fa-refresh', url: '#generate',class:'hidelink'},
			{naam: 'Talstelsel', icon: 'fa fa-exchange', url: '#klasse6/Getalstelsel',class:'hidelink'},
			{naam: 'Factorize', icon: 'fa fa-sort-amount-asc', url: '#klasse6/Factorize',class:'hidelink'},
			{naam: 'Games', icon: 'glyphicon glyphicon-tower', url: '#games',class:'hidelink'}
		];
		// Maak de menu zichtbaar
		$scope.showMenu = function(){
			$scope.isCol2 = false;
			$scope.isCol3 = true;
			$scope.isOpenMenu = true;
			$scope.hidden = {overflow: 'visible'};
		};
		// Maak de menu onzichtbaar
		$scope.hideMenu = function(){
			$scope.isCol2 = true;
			$scope.isCol3 = false;
			$scope.isOpenMenu = false;
			$scope.hidden = {overflow: 'hidden'};
		};
		$scope.logout = function(){
			auth.logout();
			$scope.isLoggedIn = false;
		};
  });
