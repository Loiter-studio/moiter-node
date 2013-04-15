var myScroll,myScroll1,myScroll2,
	pullDownEl, pullDownOffset,
	generatedCount = 0;
var width=document.documentElement.clientWidth;
var place=0;

function pullDownAction () {
	setTimeout(function () {	// <-- Simulate network congestion, remove setTimeout from production!
		var el, li, i;
		el = document.getElementById('thelist');
		myScroll.refresh();		// Remember to refresh when contents are loaded (ie: on ajax completion)
	}, 1000);	// <-- Simulate network congestion, remove setTimeout from production!
}

function pullUpAction () {
	setTimeout(function () {	// <-- Simulate network congestion, remove setTimeout from production!
		var el, li, i;
		el = document.getElementById('thelist');
		myScroll.refresh();		// Remember to refresh when contents are loaded (ie: on ajax completion)
	}, 1000);	// <-- Simulate network congestion, remove setTimeout from production!
}

function loaded() {
	pullDownEl = document.getElementById('pullDown');
	pullDownOffset = pullDownEl.offsetHeight;
	
	myScroll1 = new iScroll('scroller1',{
	});
	
	myScroll2 = new iScroll('scroller2',{
	});
	
	myScroll = new iScroll('wrapper', {
		useTransition: true,
		topOffset: pullDownOffset,
		hScrollbar:false,
		vScrollbar:false,
		
		onRefresh: function () {
			if (pullDownEl.className.match('loading')) {
				pullDownEl.className = '';
				pullDownEl.querySelector('.pullDownLabel').innerHTML = 'Pull down to refresh...';
			} 
		},
		
		onScrollMove: function () {
			if ( this.y > 50 && !pullDownEl.className.match('flip')) {
				pullDownEl.className = 'flip';
				pullDownEl.querySelector('.pullDownLabel').innerHTML = 'Release to refresh...';
				this.minScrollY = 0;
			} else if (this.y < 50 && pullDownEl.className.match('flip')) {
				pullDownEl.className = '';
				pullDownEl.querySelector('.pullDownLabel').innerHTML = 'Pull down to refresh...';
				this.minScrollY = -pullDownOffset;
			} 
		},
		
		onScrollEnd: function () {
			if (pullDownEl.className.match('flip')) {
				pullDownEl.className = 'loading';
				pullDownEl.querySelector('.pullDownLabel').innerHTML = 'Loading...';				
				pullDownAction();	// Execute custom function (ajax call?)
			} 
			
			if(this.absDistY < 0.05*width && this.distX > 0.15*width && place==0){
				$("#wrap").show();
				$("#wrap2").hide();
				$("#wrapper").css3Animate({
					x:"80%",
					time:"150ms",
				});
				place=1;
			}
			
			if(this.absDistY < 0.05*width && this.distX > 0.15*width && place==-1){
				$("#wrapper").css3Animate({
					x:"0",
					time:"150ms",
				});
				place=0;
			}
			
			if(this.absDistY < 0.05*width && this.distX < -0.15*width && place==0){	
				$("#wrap2").show();
				$("#wrap").hide();
				$("#wrapper").css3Animate({
					x:"-80%",
					time:"150ms",
				});
				place=-1;
			}
			
			if(this.absDistY < 0.05*width && this.distX < -0.15*width && place==1){
				$("#wrapper").css3Animate({
					x:"0",
					time:"150ms",
				});
				place=0;
			}
		},
		
		onTouchEnd: function () {
			var self = this;
			if (self.touchEndTimeId) {
			clearTimeout(self.touchEndTimeId);
			}

			self.touchEndTimeId = setTimeout(function () {
			self.absDistX = 0;
			self.absDistX = 0;
			}, 10)
		},
		
	});
	
	setTimeout(function () { document.getElementById('wrapper').style.left = '0'; }, 800);
}

document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);

document.addEventListener('DOMContentLoaded', function () { setTimeout(loaded, 200); }, false);