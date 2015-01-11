'use strict';

var timeout;
var FPS = 200; // Frame per secondes

var Rad = function(options) {

  // object met de bijhorende graden voor de mogelijke getallen
  this.rotate = {
    1: 305,
    2: 245,
    3: 185,
    4: 125,
    5: 65,
    6: 5
  };

  // initialize rad
  this.init = function() {
    this.getal = Math.floor( Math.random() * 6 ) + 1; // getal waar die op komt
    this.graden = 0; // begin graden
    this.stappen = 5; // graden per FPS
    this.$element = options.$element; // de rad element
    this.rondjes = Math.floor( Math.random() * 6 ) + 1;
    this.rotate.range = Math.floor( Math.random() * 55 );

  };

  // update de rad
  this.update = function() {
    this.graden += this.stappen;
  };

  // tekent de rad
  this.render = function() {
    this.$element.style.MozTransform = 'rotate(' + this.graden + 'deg)';
    this.$element.style.WebkitTransform = 'rotate(' + this.graden + 'deg)';
  };

  // kijkt of de graden gelijk is aan de bijhorende graden van het getal
  this.isNotFinished = function() {
    return this.graden < (this.rotate[this.getal] + (360 * this.rondjes) + this.rotate.range);
  };

};

// creëert nieuwe rad object
var rad1 = new Rad({$element: document.getElementById('rad1')});

// creëert nieuwe rad object
var rad2 = new Rad({$element: document.getElementById('rad2')});

(function() {

  document.getElementById('total_wrap').style.display ='none';

  document.getElementById('draai').addEventListener('click', function() {
    rad1.init();
    rad2.init();
    clearInterval(timeout);

    timeout = setInterval(function() {

      if(rad1.isNotFinished() || rad2.isNotFinished()) {

        if(rad1.isNotFinished()){
          rad1.update();
          rad1.render();
        }

        if(rad2.isNotFinished()){
          rad2.update();
          rad2.render();
        }

      }
      else {
        // toon de totaal van rad1 en rad2
        document.getElementById('total_wrap').style.display ='block';
        document.getElementById('total').innerHTML = rad2.getal + rad1.getal;
        clearInterval(timeout); // stop de interval

      }

    }, 1000 / FPS );

  });

})();
