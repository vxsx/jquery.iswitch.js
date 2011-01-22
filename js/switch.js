$(function() {
    var s = $('.super-switch').css('display', 'none');

    $('.knot').draggable({
        containment: 'parent',
        axis: 'x',
        drag: function(event, ui) {
			$('.super-switch-wrap .label-wrap').css({'left': -40 + ui.position.left + 'px'});
		}
    })

})
