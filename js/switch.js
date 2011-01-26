$(function() {
    var s = $('.super-switch').css('display', 'none'),


		w = $('.super-switch-wrap'),
		$true =  $('.true', w),
		$false =  $('.false', w),
		knob = $('.knob', w);

		if ( $true.text().length > $false.text().length ) {
			var offset = $true.width() + 20;
			$false.width( $true.width() );
		} else {
			var offset =  $false.width() + 20;
			$true.width( $false.width() );			
		}
		
		w.css({
			'width': offset + 30
		})
		knob.css({
			'left': offset
		})
	
	
    knob.draggable({
        containment: 'parent',
        axis: 'x',
        drag: function(event, ui) {
			$('.super-switch-wrap .label-wrap').css({'left': - offset + ui.position.left + 'px'});
		},
		stop: function(event, ui) {
//			console.log(ui)
			if ( ui.position.left > ( (offset+30)/2 - 15 ) ) {
				knob.animate({'left': offset }, 200);
				$('.super-switch-wrap .label-wrap').animate({'left': 0}, 200);
			} else {
				knob.animate({'left': 0 }, 200);	
				$('.super-switch-wrap .label-wrap').animate({'left': -offset}, 200);
			}
		}
    })
	
	knob.click(function(){
		$(this).animate({'left': ( parseInt($(this).css('left')) > 0 ) ? 0 : offset  })
		$('.super-switch-wrap .label-wrap').animate({'left': ( parseInt($(this).css('left')) > 0 ) ?  - offset : 0 });
	})
	

})
