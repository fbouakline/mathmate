'use strict';

angular.module('mathMateApp')
  .controller('LoginCtrl', function ($scope) {


	$scope.login = function() {
		var chatRef = new Firebase('https://mathmate.firebaseio.com/');
  		var auth = new FirebaseSimpleLogin(chatRef, function(error, user) {
			if (error) {
				if(error.code === 'INVALID_EMAIL' || error.code === 'INVALID_PASSWORD' || error.code === 'INVALID_USER') {
					$('#error').text('De ingevoerde email of/en wachtwoord is onjuist.');
					$('#errorAlert').show();
				}
				console.log(error.code);
			}
			else if (user) {
				window.location.replace('#');
			}
			else {
				var password = $('#password').val();
				var email = $('#email').val();
				auth.login('password', {
					email: email,
					password: password
				});
			}
		});
	};
});
