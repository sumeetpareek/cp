$(document).ready(function(){
	if($.cookie('match_id') == null)
		$('#sidebar .match-link-open').eq(0).click();
	else
		{
		var match_id_cookie = $('#'+$.cookie('match_id'));
		match_id_cookie.slideDown('slow',function(){
			var obj = $(this);
			obj.addClass('active');
			obj.find('select.match_player[name="player_run"]').val($.cookie('player_run')).attr('option','selected').text(); 
			obj.find('select.match_player[name="player_run"]').nextAll('span').find('.ui-selectmenu-status').text(obj.find('select.match_player[name="player_run"] option:selected').text());
			obj.find('select.match_player[name="player_wicket"]').val($.cookie('player_wicket'));
			obj.find('select.match_player[name="player_wicket"]').nextAll('span').find('.ui-selectmenu-status').text(obj.find('select.match_player[name="player_wicket"] option:selected').text());
			obj.find('select.match_player[name="player_six"]').val($.cookie('player_six'));
			obj.find('select.match_player[name="player_six"]').nextAll('span').find('.ui-selectmenu-status').text(obj.find('select.match_player[name="player_six"] option:selected').text());
			obj.find('select.match_player[name="team_run"]').val($.cookie('team_run'));
			obj.find('select.match_player[name="team_run"]').nextAll('span').find('.ui-selectmenu-status').text(obj.find('select.match_player[name="team_run"] option:selected').text());
			obj.find('select.match_player[name="team_six"]').val($.cookie('team_six'));
			obj.find('select.match_player[name="team_six"]').nextAll('span').find('.ui-selectmenu-status').text(obj.find('select.match_player[name="team_six"] option:selected').text());
			obj.find('input[name="player_run_pred"]').val($.cookie('pred_player_run'));
			var width=$.cookie('pred_player_run')*100/150;
			obj.find('input[name="player_run_pred"]').nextAll('.ui-slider').find('.ui-slider-range').css('width',100-width+'%');
			obj.find('input[name="player_run_pred"]').nextAll('.ui-slider').find('.ui-slider-handle').css('left',width+'%');
			obj.find('input[name="player_wicket_pred"]').val($.cookie('pred_player_wicket'));
			var width=$.cookie('pred_player_wicket')*100/10;
			obj.find('input[name="player_wicket_pred"]').nextAll('.ui-slider').find('.ui-slider-range').css('width',100-width+'%');
			obj.find('input[name="player_wicket_pred"]').nextAll('.ui-slider').find('.ui-slider-handle').css('left',width+'%');
			obj.find('input[name="player_six_pred"]').val($.cookie('pred_player_six'));
			var width=$.cookie('pred_player_six')*100/20;
			obj.find('input[name="player_six_pred"]').nextAll('.ui-slider').find('.ui-slider-range').css('width',100-width+'%');
			obj.find('input[name="player_six_pred"]').nextAll('.ui-slider').find('.ui-slider-handle').css('left',width+'%');
			obj.find('input[name="team_run_pred"]').val($.cookie('pred_team_run'));
			var width=$.cookie('pred_team_run')*100/150;
			obj.find('input[name="team_run_pred"]').nextAll('.ui-slider').find('.ui-slider-range').css('width',100-width+'%');
			obj.find('input[name="team_run_pred"]').nextAll('.ui-slider').find('.ui-slider-handle').css('left',width+'%');
			obj.find('input[name="team_six_pred"]').val($.cookie('pred_team_six'));
			var width=$.cookie('pred_team_six')*100/20;
			obj.find('input[name="team_six_pred"]').nextAll('.ui-slider').find('.ui-slider-range').css('width',100-width+'%');
			obj.find('input[name="team_six_pred"]').nextAll('.ui-slider').find('.ui-slider-handle').css('left',width+'%');
			$.cookie('player_run',null);
			$.cookie('player_wicket',null);
			$.cookie('player_six',null); 
			$.cookie('team_run',null); 
			$.cookie('team_six',null);
			$.cookie('pred_player_run',null);
			$.cookie('pred_player_wicket',null); 
			$.cookie('pred_player_six',null);
			$.cookie('pred_team_run',null);
			$.cookie('pred_team_six',null);
			$.cookie('match_id',null);
		});	
		
		
		
		
		}
	//	$.cookie('player_run');
//	$.cookie('player_wicket');
//	$.cookie('player_six'); 
//	$.cookie('team_run'); 
//	$.cookie('team_six');
//	$.cookie('pred_player_run');
//	$.cookie('pred_player_wicket'); 
//	$.cookie('pred_player_six');
//	$.cookie('pred_team_run');
//	$.cookie('pred_team_six');
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
	$('select.match_player').selectmenu();
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
	
	$('.prediction_slider_six_team').slider({
	 	range: "max",
		min:1,
		max:30,
		step: 1,
		slide: function( event, ui ) {
			var prediction_player = $('.prediction_player_six_team');
			var ind = $('.prediction_slider_six_team').index(this);
			prediction_player.eq(ind).val( ui.value );
		}
 });
	$('.prediction_slider_run_team').slider({
	 	range: "max",
		min:0,
		max:250,
		step: 1,
		slide: function( event, ui ) {
			var prediction_player = $('.prediction_player_run_team');
			var ind = $('.prediction_slider_run_team').index(this);
			prediction_player.eq(ind).val( ui.value );
		}
 });
	
	//logic for form validation
	var match_main_form = $('.match-main form .submit');
	match_main_form.on('click',function(event){
		var ind = match_main_form.index(this);
		var message = $('#message');
		message.css('left','-300px');
		var form = $('form').eq(ind);
		form.find('.prediction-select-wrapper').css('border','none');
		form.find('.prediction-unit').css('color','#183152');
		
		
		var player_run = form.find('select.match_player[name="player_run"] option:selected').val(); 
		var player_wicket = form.find('select.match_player[name="player_wicket"] option:selected').val();
		var player_six = form.find('select.match_player[name="player_six"] option:selected').val();
		var team_run = form.find('select.match_player[name="team_run"] option:selected').val();
		var team_six = form.find('select.match_player[name="team_six"] option:selected').val(); 
		var pred_player_run = form.find('input[name="player_run_pred"]').val();
		var pred_player_wicket = form.find('input[name="player_wicket_pred"]').val();
		var pred_player_six = form.find('input[name="player_six_pred"]').val();
		var pred_team_run = form.find('input[name="team_run_pred"]').val();
		var pred_team_six = form.find('input[name="team_six_pred"]').val();
		
		
		
		
		
		if( player_run == 'default' || player_wicket == 'default'|| player_six == 'default'
			|| team_run == 'default'|| team_six == 'default' 
			|| pred_player_run == ''
			|| pred_player_wicket == ''
			|| pred_player_six == ''
			|| pred_team_run == ''
			|| pred_team_run == ''
			) {
			message.text('please fill the form').animate({
			    left: '164px',
			    top:'144px'
				  }, 500,'swing', function() {
				    // Animation complete.
				  });
			form.find('select[value="default"] option:selected').parents('.prediction-select-wrapper').css('border','1px solid red');
			form.find('input').filter(function() {
			    return $(this).val()==='';
			}).nextAll('.prediction-unit').css('color','red');
			event.preventDefault();
		} else{
			if($('body').hasClass('anon-user')){
				$.cookie('player_run',player_run);
				$.cookie('player_wicket',player_wicket);
				$.cookie('player_six',player_six); 
				$.cookie('team_run',team_run); 
				$.cookie('team_six',team_six);
				$.cookie('pred_player_run',pred_player_run);
				$.cookie('pred_player_wicket',pred_player_wicket); 
				$.cookie('pred_player_six',pred_player_six);
				$.cookie('pred_team_run',pred_team_run);
				$.cookie('pred_team_six',pred_team_six);
				$.cookie('match_id',$('.match-main-open.active').attr('id'));
				message.text('Please log in first').animate({
				    left: '30%',
				    top:'50%',
				    'z-index':10,
				    'font-size':'1.5em'
					  }, 100,'swing', function() {
					    // Animation complete.
					  });
				event.preventDefault();
			}
		}
	});
//		if($("#user-login-form #edit-name-wrapper input").val() == '')
//		{
//		event.preventDefault();
//		$("#user-login-form #edit-name-wrapper input").css('border-color','#E163AE');
//		$("#user-login-form #edit-name-wrapper label").text('Please fill....');
//		} else {$("#user-login-form #edit-name-wrapper input").css('border-color','#AAAAAA');}

});