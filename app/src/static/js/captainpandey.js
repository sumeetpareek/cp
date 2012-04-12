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
			var width=$.cookie('pred_player_run')*100/100;
			obj.find('input[name="player_run_pred"]').nextAll('.ui-slider').find('.ui-slider-range').css('width',100-width+'%');
			obj.find('input[name="player_run_pred"]').nextAll('.ui-slider').find('.ui-slider-handle').css('left',width+'%');
			obj.find('input[name="player_wicket_pred"]').val($.cookie('pred_player_wicket'));
			var width=$.cookie('pred_player_wicket')*100/5;
			obj.find('input[name="player_wicket_pred"]').nextAll('.ui-slider').find('.ui-slider-range').css('width',100-width+'%');
			obj.find('input[name="player_wicket_pred"]').nextAll('.ui-slider').find('.ui-slider-handle').css('left',width+'%');
			obj.find('input[name="player_six_pred"]').val($.cookie('pred_player_six'));
			var width=$.cookie('pred_player_six')*100/5;
			obj.find('input[name="player_six_pred"]').nextAll('.ui-slider').find('.ui-slider-range').css('width',100-width+'%');
			obj.find('input[name="player_six_pred"]').nextAll('.ui-slider').find('.ui-slider-handle').css('left',width+'%');
			obj.find('input[name="team_run_pred"]').val($.cookie('pred_team_run'));
			var width=$.cookie('pred_team_run')*100/200;
			obj.find('input[name="team_run_pred"]').nextAll('.ui-slider').find('.ui-slider-range').css('width',100-width+'%');
			obj.find('input[name="team_run_pred"]').nextAll('.ui-slider').find('.ui-slider-handle').css('left',width+'%');
			obj.find('input[name="team_six_pred"]').val($.cookie('pred_team_six'));
			var width=$.cookie('pred_team_six')*100/10;
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

	
	var player_run_pred_width = $('.active .prediction-select-wrapper.player_run .prediction-value');
	player_run_pred_width.find('.bar').css('width',parseInt(player_run_pred_width.find('.value').text())*150/100+'px');
	var player_run_actual_width = $('.active .prediction-select-wrapper.player_run .stat-value');
	player_run_actual_width.find('.bar').css('width',parseInt(player_run_actual_width.find('.value').text())*150/100+'px');
	 $('.active .prediction-select-wrapper.player_run .prediction-points').text(isNaN(target = 1000-Math.abs(parseInt(player_run_actual_width.find('.value').text()) - parseInt(player_run_pred_width.find('.value').text()))*1000/100)?0:target);
	
	var player_wicket_pred_width = $('.active .prediction-select-wrapper.player_wicket .prediction-value');
	player_wicket_pred_width.find('.bar').css('width',parseInt(player_wicket_pred_width.find('.value').text())*150/5+'px');
	var player_wicket_actual_width = $('.active .prediction-select-wrapper.player_wicket .stat-value');
	player_wicket_actual_width.find('.bar').css('width',parseInt(player_wicket_actual_width.find('.value').text())*150/5+'px');
	$('.active .prediction-select-wrapper.player_wicket .prediction-points').text(isNaN(target = 1000-Math.abs(parseInt(player_wicket_actual_width.find('.value').text()) - parseInt(player_wicket_pred_width.find('.value').text()))*1000/5)?0:target);
	
	var player_six_pred_width = $('.active .prediction-select-wrapper.player_six .prediction-value');
	player_six_pred_width.find('.bar').css('width',parseInt(player_six_pred_width.find('.value').text())*150/5+'px');
	var player_six_actual_width = $('.active .prediction-select-wrapper.player_six .stat-value');
	player_six_actual_width.find('.bar').css('width',parseInt(player_six_actual_width.find('.value').text())*150/5+'px');
	$('.active .prediction-select-wrapper.player_six .prediction-points').text(isNaN(target = 1000-Math.abs(parseInt(player_six_actual_width.find('.value').text()) - parseInt(player_six_pred_width.find('.value').text()))*1000/5)?0:target);
	
	var team_run_pred_width = $('.active .prediction-select-wrapper.team_run .prediction-value');
	team_run_pred_width.find('.bar').css('width',parseInt(team_run_pred_width.find('.value').text())*150/200+'px');
	var team_run_actual_width = $('.active .prediction-select-wrapper.team_run .stat-value');
	team_run_actual_width.find('.bar').css('width',parseInt(team_run_actual_width.find('.value').text())*150/200+'px');
	$('.active .prediction-select-wrapper.team_run .prediction-points').text(isNaN(target = 1000-Math.abs(parseInt(team_run_actual_width.find('.value').text()) - parseInt(team_run_pred_width.find('.value').text()))*1000/200)?0:target);
	
	var team_six_pred_width = $('.active .prediction-select-wrapper.team_six .prediction-value');
	team_six_pred_width.find('.bar').css('width',parseInt(team_six_pred_width.find('.value').text())*150/10+'px');
	var team_six_actual_width = $('.active .prediction-select-wrapper.team_six .stat-value');
	team_six_actual_width.find('.bar').css('width',parseInt(team_six_actual_width.find('.value').text())*150/10+'px');
	 $('.active .prediction-select-wrapper.team_six .prediction-points').text(isNaN(target = 1000-Math.abs(parseInt(team_six_actual_width.find('.value').text()) - parseInt(team_six_pred_width.find('.value').text()))*1000/10)?0:target);
	
	$('select.match_player').selectmenu();
