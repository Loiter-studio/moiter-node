function drawCircle(percentage){
	var canvas = document.getElementById("myCanvas");

	var ctx = canvas.getContext("2d");

	/**/
	var grd=ctx.createLinearGradient(70,8,70,132);
	grd.addColorStop(0,"#B0B0B0");
	grd.addColorStop(1,"white");
	var angle = percentage * 2;

	ctx.fillStyle=grd;
	ctx.strokeStyle="#E1E1E1";
	ctx.beginPath();
	ctx.arc(70,70,62,0,2*Math.PI);
	ctx.fill();
	ctx.stroke();

	ctx.beginPath();
	ctx.moveTo(70,70);
	ctx.arc(70,70,56,0,2*Math.PI,true);
	ctx.fill();
	ctx.stroke();

	ctx.fillStyle ="YellowGreen";
	ctx.beginPath();
	ctx.moveTo(70,70);
	ctx.arc(70,70,56,0,angle*Math.PI,false);
	ctx.fill();
	ctx.stroke();


	ctx.fillStyle="#eef3e2";
	ctx.beginPath();
	ctx.arc(70,70,49,0,2*Math.PI); 	 
	ctx.fill();
	ctx.stroke();

	var percentage=angle/2*100;
	document.getElementById("percentage").innerText = percentage;
	//document.write("<div id=\"percentage\">"+percentage+"</div>"); 
	var d=new Date();
	var day=d.getDate();
	var month=d.getMonth() + 1;
	var year=d.getFullYear();
	document.getElementById("date").innerText = day + "/" + month + "/" + year;
	//document.write("<div id=\"date\">"+ day + "/" + month + "/" + year+"</div>");
}
