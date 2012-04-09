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
$(document).ready(function(){
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
	
//	$('body.anon-user .match-main form').submit(function(){
//		alert("Please login to submit your info. (TODO: Take to the login popup and auto submit)");
//		return false;
//	});
	
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