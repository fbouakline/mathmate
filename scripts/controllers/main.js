'use strict';

angular.module('mathMateApp')
  .controller('MainCtrl', function ($scope) {
	$scope.result = ' <div class="alert alert-info alert-dismissable" ng-show="notANumber"><strong>Instructie: </strong> Nog geen resultaat. kies een bewerking en klik dan op bereken.</div>';
	$scope.placeholder = 'Disabled';
	$scope.keuze = 'Keuze';
	$scope.isBerekenDisabled = true;
	$scope.succesvol = true;
});
