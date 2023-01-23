 var canvas = document.getElementById('canvas');
var context = canvas.getContext("2d");

var background = document.getElementById('background');

canvas.width = background.width;
canvas.height = background.height;
var open = true;
var fire = false;
var allow = true;
var next = 1;
var FPS = 70;
var ZWAARTEKRACHT = 9.81;
var dialog = 1;
var play = false;
var hit = false;
var hoogte = Math.floor( Math.random() * 250 ) + 150;
var interval;
var mouse = {
	x:0,
	y:0

};

function dialogUpdate(text, image, character, textX) {
	this.text = text;
	this.textX = textX || 600;
	this.image = image;
	this.i = 0;
	this.char = character;

	this.update = function() {

		game.dialog.char = this.char;
		game.dialog.image = this.image;
		game.dialog.textX = this.textX;
		var arrayText = this.text.split("");

		if(this.i < arrayText.length) {
			game.dialog.text += arrayText[this.i];
				this.i++;
		}
		else {
			$('#next').show();
		}

	};
}

function sprite (options) {
	
	var that = {},
		
		tickCount = 0,
		ticksPerFrame = options.ticksPerFrame || 0,
		numberOfFrames = options.numberOfFrames || 1;

	that.toY = options.toY || options.y;
	that.frameIndex = 0;
	that.context = options.context;
	that.width = options.width;
	that.height = options.height;
	that.image = options.image;
	that.x = options.x;
	that.y = options.y;
	that.toX = options.toX;
	that.steps = options.steps;
	
	that.update = function () {

        tickCount += 1;

        if (tickCount > ticksPerFrame) {

			tickCount = 0;

			if(that.frameIndex < numberOfFrames - 1) {
				that.frameIndex += 1;
			}
			else {
				that.frameIndex = 0;
			}
		}
	};
	
	that.render = function () {
		if(that.x < that.toX){
			that.x += that.steps;
		}
		if(that.y < that.toY){
			that.y += that.steps;
		}
		that.context.drawImage(
		that.image,
		that.frameIndex * that.width / numberOfFrames,
		0,
		that.width / numberOfFrames,
		that.height,
		that.x,
		that.y,
		that.width / numberOfFrames,
		that.height);
	};
	
	return that;
}

var spriteImage = document.createElement('IMG');
spriteImage.src = "images/sprites/sun_standby.png";

var winImage = document.createElement('IMG');
winImage.src = "images/sprites/Victory.png";

sunsprite = sprite({
	context: context,
	width: 512,
	height: 58,
	image: spriteImage,
	numberOfFrames: 8,
	ticksPerFrame: 4,
	x: 0,
	y: hoogte,
	toX: 250,
	steps: 1
});

var cloudsprite = document.createElement('IMG');
cloudsprite.src = "images/sprites/cloud.png";

cloudsprite = sprite({
	context: context,
	width: 240,
	height: 28,
	image: cloudsprite,
	numberOfFrames: 3,
	ticksPerFrame: 4,
	x: 0,
	y: hoogte + 40,
	toX: 250,
	steps: 1
});

var cloudsprite2 = document.createElement('IMG');
cloudsprite2.src = "images/sprites/cloud.png";

cloudsprite2 = sprite({
	context: context,
	width: 240,
	height: 28,
	image: cloudsprite2,
	numberOfFrames: 3,
	ticksPerFrame: 4,
	x: 0,
	y: hoogte + 40,
	toY: 40,
	toX: 360,
	steps: 10,
});

var pigsprite = document.createElement('IMG');
pigsprite.src = "images/sprites/pig_dead.png";

pigdead = sprite({
	context: context,
	width: 403,
	height: 94,
	image: pigsprite,
	numberOfFrames: 6,
	ticksPerFrame: 8,
	x: 1056,
	y: 346,
	toX: 0,
	toY: canvas.height,
	steps: 2,
});

var sunsprite2 = document.createElement('IMG');
sunsprite2.src = "images/sprites/sun_attack.png";

attack = sprite({
	context: context,
	width: 261,
	height: 57,
	image: sunsprite2,
	numberOfFrames: 4,
	ticksPerFrame: 2,
	x: 257,
	y: hoogte - 5,
	toX: 250,
	steps: 20,
});

canvas.addEventListener("mousemove", mouseMove, false);
canvas.addEventListener("mouseup", mouseUp, false);

function mouseUp(e) {
	if(allow && play){
		game.setBal({x: 391,y:0, O_y: hoogte + 17, tijd: 0, snelheid: 30 + ( 70 * ((mouse.x - 400) / 850) ) , hoek: game.cannon._radians});

		fire  = true;
		allow = false;
	}
}

function mouseMove(e) {
	if (e.pageX) {
		mouse.x = e.pageX;
	}
	else if (e.clientX) {
		mouse.x = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
	}
	mouse.x = mouse.x - canvas.offsetLeft;
	if (e.pageY) {
		mouse.y = e.pageY;
	}
	else if (e.clientY) {
		mouse.y = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
	}
	mouse.y = mouse.y - canvas.offsetTop;
}

