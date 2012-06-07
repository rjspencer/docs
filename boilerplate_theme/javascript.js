var firstClicked = false;
$('document').ready(function()
{
	$('.video-blocks li a').click(function(e)
	{
		e.preventDefault();
		$(this).parents('li').siblings('.current').removeClass('current').end().addClass('current');
		if ( firstClicked )
		{
			var pos = $('.video-container').offset();
			$('body').animate({ scrollTop: pos.top - 40});
		}
		else
		{
			firstClicked = true;
		}
		$('.video-container').html(sbVideoList[$(this).attr('data-id')]);
	}).first().click();

	$("#jquery_jplayer").jPlayer({
		swfPath: "//stagebloc.com/assets/js/jplayer/",
		wmode: "transparent",
		supplied: "mp3",
		cssSelectorAncestor: "#jp_container"
	})
	.bind($.jPlayer.event.timeupdate + " " + $.jPlayer.event.loadedmetadata, function(event)
	{
		var status = event.jPlayer.status;
		$('#jp_container .jp-time-left').html($.jPlayer.convertTime(status.duration - status.currentTime));
	})
	.bind($.jPlayer.event.ended, function(event)
	{
		if ( $('#playlist-tracks li.current').next().length )
		{
			$('#playlist-tracks li.current').next().click();
		}
		else
		{
			$('#playlist-tracks li.current').removeClass('current');
			$('#jquery_jplayer').jPlayer("clearMedia");
		}
	});

	$('#playlist-tracks li').click(function()
	{
		$('#jquery_jplayer').jPlayer("setMedia", { mp3: $(this).attr('data-url') }).jPlayer("play");
		$(this).siblings().removeClass('current').end().addClass('current');
	});

	if ( $('#playlist-tracks').length )
	{
		$('#jquery_jplayer').jPlayer("setMedia", { mp3: $('#playlist-tracks li').first().attr('data-url') });
		$('#playlist-tracks li').first().addClass('current');
	}
	else if ( $('.jp-audio-activity-stream').length )
	{
		 $('.jp-audio-activity-stream').each(function()
		 {
		 	var id = $(this).attr('data-id'),
		 		url = $(this).attr('data-url');

		 	$("#jquery_jplayer" + id).jPlayer({ ready: function() { $(this).jPlayer("setMedia", { mp3: url }); },
		 		swfPath: "//stagebloc.com/assets/js/jplayer/", wmode: "transparent", supplied: "mp3", cssSelectorAncestor: "#jp_container" + id })
			.bind($.jPlayer.event.timeupdate + " " + $.jPlayer.event.loadedmetadata, function(event)
			{ $('#jp_container' + id + ' .jp-time-left').html($.jPlayer.convertTime(event.jPlayer.status.duration - event.jPlayer.status.currentTime)); })
			.bind($.jPlayer.event.play, function() { $(this).jPlayer("pauseOthers"); });
		});
	}
	else if ( $('.jp-audio-single').length )
	{
		$('#jquery_jplayer').jPlayer("setMedia", { mp3: $('.jp-audio-single').attr('data-url') });
	}

	$('.jp-controls .jp-previous').click(function()
	{
		if ( $('#playlist-tracks li.current').prev().length )
			$('#playlist-tracks li.current').prev().click();
		else
			$('#playlist-tracks li').last().click();
	});
	$('.jp-controls .jp-next').click(function()
	{
		if ( $('#playlist-tracks li.current').next().length )
			$('#playlist-tracks li.current').next().click();
		else
			$('#playlist-tracks li').first().click();
	});

	$('#playlist-tracks li a').click(function(e)
	{
		e.stopPropagation();
	});
});