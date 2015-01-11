'use strict';

angular.module('mathMateApp')
  .controller('RekenenCtrl', function ($scope) {
  	$scope.pagina = 'Rekenen';
	$scope.buttonTekst = 'Bereken';
	$scope.keuzen = ['Tafel', 'Macht', 'Breuken', 'Kwadraat'];

	var Bewerking = function (title, content){
		this.popoverTitle = title;
		this.popoverContent = content;
		this.adjust = function(){
			$scope.show1 = true;
			$scope.show2 = false;
			$scope.isDisabled = true;
			$scope.input2 = '';
			$scope.placeholder = 'Disabled';

		};
	};
	
	$scope.adjustInputs = function($event, input) {
		$scope[input] = $event.target.text;
		$scope.popoverContent1 = this[$scope.keuze].popoverContent;
		$scope.popoverTitle1 = this[$scope.keuze].popoverTitle;
		$scope[$scope.keuze].adjust();
		$scope.isBerekenDisabled = false;
	};

	$scope.Tafel = new Bewerking('Tafel', 'Typ hier het getal van de gewenste tafel');

	$scope.Tafel.adjust = function(){
		$scope.show1 = true;
		$scope.show2 = true;
		$scope.placeholder = 'Eindpunt';
		$scope.isDisabled = false;
	};

	$scope.Macht = new Bewerking( 'Macht', 'typ hier het getal van de gewenste Machtreeks');
	$scope.Breuken = new Bewerking( 'Breuken', 'type hier het getal van de gewenste breukenreeks tot 1/?');
	$scope.Kwadraat = new Bewerking( 'Kwadraat', 'typ hier het getal voor de eindpunt van de gewenste kwadratenreeks');

	$scope.bereken = {
		bereken : function() {
			this[$scope.keuze]();
		},
		reset : function() {
			$scope.result = '';
			return this;
		},
		Tafel : function() {
			for(var i = 1; i <= $scope.input2; i++) {
				$scope.result += (i + ' * ' + $scope.input1 + ' = ' + ($scope.input1 * i) + '<br>');
			}

		},
		Macht : function() {
			var result = 1;
			$scope.result += $scope.input1 + '<sup>0</sup> = 1 <br>';
			for(var i = 1; i <= 15; i++) {
				result *= $scope.input1;
				$scope.result += $scope.input1 + '<sup>'+ i +'</sup> = ' + result + '<br>';
			}
		},
		Breuken : function() {
			for(var i = 1; i <= $scope.input1; i++){
				$scope.result += ('<sup>1</sup>/<sub>' + i + '</sub>'+ ' = ' + (1 / i) + '<br>');
			}
		},
		Kwadraat : function() {
			for(var i = 1; i <= $scope.input1; i++){
				$scope.result += (i + '<sup>2</sup> = ' + (i * i) + '<br>');
			}
		}
	};
});
