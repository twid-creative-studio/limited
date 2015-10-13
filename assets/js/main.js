
$(window).on('load', function () {

	//Preloader
	var $preloader = $('#page-preloader'),
		$spinner   = $preloader.find('.spinner');
	$spinner.fadeOut();
	$preloader.delay(350).fadeOut('slow');

	// Scroll
	$("").mCustomScrollbar({
		axis: "x"
	});

	//textarea
	$('textarea').autosize();
	
});

$(document).ready(function(){
	
});

$(document).on('click','.menu-button', function(){

});


//Dropdown
$(document).on('click','.cuslom_dropdown', function(){
    $(this).toggleClass('active');
    $(this).find('ul').toggleClass('active'); 
});
$(".cuslom_dropdown li a").click(function(){
    $(this).parents('.cuslom_dropdown').find('ul > li:first-child > a').text($(this).text()); 
    $(this).parents('.cuslom_dropdown').find('ul > li:first-child > a').attr('class',$(this).attr('class')); 

});

//Placeholder
var oldPlaceholder = "";

$(document).on("focusin", "input,textarea", function(){
    oldPlaceholder = $(this).attr('placeholder');
    $(this).attr('placeholder',""); 
});

$(document).on("focusout", "input,textarea", function(){
    $(this).attr('placeholder',oldPlaceholder); 
});

//Trigers +/-
$('.min').on('click', function() {
	var rating = parseInt($(this).prev('.number').text())-1;

	if(rating < 0){
		$(this).parent().removeClass('negative positive');
		$(this).parent().addClass('negative');
		$(this).prev('.number').text(rating);

	}else if(rating > 0){
		$(this).parent().removeClass('negative positive');
		$(this).parent().addClass('positive');
		rating="+" + rating;
		$(this).prev('.number').text(rating);
	}
	else if(rating === 0){
		$(this).parent().removeClass('negative positive');
		$(this).prev('.number').text(rating);
		$(this).parent().addClass('rating');
	}
	return false;
});
$('.plus').on('click', function() {
	var rating = parseInt($(this).next('.number').text())+1;

	if(rating < 0){
		$(this).parent().removeClass('negative positive');
		$(this).parent().addClass('negative');
		$(this).prev('.number').text(rating);

	}else if(rating > 0){
		$(this).parent().removeClass('negative positive');
		$(this).parent().addClass('positive');
		rating="+" + rating;
		$(this).prev('.number').text(rating);
	}
	else if(rating === 0){
		$(this).parent().removeClass('negative positive');
		$(this).parent().addClass('rating');
		$(this).prev('.number').text(rating);
	}
	$(this).next('.number').text(rating);
	return false;
});

$(document).on('scroll',function() {

});

$('.filter .title').click(function(){
	
});



//EVENTS -- {


	//Menu-button_burger
	(function() {

	  "use strict";

	  var toggles = document.querySelectorAll("header .left .c-hamburger, header .left p");

	  for (var i = toggles.length - 1; i >= 0; i--) {
	    var toggle = toggles[i];
	    toggleHandler(toggle);
	  };

	  function toggleHandler(toggle) {
	    toggle.addEventListener( "click", function(e) {
	      e.preventDefault();
	      (this.classList.contains("is-active") === true) ? this.classList.remove("is-active") : this.classList.add("is-active");
	      $('.background-mask').fadeIn(200).toggleClass('active');
	      $('.main-menu').toggleClass('active');
	    });
	  }

	})();


	$(document).on('click', '.close_win', function(){
		$('.background-mask').fadeOut(200).toggleClass('active');
		$(this).parents('.popup').toggleClass('active');
	});

	var toggles_mask = document.querySelectorAll(".background-mask");

	for (var i = toggles_mask.length - 1; i >= 0; i--) {
    	var toggle = toggles_mask[i];
    	toggleHandler(toggle);
  	};

  	function toggleHandler(toggle) {
    	toggle.addEventListener( "click", function(e) {
      	e.preventDefault();
			$('.background-mask').fadeOut(200).toggleClass('active');
      		$('.main-menu').toggleClass('active');
    	});
  	}

//} -- EVENTS