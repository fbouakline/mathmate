'use strict';

angular.module('mathMateApp')
  .controller('GenerateCtrl', function ($scope) {
	$scope.buttonTekst = 'Genereer';
	$scope.pagina = 'Generate';
	$scope.keuzen = ['Fibonacci', 'Priemgetallen'];

	$scope.adjustInputs = function($event, input) {
		$scope[input] = $event.target.text;
		$scope.popoverContent1 = this[$scope.keuze].popoverContent;
		$scope.popoverTitle1 = this[$scope.keuze].popoverTitle;
		$scope.show1 = true;
		$scope.isBerekenDisabled = false;
	};

	$scope.Fibonacci = { popoverTitle: 'Fibonacci', popoverContent: 'typ hier het getal van de gewenste Fibonaccireeks' };
	$scope.Priemgetallen = { popoverTitle: 'Priemgetallen', popoverContent: 'typ hier het getal van de gewenste Priemgetallenreeks' };

	$scope.bereken = {
		// Voer berekening uit
		bereken: function(){
			$scope.bereken[$scope.keuze]();
			console.log($scope.keuze);
		},
		// Reset resultaat
		reset : function() {
			$scope.result = '';
			return this;
		},
		// Bereken priemgetallen
		Priemgetallen: function(){
			var nPriem = $scope.input1;
			$scope.priemgetallen = [2];
			$scope.result += $scope.priemgetallen[0] + ' ';
			for( var n = 3; n <= nPriem ;  n += 2 ) {
				if( this.isPriem( n, $scope.priemgetallen ) ) {
					$scope.priemgetallen.push( n );
					$scope.result +=  n + ' ';
				}
			}
		},
		// Kijk of het een priemgetal is
		isPriem: function(n, priems){
			for( var i = 0;  i < priems.length;  i++ ) {
				if( n % priems[i] === 0 ){
					return false;
				}
			}
			return true;
		},
		// Bereken fibonacci
		Fibonacci : function(){
			var number1 = 0;
			var number2 = 1;
			var number3 = 0;
			$scope.result += number3 + ' ';
			while(number1 + number2 < $scope.input1){
				number3 = number1 + number2;
				number1 = number2;
				number2 = number3;
				$scope.result += number3 + ' ';
				console.log(number3);

			}
		}
	};
});