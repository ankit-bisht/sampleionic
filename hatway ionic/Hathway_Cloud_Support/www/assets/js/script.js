$(document).ready(function(){
	$(function() {

	$( "a" ).click(function( event ) {
		event.stopPropagation();
		event.preventDefault();
	});

	$( "body" ).click(function(event){
		if( $(".nav-menu").hasClass("nav-active-menu-container") && $(".nav-link-container").hasClass("nav-inactive-menu-link-container") )
		{
			$(".nav-menu").toggleClass("nav-active-menu-container");
			$(".nav-container").toggleClass("open_left_menu");
			$(".bg_menu").toggleClass("inactive-body");
		}
	});

	$(".nav-close-menu-li > a").click(function(event){
		$(".nav-menu").toggleClass("nav-active-menu-container");
		$(".nav-container").toggleClass("open_left_menu");
		$(".bg_menu").toggleClass("inactive-body");
	});

	$(".nav-menu").on('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend',function(e) {
    	if(! $(".nav-menu").hasClass("nav-active-menu-container") )
    		$(".nav-link-container").toggleClass("nav-inactive-menu-link-container");
    	else
    		$(".bg_menu").toggleClass("inactive-body");
	});

	$( ".nav-link-container > a" ).click(function(event){
		$(".nav-container").toggleClass("open_left_menu");
		$(".nav-link-container").toggleClass("nav-inactive-menu-link-container");
		$(".nav-menu").toggleClass("nav-active-menu-container");
	});

	

});
});

$(document).ready(function(){
	$(".user_login >a").click(function(){
		$(".sub_menu").toggle();
	});
});
