var ssBackToTop = function() {

    var pxShow  = 500,         // height on which the button will show
    fadeInTime  = 400,         // how slow/fast you want the button to show
    fadeOutTime = 400,         // how slow/fast you want the button to hide
    scrollSpeed = 300,         // how slow/fast you want the button to scroll to top. can be a value, 'slow', 'normal' or 'fast'
    goTopButton = document.getElementById('go-top')

    // Show or hide the sticky footer button
    window.addEventListener('scroll', function() {
        if( !goTopButton ) return false;
        //implement the fadeIn/fadeOut
        ( document.body.scrollTop > pxShow ) ? goTopButton.fadeIn(fadeInTime) : goTopButton.fadeOut(fadeOutTime);
        // if ($(win.scrollTop() >= pxShow) {
        //     goTopButton.fadeIn(fadeInTime);
        // } else {
        //     goTopButton.fadeOut(fadeOutTime);
        // }
    });
};	
