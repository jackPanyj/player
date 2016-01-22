var audio = document.getElementsByTagName('audio')[0],
 controls = document.getElementsByTagName('rowspan'),
 pic = document.images[0];
controls[0].addEventListener('click', play);
controls[1].addEventListener('click', stop);
controls[0].click();
var timer = null;
function play(){
	audio.play();
	timer = setInterval(function() {
		var width = window.innerWidth > 1200 ? 68: 78;
		var song_time = audio.duration;
		pic.style.left = audio.currentTime/song_time * width + 'vw';
	}, 200);
}

function stop(){
	clearInterval(timer);
	audio.pause();
}

	

