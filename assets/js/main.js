var isOpera = !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
var isFirefox = typeof InstallTrigger !== 'undefined';   // Firefox 1.0+

var doc_scroll = 0,
	catalog_box = 0;

$(window).on('load', function () {

	if(isFirefox){
		$('.main-menu .menu a').addClass('fox');
		$('.main-menu .social a').addClass('fox');
		$('footer a').addClass('fox');
	} else{
		$('.main-menu .menu a').addClass('other');
		$('.main-menu .social a').addClass('other');
		$('footer a').addClass('other');
	}

	//Preloader
	var $preloader = $('#page-preloader'),
		$spinner   = $preloader.find('.spinner');
	$spinner.fadeOut();
	$preloader.delay(350).fadeOut('slow');

	// Scroll
	$(".main-filter .filter-list.brands ul").mCustomScrollbar({
		axis: "y"
	});

	//textarea
	$('textarea').autosize();

	catalog_box = $('#catalog').offset().top;
	
});

$(document).ready(function(){
	$('a.anchor').on('click',function (e) {

		var offsetTop = 57;
	    e.preventDefault();

	    var target = this.hash;
	    var $target = $(target);

		$('html, body').stop().animate({
	        'scrollTop': $target.offset().top - offsetTop
	    }, 900, 'swing', function () {
	        window.location.hash = target;
	    });
	});
});



//Disable scroll
$('body').on({
    'mousewheel': function(e) {
        if ($('body').hasClass('popup_open')){
			e.preventDefault();
	        e.stopPropagation();
        } 
    }
});


