var parallax = null;
var demoCount = 0;
		function Parallx() {
			var self = this;
			$("body").mousemove(function(e) {

					parallax.mouseX(e.pageX);
					parallax.mouseY(e.pageY);	

			});


			self.sensitivityMultiplier = ko.observable(0.03);
			self.wrapperOffset = $('#container').offset();
			self.wrapperCenter = {
				x:ko.computed(function() { return self.wrapperOffset.left + ($('#container').width()/2) }, this),
				y:ko.computed(function() { return self.wrapperOffset.top + ($('#container').height()/2) }, this)
			};
			self.mouseX = ko.observable(0);
			self.mouseY = ko.observable(0);
			self.relativeMouse = { 
				x:ko.computed(function() { return ((self.mouseX() - self.wrapperCenter.x()) * -.3) * self.sensitivityMultiplier() }, this),
				y:ko.computed(function() { return ((self.mouseY() - self.wrapperCenter.y()) * .3) * self.sensitivityMultiplier()}, this) 
			};
			self.origin = {
				x:ko.computed(function() { return ((self.mouseX())/$( window ).width()) * 10 }, this),
				y:ko.computed(function() { return ((self.mouseY())/$( window ).height()) * 10 }, this) 
			};
		};

		$(document).ready(function() {
			parallax = new Parallx();
			ko.applyBindings(parallax);

			setInterval(function() {
				if(demoCount < 60){
					parallax.mouseX(parallax.mouseX() + 2);
					demoCount+=1;
				}
			}, 20);


		});