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
});