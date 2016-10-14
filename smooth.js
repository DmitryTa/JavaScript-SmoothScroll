function SmoothScroll(options) {

	var time = options.duration || 1500,
	 links = document.getElementsByClassName(options.class),
	 pointerEvents_disabled = options.pointerEvents_disabled || false,
	 timingFunction = options.timingFunction || 'linear'; 

	 Array.prototype.forEach.call(links, function(link) {
	 	link.addEventListener('click', scroll);
	 })


	function scroll(e) {

		var pageY = window.pageYOffset,  
	     hash = this.href.replace(/[^#]*(.*)/, '$1'),
	     targetTop = document.querySelector(hash).getBoundingClientRect().top,
	     moveUp = (pageY  > targetTop)? true : false;
	     targetY =  pageY  + targetTop;  

	     try {
			e.preventDefault();

			if(pointerEvents_disabled) {
				document.body.style.pointerEvents = 'none';
			}

	        animate({
	            duration: time,

	            timing: timingFunctions[timingFunction],

	            draw: function(progress) {       
	              if(moveUp) {
	                window.scrollTo(0, parseFloat(pageY+(targetTop*progress)));
	              } else {
	                window.scrollTo(0, targetY * progress + (pageY*(1-progress)));   
	              }
	            }
	      });
	        
		} finally {
			location.hash = hash;
			
			setTimeout(function() {
				document.body.style.pointerEvents = '';
			},time)
		}
	}

	function animate(options) {
	  var start = performance.now();

	  requestAnimationFrame(function animate(time) {
	 
	    var timeFraction = (time - start) / options.duration;
	    if (timeFraction > 1) timeFraction = 1;

	    var progress = options.timing(timeFraction)

	    options.draw(progress);

	    if (timeFraction < 1) {
	      requestAnimationFrame(animate);
	    }
	  });
	}

	var timingFunctions = {

		linear: function(progress) {
			return progress;
		},

		easeInCubic: function(progress) {
		    return Math.pow(progress, 3);
		},

		easeInQuad: function(progress) {
		    return Math.pow(progress, 2);
		},

		easeOutQuad: function(progress) {
		    return -(Math.pow((progress-1), 2) -1);
		},

  		elastic: function(progress) {
    		return -1 * Math.pow(4,-8*progress) * Math.sin((progress*6-1)*(2*Math.PI)/2) + 1;
  		},

  		easeInOutSine: function(progress) {
    		return (-0.5 * (Math.cos(Math.PI*progress) -1));
  		},

  		easeOutExpo: function(progress) {
    		return (progress===1) ? 1 : -Math.pow(2, -10 * progress) + 1;
  		},

  		swingFromTo: function(pos) {
    		var s = 1.70158;
    		return ((pos/=0.5) < 1) ? 0.5*(pos*pos*(((s*=(1.525))+1)*pos - s)) :
    		0.5*((pos-=2)*pos*(((s*=(1.525))+1)*pos + s) + 2);
  		},

  		swingTo: function(pos) {
    		var s = 1.70158;
    		return (pos-=1)*pos*((s+1)*pos + s) + 1;
  		},

  		easeFromTo: function(pos) {
    		if ((pos/=0.5) < 1) return 0.5*Math.pow(pos,4);
    		return -0.5 * ((pos-=2)*Math.pow(pos,3) - 2);
  		}

	}

	this.showTimingFunc = function() {
		console.dir(timingFunctions);
	}
}

