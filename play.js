var audio = document.getElementsByTagName('audio')[0],
 controls = document.getElementsByTagName('rowspan'),
 pic = document.images[0],
 spans = document.getElementsByTagName('span');
controls[0].addEventListener('click', play);
controls[1].addEventListener('click', stop);
spans[0].addEventListener('click', show_1);
spans[1].addEventListener('click', show_2);
controls[0].click();
var timer = null;
function play(){
	audio.play();
	clearInterval(timer);
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

function show_1(){
	audio.src = "http://m10.music.126.net/20160122232648/8f6e73677e7c71f57581d5377ee7e0c6/ymusic/1740/3891/913f/33532b549afe2ada4caf071d9ade35f4.mp3";
}	controls[0].click();

function show_2(){
	audio.src='http://m10.music.126.net/20160122230600/04c05c27900dcf221ab791d9fecd6606/ymusic/1740/3891/913f/33532b549afe2ada4caf071d9ade35f4.mp3'
"http://m10.music.126.net/20160122230600/04c05c27900dcf221ab791d9fecd6606/ymusic/1740/3891/913f/33532b549afe2ada4caf071d9ade35f4.mp3";
	controls[0].click();
}