'use strict';

angular.module('mathMateApp')
  .controller('Klasse6Ctrl', function ($scope, $routeParams) {
	$scope.keuzen = ['Factorize', 'Getalstelsel'];
	$scope.keuze = $routeParams.keuze;
	$scope.showTal = true;
	$scope.isDisabledTal = true;
	$scope.hideinput = true;
	$scope.notANumber = false;


	var Bewerking = function (title, content, buttonTekst){
		this.popoverTitle = title;
		this.popoverContent = content;
		this.buttonTekst = buttonTekst;
	};

	$scope.adjustInputs = function($event, input) {
		$scope[input] = $event.target.text;
		$scope.adjustInputs2();
	};

	$scope.Factorize = new Bewerking( 'Factorize', 'typ hier het getal waarvan u wilt weten uit welke priemgetallen het bestaat', 'Factorize');
	$scope.Getalstelsel = new Bewerking( 'Getalstelsel', 'typ hier het getal die u wilt omzetten naar een gewenste talstelsel', 'Omzetten');

	$scope.Factorize.adjust = function(){
		$scope.isDisabledTal = true;
		$scope.pagina = "Factorize";
	};

	$scope.Getalstelsel.adjust = function(){
		$scope.isDisabledTal = false;
		$scope.pagina = "Talstelsel";
	};

	$scope.genereer2Tot36 = function() {
		var talstelsel = [];
		var n = 2;
		for(var i = 0; n <= 36; i++){
			talstelsel[i] = n;
			n++;
		}
		return talstelsel;
	};

	$scope.adjustInputs2 = function(){
		$scope.popoverContent1 = $scope[$scope.keuze].popoverContent;
		$scope.popoverTitle1 = $scope[$scope.keuze].popoverTitle;
		$scope.show1 = true;
		$scope[$scope.keuze].adjust();
		$scope.isBerekenDisabled = false;
		$scope.buttonTekst = $scope[$scope.keuze].buttonTekst;
	};

	$scope.adjustInputs2();


	$scope.bereken = {
		// Voer berekening uit
		bereken: function(){
			$scope.bereken[$scope.keuze]();
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
			for( var n = 3;  n <= nPriem;  n += 2 ) {
				if( this.isPriem( n, $scope.priemgetallen ) ) {
					$scope.priemgetallen.push( n );
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
		// Be
		Factorize : function(){
			this.Priemgetallen();
			var getal = $scope.input1;
			for(var i = 0; i < $scope.priemgetallen.length; i++){
				while(getal % $scope.priemgetallen[i] === 0){
					getal /= $scope.priemgetallen[i];
					$scope.result += $scope.priemgetallen[i];
					if(getal != 1) {
						$scope.result += '*';
					}
				}
			}
		},

		toRadix: function(N,radix) {
			var uitkomst='', Q=Math.floor(Math.abs(N)), R;
			
			while (true) {
				R=Q%radix;
				uitkomst = '0123456789abcdefghijklmnopqrstuvwxyz'.charAt(R) + uitkomst;
				Q = (Q - R)/radix;
				if (Q === 0) {
					break;
				}
			}
			return ((N<0) ? '-' + uitkomst : uitkomst);
		},

		fromRadix: function(N, radix){
			var getal = N.toLowerCase();
			var getalLengte = getal.length;
			var uitkomst = 0;
			var positie = getalLengte - 1;

			for(var i = 0; i < getalLengte; i++ ){
				if(parseInt('0123456789abcdefghijklmnopqrstuvwxyz'.indexOf(getal.slice(i,i+1)), 10) < radix){
					uitkomst += parseInt('0123456789abcdefghijklmnopqrstuvwxyz'.indexOf(getal.slice(i,i+1)), 10) * Math.pow(radix, positie);
					positie -= 1;
				}else{
					return false;
				}
			}
			
			return uitkomst;
			
		},

		Getalstelsel: function(){
			// $scope.result = parseInt($scope.input1, $scope.Talvan).toString($scope.Talnaar);
			// $scope.result = this.toRadix(parseInt($scope.input1, $scope.Talvan),$scope.Talnaar);
			if(this.fromRadix($scope.input1, $scope.Talvan)){
				$scope.notANumber = false;
				$scope.talUitkomst = this.toRadix(this.fromRadix($scope.input1, $scope.Talvan), $scope.Talnaar);
			}else{
				$scope.talUitkomst = '';
				$scope.notANumber = true;
			}
		}
	};
});
