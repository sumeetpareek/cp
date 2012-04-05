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

$(document).ready(function(){
	// if dummy user is logged in show hello msg and logout link
	if(user = $.cookie('loggedinuser')) {
		$('#msg').show();
		$('#user-loggedin').html(user);
		$('#user').hide();
	}
	else {
		$('#user').show();
		$('#msg').hide();
	}
	
	// allow dummy user login
	$('#user').change(function(){
		$.cookie('loggedinuser', $(this).val());
		window.location.reload();
	});
	
	// allow dummy user logout
	$('#logout').click(function(){
		$.cookie('loggedinuser', null);
		window.location.reload();
	});
	
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
	$('body.auth-user .match-main form').submit(function(){
		$.ajax({
			type: 'POST',
			url: 'pred/put',
			data: $(this).serialize(),
			success: function(response){
				alert('SUCCESS --- '+response)
			},
			error: function(jqXHR,error, errorThrown) {  
				alert(jqXHR.responseText); 
	        },
		});
		return false;
	});
});