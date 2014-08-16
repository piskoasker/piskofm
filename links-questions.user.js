// ==UserScript==
// @name        links-questions
// @namespace   http://localhost
// @include     http://ask.fm/account/questions
// @include     http://ask.fm/*/questions/*/reply
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

function questionLinks(){
	var x = document.getElementsByTagName("span");
	var regexp = /^@\d{12}$/;

	var username = $('#main_menu_profile').attr("href");

	for (var i = 0; i < x.length; i++) {

		var str = x[i].innerHTML;
	    var test = str.split(' ');

	    for(var j = 0; j < test.length; j++)
	    {
	    	if(regexp.test(test[j]))
	    	{
	    		test[j] = "<a class='link-blue hover-link' href='http://ask.fm" + username + "/answer/" + test[j].substr(1) + "'>" + test[j] + "</a>";
	    	}
	    }

	    x[i].innerHTML = test.join(' ');
	}

	$('.hover-link').hover(
         function() { 
            $('#quick').css({'top':mouseY+10,'left':mouseX});

            //change this to wait a small amount of time and then load just the question box
            $("#quick").load("" + $(this).attr("href") + " .questionBox", function(){$("#quick").fadeIn(200)});
          }, 
         function() {  
            $('#quick').stop(true).fadeOut(200, function(){ $(this).empty()}); 
            //$('#quick').empty();
    });
}

questionLinks();

$( document ).ajaxComplete(function(event,xhr,settings){
    if(settings.url === "/account/questions/append")
    {
        questionLinks();
    }
});