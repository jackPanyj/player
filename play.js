		window.onload=function()
		{
			get_lyric("get_lyric_data","冯绍峰 - 百年轮回.lrc","");
			get_lyric("get_music_list","","list");
			play();
		}
		var lrc_data = [];								//存放歌词数据
		var animate;									//设置歌词动画函数指针
		var process;
		function get_lyric(method,lyric_name,ob)
		{
			$.ajax({
        		cache: true,
        		type: "GET",
       			url: "get_lrc.php?method="+method+"&name="+encodeURI(lyric_name),
        		async: true,
        		dataType: "json",
        		success: function(data) {
        			if(data.state == "success")
        			{
        				if(method == "get_music_list")
            			{
            				deal_music_list(data.music_list,ob);
            			}else{
            				deal_lyric_data(data.lrc);
            			}
            		}else{
            			alert(data.message);
            		}
        		},
        		error: function(XMLHttpRequest,textStatus,errorThrown) {
            		alert(textStatus);
        		}
			});
		}
		function deal_music_list(music_list_data,music_list_object)
		{
			var music_list_object = document.getElementById(music_list_object);
			var list="";
			for(var i=0; i < music_list_data.length; ++i)
			{
				list+="<p onclick=\"music_change(" + i + ")\" id=\"music" + i + "\">"+music_list_data[i]+"</p>";
			}
			music_list_object.innerHTML = list;
		}
		function deal_lyric_data(ajax_lrc_data)
		{
			lrc_data.splice(0,lrc_data.length);
			var lrc_list = ajax_lrc_data.split(",");
			var lrc_length = lrc_list.length;
			// var index=0;
			var time_min;
			var time_sec;
			for(var i=0; i< lrc_length; ++i)
			{
				// index = lrc_list[i].indexOf("]");
				time_min = parseInt( lrc_list[i].substr(2,1) )*60*1000;
				time_sec = parseFloat( lrc_list[i].substr(4,5) )*1000;
				lrc_data.push( [time_min + time_sec,lrc_list[i].substr(10)] );
				if(lrc_data[i][1] == "")
				{
					lrc_data[i][1] = "&nbsp;";
				}
			}
			init_lrc();
		}
		function music_change(music_id)
		{
			stop();
			var src = document.getElementById("music"+music_id).innerHTML;
			document.getElementById("media").src = "mp3/"+src;
			get_lyric("get_lyric_data",src.split(".")[0]+".lrc","");
			play();
		}
		function lrc_style_default()
		{
			for(var i=0; i< lrc_data.length; ++i)
			{
				document.getElementById("t"+lrc_data[i][0]).style.fontSize = "20px";
				document.getElementById("t"+lrc_data[i][0]).style.color = "black";
			}
		}
		function init_lrc()
		{
			var lrc="";
			var lrc_p="<p id=\"t";
			var lrc_p_end="\">";
			for(var i=0; i< lrc_data.length; ++i)
			{
				lrc+=lrc_p + lrc_data[i][0] + lrc_p_end + lrc_data[i][1] + "</p>";
			}
			document.getElementById("lrc_move").innerHTML = lrc;
		}
		function lrc_animate()
		{
			if(lrc_data.length != 0)
			{
				var i=0;
				var top=0;
				var lrc_move = document.getElementById('lrc_move');
				var current_time = document.getElementById("media").currentTime*1000;
				for(i=0; i< lrc_data.length; ++i)
				{
					if( current_time < lrc_data[i][0] || ( i == lrc_data.length-1 ) || (current_time >=lrc_data[i][0] && current_time < lrc_data[i+1][0]) )
					{
						break;
					}
				}
				top = 150 - 38*i;
				document.getElementById("t"+lrc_data[i][0]).style.fontSize = "40px";
				document.getElementById("t"+lrc_data[i][0]).style.color = "red";
				document.getElementById("t"+lrc_data[i][0]).style.textShadow="2px 5px 5px #666";
				if(i != 0 )
				{
					document.getElementById("t"+lrc_data[i-1][0]).style.fontSize = "20px";
					document.getElementById("t"+lrc_data[i-1][0]).style.color = "black";
					document.getElementById("t"+lrc_data[i-1][0]).style.textShadow="0px 0px 10px #555";
				}
				lrc_move.style.top = top+"px";
			}
		}
		function deal_process_time()
		{
			var width = document.getElementById("play_border").offsetWidth - document.getElementById("process_img").offsetWidth;
			var media = document.getElementById("media");
			var currentTime = media.currentTime;
			var length = media.duration;
			document.getElementById("process_img").style.left=width*(currentTime/length)+"px";
		}
		function play()
		{
			lrc_animate();
			animate = setInterval(lrc_animate,100);
			process = setInterval(deal_process_time,100);
			document.getElementById("media").play();
		}
		function stop()
		{
			clearInterval(animate);
			clearInterval(process);
			document.getElementById("media").pause();
		}