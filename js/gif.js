var gif_bgs 	= [];
var gif_center 	= [];

var length_bgs = 0;
var length_center = 0;

var timer;
var duration = 4000;
var loaded = 0;
var next_bg;
var next_center;

function next(e){	
	clearInterval(timer);
	timer = setInterval(next, duration);

	
	$("#background").css("background-image","url("+gif_bgs[next_bg]+")");
	$("#center").css("background-image","url("+gif_center[next_center]+")");

	next_bg 	= Math.floor( Math.random()*length_bgs );
	next_center = Math.floor( Math.random()*length_center );
	
	$("#load_bg").attr("src",gif_bgs[next_bg]);
	$("#load_center").attr("src",gif_center[next_center]);
}

function check(){
	if (loaded > 1) {
		next_bg 	= Math.floor( Math.random()*length_bgs );
		next_center = Math.floor( Math.random()*length_center );
		next();
		$("#wrapper").click(next);
	}
}	
function init() {

	$.ajax({
		url: "json/bg.json",
		cache: false,
		dataType: "json",
		success: function(d){
			gif_bgs = d;
			length_bgs = gif_bgs.length;
			loaded++;
			check();
		}
	});
	$.ajax({
		url: "json/center.json",
		cache: false,
		dataType: "json",
		success: function(d){
			gif_center = d;
			length_center = gif_center.length;
			loaded++;
			check();
		}
	});	
}

$(window).on("ready",init);