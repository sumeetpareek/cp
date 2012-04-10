function postToFeed(url, name_val, caption_val, desc_val) {
	var obj = {
	  method: 'feed',
	  link: url,
	//  picture: 'http://localhost:8080/static/css/images/logo.png', //TODO use each match specific image here
	  name: name_val,
	  caption: caption_val,
	  description: desc_val
	};
	
	function callback(response) {
		if (response != null) {
			show_action_message("Done! That was cool :-)");
		} else {
			show_action_message("Your predictions were not shared :-(");
		}
	}
	
	FB.ui(obj, callback);
}


// Function to show "action message" and then hide it
function show_action_message(msg) {
	var p = $('.content').position();
	$('#message').text(msg).animate({
	left: p.left,
	top: p.top - $('#message').outerHeight() - 5,
	}, 500,'swing', function() {
		setTimeout(function(){$('#message').css('left','-300px').css('top','-40px');}, 3500);
	});
}


// Function to serialize form data - see http://stackoverflow.com/questions/1184624/convert-form-data-to-js-object-with-jquery
$.fn.serializeObject = function()
{
    var o = {};
    var a = this.serializeArray();
    $.each(a, function() {
        if (o[this.name] !== undefined) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};

// Things to do when the document is all ready
$(document).ready(function() {
	// On click of .points-fb-share-btn > TODO
	$('.points-fb-share-btn ').click(function() {
		// get the concerned match
		var parent_match_main = $(this).parents('.match-main');
		
		// form the message title
		var teams = parent_match_main.find('h1').text();
		var title = teams + ' - My predictions Vs Real score';
		var points = parent_match_main.find('.prediction-select-wrapper .prediction-points');
		var total_points = parseInt($(points[0]).text()) + parseInt($(points[1]).text()) + parseInt($(points[2]).text()) + parseInt($(points[3]).text()) + parseInt($(points[4]).text()); 
		var caption = 'I nailed '+total_points+' points out of 5000! Cool predictions huh? :-)';
		
		// Grab predictions permanent URL
		var perma_url = parent_match_main.find('input[name="perma_url"]').val();
		
		// Form the message description to be shared
		var names = parent_match_main.find('.prediction-select-wrapper .player-name');
		var pred_values = parent_match_main.find('.prediction-select-wrapper .prediction-value .value');
		var real_values = parent_match_main.find('.prediction-select-wrapper .stat-value .value');
		
		var message = '';
		message += ' (1) My runs prediction for '+$(names[0]).text()+' = '+$(pred_values[0]).text()+', actual runs = '+$(real_values[0]).text() ;
		message += ' (2) My wickets prediction for '+$(names[1]).text()+' = '+$(pred_values[1]).text()+', actual wickets = '+$(real_values[1]).text();
		message += ' (3) My sixes prediction for '+$(names[2]).text()+' = '+$(pred_values[2]).text()+', actual sixes = '+$(real_values[2]).text();
		message += ' (4) My runs prediction for '+$(names[3]).text()+' = '+$(pred_values[3]).text()+', actual runs = '+$(real_values[3]).text();
		message += '..and.. (5) My sixes prediction for '+$(names[4]).text()+' = '+$(pred_values[4]).text()+', actual sixes = '+$(real_values[4]).text();
		
		postToFeed(perma_url, title, caption, message);;
		return false;
		
	});
	
	
	// On click of .fb-share-btn's > we find parent .match-main > using the form values create a message to post
	$('.fb-share-btn').click(function(){
		// get the concerned match
		var parent_match_main = $(this).parents('.match-main');
		
		// form the message title
		var teams = parent_match_main.find('h1').text();
		var title = 'My predictions for the ' + teams + ' game!';
		var caption = 'Can you beat this? :-)'
		
		// Grab predictions permanent URL
		var perma_url = parent_match_main.find('input[name="perma_url"]').val();
		
		// form the message description to be shared
		var player_run = parent_match_main.find('select.match_player[name="player_run"] option:selected').text(); 
		var player_wicket = parent_match_main.find('select.match_player[name="player_wicket"] option:selected').text();
		var player_six = parent_match_main.find('select.match_player[name="player_six"] option:selected').text();
		var team_run = parent_match_main.find('select.match_player[name="team_run"] option:selected').text();
		var team_six = parent_match_main.find('select.match_player[name="team_six"] option:selected').text(); 
		var pred_player_run = parent_match_main.find('input[name="player_run_pred"]').val();
		var pred_player_wicket = parent_match_main.find('input[name="player_wicket_pred"]').val();
		var pred_player_six = parent_match_main.find('input[name="player_six_pred"]').val();
		var pred_team_run = parent_match_main.find('input[name="team_run_pred"]').val();
		var pred_team_six = parent_match_main.find('input[name="team_six_pred"]').val();
		
		
		var message = '';
		if (pred_player_run == 1) {
			message += 'I predict - \n (1) ' + player_run + ' will score just ' + pred_player_run + ' run (2) ';
		} else {
			message += 'I predict - \n (1) ' + player_run + ' will score about ' + pred_player_run + ' runs (2) ';
		}
		if (pred_player_wicket == 1) {
			message += player_wicket + ' will take just ' + pred_player_wicket + ' wicket (3) ';
		} else {
			message += player_wicket + ' will take ' + pred_player_wicket + ' wickets (3) ';
		}
		if (pred_player_six == 1) {
			message += player_six + ' will hit exactly ' + pred_player_six + ' six (4) ';
		} else {
			message += player_six + ' will hit ' + pred_player_six + ' sixes (4) ';
		}
		if (pred_team_run == 1) {
			message += team_run + ' will score just ' + pred_team_run + ' run .. and .. (5) ';
		} else {
			message += team_run + ' will score about ' + pred_team_run + ' runs .. and .. (5) ';
		}
		if (pred_team_six == 1) {
			message += team_six + ' will hit exactly' + pred_team_six + ' six !!';
		} else {
			message += team_six + ' will hit ' + pred_team_six + ' sixes !!';
		}
		
		postToFeed(perma_url, title, caption, message);
		return false;
	});
	
	
	// If there is schedule in the sidebar, scroll to keep the open match at the center
	var container = $('div.schedule-content');
	if (container.find('.user-pred-attention').text() != '') {
		// do nothing when there is no match schedule list in the sidebar
	} else {
		var scrollTo = $('div.match-link-open:first');
		container.scrollTop(
		    scrollTo.offset().top - container.offset().top + container.scrollTop() - 140
		);		
	}

	
	
	// Show/Hide the rules when hovering on the rules link
	$("#rules-link").mouseenter(function() {
		var p = $(this).position();
		$("#rules-content").css('left',p.left).css('top',p.top+20).slideDown(); 
	});
	$("#rules-content").mouseenter(function() { 
		$("#rules-content").css('display','block'); 
	});
	$("#rules-content").mouseleave(function() { $("#rules-content").slideUp(); });
	
	// Show the match area on clicking a match's link
	$('.match-link').click(function(){
		id = $(this).attr('id');
		$('.match-main.active').hide().removeClass('active');
		$('#'+id+'_main').slideDown('slow',function(){
			$(this).addClass('active');
		});			
	});
	
	
	// Submit predictions via AJAX and show the status
	$('body.auth-user .match-main form').submit(function(){
		$('.match-main-open.active form input.submit').attr('disabled',true).attr('value','Updating...');
		$.ajax({
			type: 'POST',
			url: 'pred/put',
			data: $(this).serialize(),
			dataType: 'json',
			success: function(response){
				if (response.status == 'SUCCESS') {
					$('.match-main-open.active form input.submit').attr('disabled',false).attr('value','Update Your Predictions');
					$('.match-main-open.active form input[name=pred_key]').attr('value', response.pred_key);
					show_action_message('Done! You can now share your predictions with friends.');
					$('.match-main-open.active .make-match-pred-msg').slideUp('slow', function(){
						$('.match-main-open.active .share-match-pred-msg').slideDown('slow');
					});
				}
				else {
					$('.match-main-open.active form input.submit').attr('disabled',false).attr('value','Save Your Predictions');
					show_action_message('Sorry. Your predictions could not be saved. Try again please.');				
				}
			},
			error: function(jqXHR,error, errorThrown) {  
				$('.match-main-open.active form input.submit').attr('disabled',false).attr('value','Save Your Predictions');
				show_action_message('Sorry. Your predictions could not be saved. Try again please.');
	        },
		});
		return false;
	});
});