//	$('ul.ui-selectmenu-menu-dropdown').niceScroll({touchbehavior:false,cursorcolor:"#000000",cursoropacitymax:0.9,cursorwidth:10,cursorborder:"none",cursorborderradius:"2px",boxzoom:false,cursoropacitymin:0.8});
	$('.schedule-content').niceScroll({touchbehavior:false,cursorcolor:"#8E9897",cursoropacitymax:0.8,cursorwidth:9,cursorborder:"none",cursorborderradius:"2px",boxzoom:false,cursoropacitymin:0.5});
	$('.prediction_slider_run').slider({
		 	range: "max",
			min:0,
			max:100,
			step: 1,
			create:function( event, ui ) {
				var prediction_player = $('.prediction_player_run');
				var ind = $('.prediction_slider_run').index(this);
				$('.prediction_slider_run').eq(ind).slider( "option", "value", prediction_player.eq(ind).val() );
			},
			slide: function( event, ui ) {
				var prediction_player = $('.prediction_player_run');
				var ind = $('.prediction_slider_run').index(this);
				prediction_player.eq(ind).val( ui.value );
			}
	 });
	$('.prediction_slider_wicket').slider({
	 	range: "max",
		min:1,
		max:5,
		step: 1,
		create:function( event, ui ) {
			var prediction_player = $('.prediction_player_wicket');
			var ind = $('.prediction_slider_wicket').index(this);
			$('.prediction_slider_wicket').eq(ind).slider( "option", "value", prediction_player.eq(ind).val() );
		},
		slide: function( event, ui ) {
			var prediction_player = $('.prediction_player_wicket');
			var ind = $('.prediction_slider_wicket').index(this);
			prediction_player.eq(ind).val( ui.value );
		}
 });
	$('.prediction_slider_six').slider({
	 	range: "max",
		min:1,
		max:5,
		step: 1,
		create:function( event, ui ) {
			var prediction_player = $('.prediction_player_six');
			var ind = $('.prediction_slider_six').index(this);
			$('.prediction_slider_six').eq(ind).slider( "option", "value", prediction_player.eq(ind).val() );
		},
		slide: function( event, ui ) {
			var prediction_player = $('.prediction_player_six');
			var ind = $('.prediction_slider_six').index(this);
			prediction_player.eq(ind).val( ui.value );
		}
 });
	
	$('.prediction_slider_six_team').slider({
	 	range: "max",
		min:1,
		max:10,
		step: 1,
		create:function( event, ui ) {
			var prediction_player = $('.prediction_player_six_team');
			var ind = $('.prediction_slider_six_team').index(this);
			$('.prediction_slider_six_team').eq(ind).slider( "option", "value", prediction_player.eq(ind).val() );
		},
		slide: function( event, ui ) {
			var prediction_player = $('.prediction_player_six_team');
			var ind = $('.prediction_slider_six_team').index(this);
			prediction_player.eq(ind).val( ui.value );
		}
 });
	$('.prediction_slider_run_team').slider({
	 	range: "max",
		min:0,
		max:200,
		step: 1,
		create:function( event, ui ) {
			var prediction_player = $('.prediction_player_run_team');
			var ind = $('.prediction_slider_run_team').index(this);
			$('.prediction_slider_run_team').eq(ind).slider( "option", "value", prediction_player.eq(ind).val() );
		},
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
			show_action_message('You need to fill all the marked fields.');
			form.find('select[value="default"] option:selected').parents('.prediction-select-wrapper').css('border','1px solid red');
			form.find('input').filter(function() {
			    return $(this).val()==='';
			}).nextAll('.prediction-unit').css('color','red');
			event.preventDefault();
		} else{
//			alert('go');
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
				show_action_message('Please login before we can save your predictions.');
				event.preventDefault();
			}
//		event.preventDefault();
		}
	});
	
//		if($("#user-login-form #edit-name-wrapper input").val() == '')
//		{
//		event.preventDefault();
//		$("#user-login-form #edit-name-wrapper input").css('border-color','#E163AE');
//		$("#user-login-form #edit-name-wrapper label").text('Please fill....');
//		} else {$("#user-login-form #edit-name-wrapper input").css('border-color','#AAAAAA');}

});