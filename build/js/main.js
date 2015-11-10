var isOpera = !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
var isFirefox = typeof InstallTrigger !== 'undefined';   // Firefox 1.0+



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

	$(".checkout form").mCustomScrollbar({
		axis: "y",
		scrollbarPosition: "outside"
	});


	//textarea
	$('textarea').autosize();


	
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
			//e.preventDefault();
	        //e.stopPropagation();
        } 
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
  	var oldRSC = "",
  		sizeIMG = 0;
  	$('.catalog .items, .item_page .items').hover(function(){
  		sizeIMG = $(this).find('img').outerHeight();
  		oldRSC = $(this).find('img').attr('src');
  		$(this).find('img').attr('src', $(this).find('img').attr('data-hover'));
  		$(this).find('img').outerHeight(sizeIMG);
  	}, function(){
  		$(this).find('img').attr('src', oldRSC);
  	});

  	//Click для развертки СЕО-текста
  	$(document).on('click', '.seo-text .read-more', function(){
  		$(this).parent().toggleClass('active');
  		$(this).toggleClass('active');
  	});

  	//Click для развертки Описания товара в карточке товара
  	$(document).on('click', '.item_page .description .read-more', function(){
  		$(this).parent().find('.text').toggleClass('active');
  		$(this).toggleClass('active');
  	});


  	//Click для фильтров
  	$(document).on('click', '.btn-filters-block .btn-filter', function(){
  		open_popup($('#main-filter'));
  		$('#main-filter').parent().find('.background-mask').css('background', 'rgba(21, 21, 21, 0.9)');
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
  	});
  	
  	//Кнопка закрывающая корзину successful_order
  	$(document).on('click', '.close_successful_order', function(){
  		setTimeout( function () { close_popup($('#successful_order')); }, 300);
  		close_popup($('#checkout'));
		close_popup($('#cart'));
  	});


  	//Click для открытия деталей скидки
  	$(document).on('click', '.sale_page .sale-list .item', function(){
  		open_popup('#' + $(this).attr('data-details'));
  	});

  	//Закрыть окно деталей скидки
  	$(document).on('click', '.header-popup .close', function(){
  		close_popup($(this).parents('.popup').find('.popup-inner'));
  	});


  	//Развернуть список фильтров в окне фильтров
  	$(document).on('click', '.main-filter .filter-list .title', function(){

			if($(this).parents('.filter-list').hasClass('active')){
				$(this).parents('.filter-list').removeClass('active');
				$('.main-filter').removeClass('open');

			} else{
				$('.main-filter .filter-list').removeClass('active');
				$(this).parents('.filter-list').addClass('active');
				$('.main-filter').addClass('open');

			}
 
  	});
  	
//} -- EVENTS


function open_popup(obj){

	if($(obj).attr('id') === "checkout"){
		$('#cart').find('.close_cart').addClass('active');
		$(obj).parents('.popup').show();
		$(obj).parents('.popup').addClass('active');
		$(obj).show().delay(10).addClass('active');
		$('#cart').find('.btn-checkout').hide();
		

		$(obj).parents('.popup').find('.background-mask').show().addClass('active');
		$('#cart').parents('.popup').find('.background-mask').hide().removeClass('active');
		$('#cart').addClass('active_checkout');

		return false;
	} else if($(obj).hasClass("details-sale")){
		$(obj).parents('.popup').fadeIn(200, function(){
			$(obj).parents('.popup').addClass('active');
		});
		$(obj).show().delay(10).addClass('active');
		$(obj).parents('.popup').find('.background-mask').fadeIn(200).addClass('active');
		$('body').addClass('popup_open');
		DisableScrollbar();


		setTimeout(function(){
	        if($(obj).outerHeight() >= $(window).height() - 100){
	        	$(obj).outerHeight($(window).height() - 100);
			    $(obj).mCustomScrollbar({
					axis: "y"
				});
	        }
		}, 1);
		
	} else{
		if($(obj).attr('id') === "successful_order"){
			DisableScrollbar();
			$('.c-hamburger').addClass('open');
		}
		$(obj).parents('.popup').fadeIn(200, function(){
			$(obj).parents('.popup').addClass('active');
		});
		$(obj).show().delay(10).addClass('active');
		$(obj).parents('.popup').find('.background-mask').fadeIn(200).addClass('active');
		$('body').addClass('popup_open');
		DisableScrollbar();
	}

}
function close_popup(obj){
	if($(obj).attr('id') === "main-menu"){
		setTimeout(function(){
			$(obj).parents('.popup').removeClass('active');
			$(obj).parents('.popup').fadeOut(200);
			$(obj).parents('.popup').find('.background-mask').fadeOut(200).removeClass('active');

		},300);

	} else if($(obj).attr('id') === "checkout"){
		
	} else{
		$(obj).parents('.popup').fadeOut(200, function(){
			$(obj).parents('.popup').removeClass('active');
		});

		$(obj).parents('.popup').find('.background-mask').fadeOut(200).removeClass('active');
	}
	
	$(obj).removeClass('active');

	$(".c-hamburger").removeClass("is-active");

	if($(obj).attr('id') === "checkout"){

		setTimeout(function(){
			$(obj).parents('.popup').find('.background-mask').hide().removeClass('active');
			$(obj).parents('.popup').hide();
			$('#cart').find('.close_cart').removeClass('active');
			$('#cart').find('.btn-checkout').show();

		},300);
		$(obj).parents('.popup').removeClass('active');
		

		$(obj).parents('.popup').removeClass('active');
		setTimeout(function(){ $('#cart').parents('.popup').find('.background-mask').show().addClass('active'); }, 300);
		
		$('#cart').removeClass('active_checkout');
		return false;
	} else{
		EnableScrollbar();
		$('body').removeClass('popup_open');
	}
	if($(obj).attr('id') === "successful_order"){
		$('.c-hamburger').removeClass('open');
	}
}

//Перерасчет эелементов в корзине для устрановки/удаление скролла
function recalculation_cart(){
	if($(window).width() <= 640){
		$('#cart .list-items').outerHeight($(window).height() - 57 - 85 - 10);
	} else{
		$('#cart .list-items').outerHeight($(window).height() - 57 - 142 - 10);
	}
	setTimeout(function(){
		$("#cart .list-items").mCustomScrollbar({
			axis: "y"
		});
	}, 100);
}