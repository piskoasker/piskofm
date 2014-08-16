// ==UserScript==
// @name        link asks
// @namespace   http://localhost
// @include     http://ask.fm/lonefire
// @version     1
// @grant       none
// ==/UserScript==


var elemDiv = document.createElement('div');
elemDiv.id = "quick";
elemDiv.style.cssText = 'position:absolute;opacity:1;z-index:0;background:#FFF;display:none;border: 2px solid;';
document.body.appendChild(elemDiv);

var mouseX;
var mouseY;
$(document).mousemove( function(e) {
   mouseX = e.pageX; 
   mouseY = e.pageY;
}); 

function process(){
    var x = document.getElementsByTagName("span");
    var regexp = /^@\b\d{12}/;

    var pathArray = window.location.pathname.split( '/' );

    for (var i = 0; i < x.length; i++) {

        var str = x[i].innerHTML;
        var test = str.split(' ');

        for(var j = 0; j < test.length; j++)
        {
            if(regexp.test(test[j]))
            {
                test[j] = "<a class='link-blue hover-link' href='http://ask.fm/" + pathArray[1] + "/answer/" + test[j].substr(1) + "'>" + test[j] + "</a>";

            }
        }

        x[i].innerHTML = test.join(' ');
    }


    var reply = $("<a></a>").text(" reply").attr({
        "class": "replyto link-blue"

    });


    $('.time').filter(function(){
        return $(this).children().length === 1;
    }).append(reply);

    $(".replyto").unbind("click").click(function(){
        var link = $(this).prev().attr("href");

        $("#profile-input").val($("#profile-input").val() + "@" + link.split('/')[3] + " ");
        
    });

    // $('.hover-link').stop().hover(
    //      function() { 
    //         $('#quick').css({'top':mouseY+10,'left':mouseX});

    //         //change this to wait a small amount of time and then load just the question box
    //         $("#quick").stop(true, true).load("" + $(this).attr("href") + " .questionBox", function(){$("#quick").fadeIn(50)});
    //       }, 
    //      function() {  
    //         $('#quick').stop().fadeOut(50, function(){ $(this).empty()}); 
    //         //$('#quick').empty();
    // });

    $('.hover-link').mouseenter(function() { 
            var position = $(this).position();
            $('#quick').css({'top':mouseY+ 10,'left':mouseX});

            //change this to wait a small amount of time and then load just the question box
            $("#quick").load("" + $(this).attr("href") + " .questionBox").stop(true, true).fadeIn(50);
    });
    $('.hover-link').mouseleave(function() { 
       $('#quick').stop(true,true).fadeOut(50, function(){ $(this).empty()}); 

    });
}


process();

$( document ).ajaxComplete(function(event,xhr,settings){
    if(settings.url === "/lonefire/more")
    {
        process();
    }
});




