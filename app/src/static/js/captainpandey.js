$(document).ready(function(){
//	var values = $.map($('.match-player:eq(1) option'), function(e) { return e.text; });
//	// as a comma separated string
//	values.join(',');
//	alert(values);
//	
//	$('.match-player').on('mouseover',function() {
//		alert(1);
	//$(this).filter('option').each(function(){alert($(this).text());});
	//var values = $(this).filter('option').map(function() { return $(this).val(); });

	//alert($(this).html());
//	alert(values);
//	index = $('.match-player').index(this);
//	alert($(this).html());
//	$('.select-player-team').html($(this).html());
//	$('.select-player-team').html($(this).html()).animate({
//	    left: 0
//	  }, 5000, function() {
//	    // Animation complete.
//	  });
//	


//	});
//	{
//		icons: [
//			{find: '.batsman'}
//		],
//		bgImage: function() {
//			return $(this).css("background-image");
//		}
//	}
	$('select.match-player').selectmenu();
//	$('ul.ui-selectmenu-menu-dropdown').niceScroll({touchbehavior:false,cursorcolor:"#000000",cursoropacitymax:0.9,cursorwidth:10,cursorborder:"none",cursorborderradius:"2px",boxzoom:false,cursoropacitymin:0.8});
	$('.schedule-content').niceScroll({touchbehavior:false,cursorcolor:"#8E9897",cursoropacitymax:0.8,cursorwidth:9,cursorborder:"none",cursorborderradius:"2px",boxzoom:false,cursoropacitymin:0.5});
	$('.prediction_slider_run').slider({
		 	range: "max",
			min:0,
			max:150,
			step: 1,
			slide: function( event, ui ) {
				var prediction_player = $('.prediction_player_run');
				var ind = $('.prediction_slider_run').index(this);
				prediction_player.eq(ind).val( ui.value );
			}
	 });
	$('.prediction_slider_wicket').slider({
	 	range: "max",
		min:1,
		max:10,
		step: 1,
		slide: function( event, ui ) {
			var prediction_player = $('.prediction_player_wicket');
			var ind = $('.prediction_slider_wicket').index(this);
			prediction_player.eq(ind).val( ui.value );
		}
 });
	$('.prediction_slider_six').slider({
	 	range: "max",
		min:1,
		max:20,
		step: 1,
		slide: function( event, ui ) {
			var prediction_player = $('.prediction_player_six');
			var ind = $('.prediction_slider_six').index(this);
			prediction_player.eq(ind).val( ui.value );
		}
 });
});