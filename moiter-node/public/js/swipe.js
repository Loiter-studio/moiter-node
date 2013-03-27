//the slide action
window.onload=function(){
	var obj=document.getElementById("test");
	var drag=false;
	var difX=difY=0;
	obj.onmousedown=function(event){
		obj.style.cursor="move";
		var event=event||window.event;
		drag=true;
		//get the position to the container
		difX=event.clientX-obj.offsetLeft;
		difY=event.clientY-obj.offsetTop;
		return false;
		}
	//the mousemove action
	obj.onmousemove=function(event){
		if (!drag) return;
		var event=event||window.event;
		//get the instant position during the movement
		iL=event.clientX-difX;
		iT=event.clientY-difY;
		var maxL=document.documentElement.clientX-obj.offsetWidth;
		var maxT=document.documentElement.clientY-obj.offsetHeight;
		//judge the width limitation
		iL = iL > maxL ? maxL : iL;	
		iT = iT > maxT ? maxT : iT;
		obj.style.marginTop=obj.style.marginLeft=0;
		//set the position during movement
		obj.style.left=iL+"px";
		
		if(iL >0)
		{
			$("#wrap").show();
			$("#wrap2").hide();		
			document.onmouseup=function(){
				drag=false;
				if(iL > 200)
				{
					$("#test").animate({left:'80%'});
				}
				else
				{
					$("#test").animate({left:'0'});
				}
				
				$("#test").animate({})
				
			}
		}
		if(iL < 0)
		{
			$("#wrap2").show();
			$("#wrap").hide();
			
			document.onmouseup=function(){
				drag=false;
				if(iL < -200)
				{
					$("#test").animate({left:'-80%'});
				}
				else
				{
					$("#test").animate({left:'0'});
				}
				
			}
		}
		
		return false;
		}
	//mouseup action
	document.onmouseup=function(){
		drag=false;
		obj.style.cursor="default";
		obj.style.opacity=1;
		}
	}

	
//the slide menu
$(document).ready(function(){
	$("div.text").hide();
	$(".box h1").click(function(){
		$(this).next(".text").slideToggle("fast");
	})
});