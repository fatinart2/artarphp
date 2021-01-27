// Globals
var prefixes         = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
var $container       = $('.container');
var $timeline        = $('.timeline');
var $timelineItem    = $('.timeline-item');
var $timelineContent = $('.timeline-content');
var $dropdo        = $('.dropdo');
var $hasHovered      = true;
var hideOnExit       = false;

// mouseenter event handler
$timelineItem.on('mouseenter', function(e) {
  
  var isSelected = $(this).hasClass('selected');
  
  if ( isSelected === false ) {
  
    var leftPos = $(this).position().left,
        left    = leftPos - 88,
        $that   = $(this);

    $timelineItem.removeClass('selected');
    $(this).addClass('selected');

    if ( $hasHovered === false ) {
      // Show Bounce

        // Set Flag
        $hasHovered = true;

        // Show DD Bounce
        showBounce(left);

        // Show DD content Bounce
        showContentBounce($that);

    } else {
      // Follow

        // Change pos of DD to follow
        dropdoFollow(left);

        // Hide previous dd content
        $timelineContent.removeClass('animated fadeIn bounceIn');

        // Show hovered dd content
        $that.find($timelineContent).addClass('animated fadeIn');
    }
  }
  
});

// mouseleave event handler
$timeline.on('mouseleave', function(e) {
  
  if (hideOnExit) {
   
    //   Set Flag
    $hasHovered = false;

    // Hide DD
    hidedropdo();

    // Hide DD content
    $timelineContent.removeClass('animated fadeIn');
    
  }
  
});

// Animation end event listener
$dropdo.on(prefixes, function(e) {
  
  if ( e.originalEvent.animationName === 'fadeOut' ) {
    $dropdo.removeAttr('style');
  }
  
});

/**
* Private functions that do showing/hiding/animating
*/
function showContentBounce(that) {
  $hasBounced = true;
  that.find('.timeline-content').addClass('animated bounceIn');
}

function showBounce(pos) {
  $dropdo.css('left', pos + 'px').removeClass('fadeOut').addClass('animated bounceIn');
}

function dropdoFollow(pos) {
  $dropdo.css('left', pos + 'px');
}

function hidedropdo() {
  $timelineItem.removeClass('selected');
  $dropdo.removeClass('bounceIn').addClass('fadeOut');
}