$(document).on('scroll',function(e) {

	//Контроль видимости кнопки фильтров
	doc_scroll = $(this).scrollTop();
	console.log(doc_scroll + $(window).height() - 57, catalog_box + $('#catalog').outerHeight());

	if(doc_scroll >= catalog_box - $(window).height()/2){
		if(doc_scroll + $(window).height() - 57 >= catalog_box + $('#catalog').outerHeight() - 57){
			$('.btn-filters-block').stop(true).fadeOut();
		} else{
			$('.btn-filters-block').stop(true, true).fadeIn();
		}
	} else if(doc_scroll <= catalog_box){
		$('.btn-filters-block').stop(true, true).fadeOut();
	}

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
$('.count .min').on('click', function() {

	var rating = parseInt($(this).next('.number').text())-1;

	if(rating < 0){
		$(this).next('.number').text(0);
	} else{
		$(this).next('.number').text(rating);
	}
	
	return false;
});

$('.count .plus').on('click', function() {

	var rating = parseInt($(this).prev('.count .number').text())+1;

	$(this).prev('.count .number').text(rating);

	return false;
});

//EVENTS -- {

	//Menu-button_burger
	(function() {

	  "use strict";

	  var toggles = document.querySelectorAll(".c-hamburger");

	  for (var i = toggles.length - 1; i >= 0; i--) {
	    var toggle = toggles[i];
	    toggleHandler(toggle);
	  }

	  function toggleHandler(toggle) {
	    toggle.addEventListener( "click", function(e) {
	      e.preventDefault();
	      if(this.classList.contains("is-active") === true && $('body').hasClass('popup_open')) {
	      		this.classList.remove("is-active");
	      		close_popup($('#main-menu'));
	      }  else {
	      		open_popup($('#main-menu'));
	      		this.classList.add("is-active");
	      } 
	      
	    });
	  }

	})();

	//Click для слова "МЕНЮ" возле бургера
	$(document).on('click', 'header .left p', function(){
		$('.c-hamburger').click();
	});

	//{ - закрытие popup по нажатию на маску
		var toggles_mask = $(".background-mask");

		for (var i = toggles_mask.length - 1; i >= 0; i--) {
	    	var toggle = toggles_mask[i];
	    	toggleHandler(toggle);
	  	}

	  	function toggleHandler(toggle) {
	    	toggle.addEventListener( "click", function(e) {
	      	e.preventDefault();
				close_popup($(this).parents('.popup').find('.popup-inner'));
	    	});
	  	}
	//} - закрытие popup по нажатию на маску

  	//Hover для товара(очков)
  	var oldRSC = "";
  	$('.catalog .items').hover(function(){
  		oldRSC = $(this).find('img').attr('src');
  		$(this).find('img').attr('src', $(this).find('img').attr('data-hover'));
  	}, function(){
  		$(this).find('img').attr('src', oldRSC);
  	});

  	//Click для развертки СЕО-текста
  	$(document).on('click', '.seo-text .read-more', function(){
  		$(this).parent().toggleClass('active');
  		$(this).toggleClass('active');
  	});

  	//Click для фильтров
  	$(document).on('click', '.btn-filters-block .btn-filter', function(){
  		open_popup($('#main-filter'));
  	});


  	//Click для выбора фильтра
  	$(document).on('click', '.main-filter .filter-list ul li', function(){
  		$(this).toggleClass('active');
  	});

  	//Закрыть окно фильтров
  	$(document).on('click', '.control-panel .btn-close', function(){
  		close_popup($(this).parents('.popup').find('.popup-inner'));
  	});
  	//Применить фильтр
  	$(document).on('click', '.control-panel .btn-apply', function(){
  		//Применение фильтров
  		alert('Фильтры пременены');
  		close_popup($(this).parents('.popup').find('.popup-inner'));
  	});
  	//Очистить все фильтры
  	$(document).on('click', '.control-panel .btn-clear', function(){
  		$('.main-filter .filter-list ul li').removeClass('active');
  	});

  	//Кнопка открывающая корзину
  	$(document).on('click', 'header .btn-cart', function(){
  		recalculation_cart();
  		open_popup($('#cart'));
  	});

  	//Кнопка закрывающая корзину
  	$(document).on('click', '.cart .close_cart span', function(){
  		close_popup($('#cart'));
  	});

  	//Кнопка открытия checkout-a
  	$(document).on('click', '.cart .btn-checkout', function(){
  		open_popup($('#checkout'));
  	});

  	//Кнопка закрытия checkout-a
  	$(document).on('click', '.close_checkout span', function(){
  		close_popup($('#checkout'));
  	});

  	//Кнопка открытия/закрытия текстового плока внутри инпута
  	$(document).on('click', '#checkout .question', function(){

  		if($(this).parent().find('.question-block').hasClass('active')){
  			$('#checkout .question-block').removeClass('active');
  		} else{
  			$('#checkout .question-block').removeClass('active');
  			$(this).parent().find('.question-block').toggleClass('active');
  		}
  		
  	});

  	//Кнопка отправки заказа
  	$(document).on('click', '.btn-submit', function(){
  		open_popup($('#successful_order'));
  		setTimeout(function(){
			close_popup($('#checkout'));
  			close_popup($('#cart'));
  		},200);
  		
  	});
  	
  	//Кнопка закрывающая корзину successful_order
  	$(document).on('click', '.close_successful_order', function(){
  		close_popup($('#successful_order'));
  	});
  	
  	
//} -- EVENTS


function open_popup(obj){

	if(obj.attr('id') === "checkout"){
		$('#cart').find('.close_cart').addClass('active');
		obj.parents('.popup').show();
		obj.parents('.popup').addClass('active');
		obj.show().delay(10).addClass('active');
		$('#cart').find('.btn-checkout').hide();
		

		obj.parents('.popup').find('.background-mask').show().addClass('active');
		$('#cart').parents('.popup').find('.background-mask').hide().removeClass('active');
		$('#cart').addClass('active_checkout');

		return false;
	} else{
		if(obj.attr('id') === "successful_order"){
			$('.c-hamburger').addClass('open');
		}
		obj.parents('.popup').fadeIn(200, function(){
			obj.parents('.popup').addClass('active');
		});
		obj.show().delay(10).addClass('active');
		obj.parents('.popup').find('.background-mask').fadeIn(200).addClass('active');
		$('body').addClass('popup_open');
		DisableScrollbar();
	}

}
function close_popup(obj){
	if($(obj).attr('id') === "main-menu"){
		setTimeout(function(){
			obj.parents('.popup').removeClass('active');
			obj.parents('.popup').fadeOut(200);
			obj.parents('.popup').find('.background-mask').fadeOut(200).removeClass('active');

		},300);

	} else if(obj.attr('id') === "checkout"){
		
	} else{
		obj.parents('.popup').fadeOut(200, function(){
			obj.parents('.popup').removeClass('active');
		});

		obj.parents('.popup').find('.background-mask').fadeOut(200).removeClass('active');
	}
	
	obj.removeClass('active');

	$(".c-hamburger").removeClass("is-active");

	if(obj.attr('id') === "checkout"){

		setTimeout(function(){
			obj.parents('.popup').find('.background-mask').hide().removeClass('active');
			obj.parents('.popup').hide();
			$('#cart').find('.close_cart').removeClass('active');
			$('#cart').find('.btn-checkout').show();

		},300);
		obj.parents('.popup').removeClass('active');
		

		obj.parents('.popup').removeClass('active');
		setTimeout(function(){ $('#cart').parents('.popup').find('.background-mask').show().addClass('active'); }, 300);
		
		$('#cart').removeClass('active_checkout');
		return false;
	} else{
		EnableScrollbar();
		$('body').removeClass('popup_open');
	}
	if(obj.attr('id') === "successful_order"){
		$('.c-hamburger').removeClass('open');
	}
}

//Перерасчет эелементов в корзине для устрановки/удаление скролла
function recalculation_cart(){
	$('#cart .list-items').outerHeight($(window).height() - 57 - 142 - 10);
	setTimeout(function(){
		$("#cart .list-items").mCustomScrollbar({
			axis: "y"
		});
	}, 100);
}