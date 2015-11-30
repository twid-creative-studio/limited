function DisableScrollbar()
{

    var old_width = $(document).width();
    var new_width = old_width;

    // ID's \ class to change
    var items_to_change = "body";


    $('body').css('overflow','hidden');
    

    // get new width
    new_width = $(document).width()

    // update width of items to their old one(one with the scrollbar visible)
    $(items_to_change).width(old_width);

    // make the placeholder the same width the scrollbar was
    $("#scrollPlaceHolder").show().width(new_width-old_width);
    $('.btn-filters-block').css('right', new_width-old_width);
    $('.btn-scrolldown').css('margin-left', - (95 + (new_width-old_width)/2));


    // and float the items to the other side.
    $(items_to_change).css("float", "left");

    

}

function EnableScrollbar()
{
    // exit if page can't scroll
    if ($(window).height() ==  $('body').outerHeight()) return;   

    // remove the placeholder, then bring back the scrollbar
    $("#scrollPlaceHolder").fadeOut(function(){          
        $('body').css('overflow','auto');
        $('body').width('100%');
        $('.btn-filters-block').css('right', 0);
        $('.btn-scrolldown').css('margin-left', -95 );
    });

}