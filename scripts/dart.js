	function reset() {
	$('#dart').removeAttr('style');
	moveable = true;
	playGame();
	console.log(moveable);
}
$(playGame = function() {


	var hoogte = Math.floor( Math.random() * 490 ) + 20;
	$('#dart').css('top', hoogte); 
	$('#footer1').hide(); // verwidjer de footer
	var points;
	
	var game;
	var holding;
	var playing = false;
	var graden = 0;
	var mouse = {};
	var moveable = true;
	var space = {
		objects: [],
		addObject: function(obj){
			this.objects.push(obj);
		},
		updateObjects: function(){
			var objects = this.objects.length;
			for(var i = 0; i < objects; i++){
				var obj = this.objects[i];
				eval(obj+ '.update()')
			}
		},
		renderObjects: function(){
			var objects = this.objects.length;
			for(var i = 0; i < objects; i++){
				var obj = this.objects[i];
				eval(obj+ '.render()')
			}
		}
	};


	space.gravity = 0.5 * 9.81; // Zwaartekracht

	var FPS = 120; // Frame per secondes

	var dart = {
		y: 0,
		x: 0,
		tijd: 0, // Begin tijd
		beta: 0,
		snelheid: 0, // begin snelheid

		init: function(){
			this.verticaleSnelheid = this.snelheid * Math.cos(this.alpha); // Begin verticale snelheid
			this.horizontaleSnelheid = this.snelheid * Math.sin(this.alpha); // Begin horizontale snelheid
			this.noemer = Math.pow(this.snelheid,2) * Math.pow(Math.sin(this.alpha),2);
			return this;
		},
		update: function(){

			this.y = hoogte - this.verticaleSnelheid * this.tijd + space.gravity * Math.pow(this.tijd, 2);
			this.x = 0 + this.horizontaleSnelheid * this.tijd;
			this.tijd += 0.1;
			this.beta = (360/(2*Math.PI)) * (Math.atan(this.x*(9.81/this.noemer)-(9.81+Math.pow(this.snelheid,2)*Math.sin(this.alpha)*Math.cos(this.alpha))/this.noemer));
		},
		render: function(){
			$('#dart').css({'-moz-transform' : 'rotate('+ (this.beta ) +'deg)'});
			$('#dart').css('top', this.y);
			$('#dart').css('left', this.x);
		},
		draai: function(){
			graden += 1;
			$('#dart').css({'-moz-transform' : 'rotate('+ ( -graden ) +'deg)'});
			console.log(graden);
		}
	}.init();
	space.addObject(['dart']);

	$(document).mousemove(function(event){
		if(moveable){
			mouse.x = event.pageX;
			mouse.y = event.pageY - 250;
			graden = (Math.atan2(mouse.x,mouse.y) / Math.PI * 180);
			dart.alpha = graden/180*Math.PI;
			$('#dart').css({'-moz-transform' : 'rotate('+ ( graden - 90 ) +'deg)'});
		}
	});

	$(document).mousedown(function(){
		if(moveable){
			holding = setInterval(function(){
				dart.snelheid +=1;
				playing = true;
			},1);
		}
	});


	$(document).click(function(){

		clearInterval(holding);
		dart.init();
		moveable = false;
		console.log(dart.alpha);
		game = setInterval(function(){

			if(dart.x < 810 && dart.y < 600 && playing ){
				// Teken objecten
				space.renderObjects();
				// Update objecten
				space.updateObjects();
			}else{
				
				if(dart.x > (900 - 110) && dart.x < 900 && dart.y > 110 && dart.y < (110+165)){

					$('#win').show();
					if(dart.y < (110+86)){
						// Punten van mid punt naar bocen
						points = Math.floor(dart.y - 110)
						$('#score').html(" "+ points);
					}
					if(dart.y > (110+80)){
						// Punten van mid punt naar benenden
						points = Math.floor(275 - dart.y)
						$('#score').html(" "+ points);
					}

				}
				else{
					$('#lose').show();
					$('#score').html(' 0');


				}
				$('#replay').show();
				$('#points').show();
				clearInterval(game);
			}
		}, 1000 / FPS);
	});
});

