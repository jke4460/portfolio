$(document).ready(function () {
    var $win = $(window);
    var winHei = $win.height();
    function fadeIn () {
        var tgHei;
        var tgTop;
        var start;
        var end;

        $win.on('scroll', function () {
            var $fade=$('.fade');
            var scrollT = $(this).scrollTop();
            var headHei = 70;
            //console.log(scrollT);

            $fade.each(function () {
                tgHei = $(this).outerHeight();
                tgTop = $(this).offset().top;
                
                start = tgTop+tgHei*0.5-winHei;
                end = tgTop+tgHei *0.5 -headHei;

                if (start < scrollT && end > scrollT) $(this).addClass('on');
                else $(this).removeClass('on');
            });
        });
    }
    fadeIn ();
    var $icon = $('#sub #content .icon li');
    $icon.on({
        mouseenter:function (){
            $(this).addClass('on');
        },
        mouseleave:function(){
            $(this).removeClass('on');
        }
    });
   
});