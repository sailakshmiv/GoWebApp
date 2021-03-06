/*
Background Music Reference: https://youtu.be/G_h17RhIzbc
							https://youtu.be/P_xFh7XFC_w
							https://youtu.be/DfTsofeTkwg
Code Reference: Development Technology Training Center: https://www.developphp.com/video/JavaScript/Audio-Seek-and-Volume-Range-Slider-Tutorial
*/

var audio, playbtn, mutebtn, volumeslider, seeking=false, seekto;
var lastValue;
var musicList = ["assets/Love Yourself.mp3", "assets/River Flow in You.mp3", "assets/Thinking Out Loud.mp3", "assets/Always With Me.mp3", "assets/Counting Stars.mp3", "assets/Voyage 1960.mp3", "assets/Voyage 1970.mp3", "assets/Bloom Nobly.mp3", "assets/Border of Life.mp3"];
var backgroundMusicInit = function(){
	if (musicInitialized) {
		return;
	}

	audio = new Audio();
	var musicID = Math.floor(Math.random() * 1024 % musicList.length);
	var musicFileName = musicList[musicID];
	var musicTitleTextBox = document.getElementById('musicTitle');
	for (var i = 0; i < musicList.length; i++) {
		var newOption = document.createElement('option');
		newOption.setAttribute('value', musicList[i]);
		var optionText = document.createTextNode(musicList[i].split('/')[1].split('.')[0]);
		newOption.appendChild(optionText);
		musicTitleTextBox.appendChild(newOption);
	}
	$('#musicTitle').change(function(){
		var isPreviouslyPaused = audio.paused;
		audio.src = musicList[musicTitleTextBox.selectedIndex];
		if(isPreviouslyPaused){
			audio.pause();
		}
		else{
			audio.play();
		}
	});
	audio.onended = function(){
		var newIndex = (musicTitleTextBox.selectedIndex + 1) % musicList.length;
		audio.src = musicList[newIndex];
		musicTitleTextBox.selectedIndex = newIndex;
		audio.play();
	};
	musicTitleTextBox.selectedIndex = musicID;
	audio.src = musicFileName;
	// audio.loop = true;
	audio.play();

	playbtn = document.getElementById("playButton");
	mutebtn = document.getElementById("muteButton");
	volumeslider = document.getElementById("volumeslider");
	lastValue = volumeslider.value;
	mutebtn.onclick = function() {
		audio.muted = !audio.muted;
		mutebtn.src = !audio.muted?'assets/volume.png':'assets/volume_mute.png';
		volumeslider.value = audio.muted?0:lastValue;
	}

	playbtn.onclick = function(){
		audio.paused?audio.play():audio.pause();
		playbtn.src = audio.paused?'assets/player.png':'assets/pause.png';
	}

	volumeslider.onchange = function(){
	    audio.volume = volumeslider.value / 100;
	    lastValue = volumeslider.value;
	};
	musicInitialized = true;
}

var changeColor = function(color){
	document.body.style.background = color;
	if(color == '#e6e6ff'){	//light purple
		document.getElementById("barColor").style.background = '#ccccff';
		colorControlObject.squareFill = '#cceeff';
		colorControlObject.squareStroke = 'rgba(0, 51, 204, 0.15)';
		if ($('#history-controls').css('display') != 'none') {
			renderHistoryGameBoard();
		}else{
			renderUnfinishedGameBoard();
		}
	}
	if(color == '#cceeff'){	//light blue
		document.getElementById("barColor").style.background = '#99ddff';
		colorControlObject.squareFill = '#ffe6cc';
		colorControlObject.squareStroke = '#cccccc';
		if ($('#history-controls').css('display') != 'none') {
			renderHistoryGameBoard();
		}else{
			renderUnfinishedGameBoard();
		}
	}
	if(color == '#ffe6f2'){	//light pink
		document.getElementById("barColor").style.background = '#ffcce6';
		colorControlObject.squareFill = '#ffb3d9';
		colorControlObject.squareStroke = '#ffffff';
		if ($('#history-controls').css('display') != 'none') {
			renderHistoryGameBoard();
		}else{
			renderUnfinishedGameBoard();
		}
	}
	if(color == '#ffffff'){	//white
		document.getElementById("barColor").style.background = '#ffffff';
		colorControlObject.squareFill = 'rgb(245, 227, 214)';
		colorControlObject.squareStroke = 'rgb(234, 200, 174)';
		if ($('#history-controls').css('display') != 'none') {
			renderHistoryGameBoard();
		}else{
			renderUnfinishedGameBoard();
		}
	}
}

