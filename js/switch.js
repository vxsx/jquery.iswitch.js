(function($){
	//TODO: make it work with a customizable css, so all dimensions -> to variables -- done
	//		make all variables into one object and pass this object to a functions instead of passing too many variables
	//		disabled state
    $.fn.switch = function(options) {
        var settings = $.extend({
           //
        }, options);
		
		this.each(function(){
			
				var s = $(this).css('display', 'none').wrap('<div class="super-switch-wrap"></div>').after(
					    '<span class="knob"></span>'+
					    '<div class="label-wrap">'+
					        '<span class="label true">'+$(this).data('true')+'</span>'+
					        '<span class="label false">'+$(this).data('false')+'</span>'+
					    '</div>'
					),
					w = s.parent(),
					t =  $('.true', w),
					f =  $('.false', w),
					l = $('.label-wrap', w),
					knob = $('.knob', w);

					if ( t.text().length > f.text().length ) {
						var offset = t.width() + ( parseInt(t.css('padding-left'))+(parseInt(t.css('padding-right'))-(knob.width()/2)) );
						f.width( t.width() );
					} else {
						var offset =  f.width() + ( parseInt(f.css('padding-right'))+(parseInt(f.css('padding-left'))-(knob.width()/2)) );
						t.width( f.width() );			
					}
					var width = offset + knob.width();
					w.css({
						'width': width
					})

					knob.css({
						'left': offset
					})
					s.attr('checked') ? toRight(knob, l, offset, s, 1) : toLeft(knob, l, offset, s, 1);



				    knob.draggable({
				        containment: 'parent',
				        axis: 'x',
				        drag: function(event, ui) {
							$('.super-switch-wrap .label-wrap').css({'left': - offset + ui.position.left + 'px'});
						},
						stop: function(event, ui) {
							if ( ui.position.left > ( (width)/2 - knob.width()/2 ) ) {
								knob.animate({'left': offset }, 200);
								l.animate({'left': 0}, 200, function() {
									setState(true, s);
								});
								
							} else {
								knob.animate({'left': 0 }, 200);	
								l.animate({'left': -offset}, 200, function() {
									setState(false, s);									
								});

							}
						}
				    })

					knob.click(function(){
						if ( parseInt($(this).css('left')) > 0 ) {
							toLeft(knob, l, offset, s, 0);
						} else {
							toRight(knob, l, offset, s, 0);
						}
					})

					



				
			
		});
        
        // Chain:
        return this;
        
    };

		function toRight(knob,l, offset, s, first) {
			if ( first ) {
				knob.css({	'left': offset	});
				l.css({'left': 0});
				setState(true, s);
			} else {
				knob.animate({	'left': offset	});
				l.animate({'left': 0}, function() {
					setState(true, s);
				});
			}

		}

		function toLeft(knob,l, offset, s, first) {
			if ( first ) {
				knob.css({	'left': 0	});
				l.css({'left': -offset });
				setState(false, s);
			} else {
				knob.animate({	'left': 0	});
				l.animate({'left': -offset }, function() {
					setState(false, s);
				});
			}

			
		}
		function setState(state, s) {
			if (state) {
				s.attr('checked','checked');
			} else {
				s.removeAttr('checked');
			}
			
			s.trigger('change');
		}
	
})(jQuery);

$(function() {
  $('input.js-switch').switch();
})
