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
	var play_border,song_time;
	timer = setInterval(function() {
		play_border = document.querySelector('.play_border'),
			  song_time = audio.duration;
		pic.style.left = audio.currentTime/song_time * play_border.getBoundingClientRect().width + 'px';
	}, 200);
}

function stop(){
	clearInterval(timer);
	audio.pause();
}

function show_1(){
	audio.src = "http://m10.music.126.net/20170122232648/8f6e73677e7c71f57581d5377ee7e0c6/ymusic/1740/3891/913f/33532b549afe2ada4caf071d9ade35f4.mp3";
}	controls[0].click();

function show_2(){
	audio.src='http://m10.music.126.net/20160122232648/8f6e73677e7c71f57581d5377ee7e0c6/ymusic/1740/3891/913f/33532b549afe2ada4caf071d9ade35f4.mp3';
	controls[0].click();
}