var game = {

	setBal: function(object){

		this.bal = object;
		this.bal.verticaleSnelheid = this.bal.snelheid * Math.sin(-this.bal.hoek);
		this.bal.horizontaleSnelheid = this.bal.snelheid * Math.cos(-this.bal.hoek);

		this.bal.update = function(){
			this.y = this.O_y - this.verticaleSnelheid * this.tijd + (0.5 * ZWAARTEKRACHT) * Math.pow(this.tijd, 2);
			this.x = (391) + this.horizontaleSnelheid * this.tijd;
			this.tijd += 0.1;
		};

		this.bal.draw = function(){

			context.beginPath();
			context.arc( this.x, this.y, 4, 0, 2 * Math.PI );
			context.stroke();
			context.fillStyle = "black";
			context.fill();
		};
	},

	cannon: {
		x: -50,
		y: -25,
		_radians:0,
		mouse: {},
		_dx:0,
		_dy:0,

		update: function() {
			if(mouse.x > 400 && mouse.y < hoogte+40) {
				this._dx = mouse.x - 400;
				this._dy = mouse.y - (hoogte + 40);
				this._radians = Math.atan2(this._dy,this._dx);
			}
		},

		draw: function() {

			context.save();
			context.translate(400, hoogte + 40);
			context.rotate(this._radians);

			var wheelImg = document.createElement("IMG");
			wheelImg.src = "images/cannon/cannon_wheel.png";
			context.drawImage(wheelImg, -27 / 2, -27 / 2);

			var cannonImg = document.createElement("IMG");
			cannonImg.src = "images/cannon/cannon_top.png";
			context.drawImage(cannonImg, -48 / 2, -80 / 2);
			context.restore();

		}
	},
	pig : {
		opacity: 0,
		update: function(){
			if(this.opacity < 1){
				this.opacity += 0.01;
			}
		},
		draw: function(){
			var pigImg = document.createElement("IMG");
			pigImg.src = "images/sprites/pig.png";
			context.globalAlpha=this.opacity;
			context.drawImage(pigImg, canvas.width -200,canvas.height - 150);
			context.globalAlpha=1;

		}
	},
	dialog: {
		text: "",
		textX: 600,
		image: "images/char/sun_angry.png",
		char : true,
		1: new dialogUpdate('Huh ..!!!','images/char/sun_suprised.png', true ),
		2: new dialogUpdate('Show yourself !!!','images/char/sun_angry.png', true ),
		3: new dialogUpdate('* The evil pig is blocking your way *','images/char/sun_angry.png', false ),
		4: new dialogUpdate('You ignorant pig .. !!','images/char/sun_angry.png', true ),
		5: new dialogUpdate('How dare you to block my way','images/char/sun_angry.png', true ),
		6: new dialogUpdate('* The great sage pulls a hair from his body * ',"images/char/sun_angry.png", false, 550 ),
		7: new dialogUpdate('* Chews it up, spit it up, says the magic spell .. ',"images/char/sun_angry.png", false, 550 ),
		8: new dialogUpdate('.. and shouts "change" * ','images/char/sun_angry.png', false, 550 ),
		9: new dialogUpdate("* Whereupon the hair turns into a cannon * ","images/char/sun_angry.png", false, 550 ),

		draw: function(){

			context.globalAlpha=0.5;
			context.fillStyle="black";
			context.fillRect(450,canvas.height - 100,500,100);

			
			context.globalAlpha=0.7;
			if(!this.char){
				context.globalAlpha=0;
			}
			context.fillRect(830, canvas.height - 140,120,40);

			context.globalAlpha=1;
			context.font="16px Nirmala UI";
			context.fillStyle = "white";
			context.fillText(this.text,this.textX,canvas.height - 50);

			if(!this.char){
				context.globalAlpha=0;
			}
			context.fillText("Sun Wukong",845,canvas.height - 115);
			var sunwukong = document.createElement("IMG");
			sunwukong.src = this.image;
			context.drawImage(sunwukong, 300,canvas.height / 2 - 10);
			context.globalAlpha = 1;
		}
	}

};


function fireBal() {

	if(fire && game.bal.y > 362 && play && game.bal.y < 362 + 70  ){
		allow = true;
		
		if(game.bal.x > 1056 && game.bal.x < 1056 + 76){
			hit = true;
		}
	}
	if(play && fire) {
		game.bal.update();
	}

}

function update(){
	fireBal();

	if(dialog >= 8){
		cloudsprite2.update();
	}
	if(dialog > 9){
		game.cannon.update();
		
	}
	
	if(sunsprite.x == sunsprite.toX && !play){
		game.dialog[dialog].update();
	}

	if(next == 2){
		game.pig.update();
	}
	if(hit){
		if(pigdead.frameIndex < 5){
			pigdead.update();

		}
	}

	sunsprite.update();
	cloudsprite.update();
	attack.update();
}

function draw(){

	context.clearRect( 0, 0, canvas.width, canvas.height );

	if(dialog >= 8){
		cloudsprite2.render();
	}

	if(dialog >= 9 ){
		game.cannon.draw();
		
	}

	if(sunsprite.x == sunsprite.toX && !play){
		game.dialog.draw();
	}

	if(play && fire) {
		game.bal.draw();

	}

	if(!hit){
		game.pig.draw();
	}
	
	cloudsprite.render();

	if(!allow){
		attack.render();
	}
	else{
		sunsprite.render();
	}
	
	if(hit){
		if(pigdead.frameIndex < 5){
			pigdead.render();

		}
		context.drawImage(winImage, 300, 150);
	}
	

}

(function() {

	$('#next').hide();
	$('#open').click(function(){

		$('body,html').animate({
				scrollTop: 0
			}, 800);

		if(open){

			clearInterval(interval);
			interval = setInterval(function(){
				
				update();
				draw();

			}, 1000 /  FPS);
		}

	});


	$('#next').click(function(){
		
		next = 2;
		dialog += 1;
		game.dialog.text ="";

		$(this).hide();

		if(dialog == 9){
			$(this).prepend("PLAY ");
		}

		if(dialog == 10){
			$('canvas').css("cursor","url(images/cursor/crosshair3.png), auto");
			play = true;
		}

	});

})();
