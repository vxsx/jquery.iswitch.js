/** 
*  @author Vadim Sikora ( http://vxsx.ru )
*  NO COPYRIGHTS, DO WHAT YOU WANT
*  @requires jquery 1.4.4 or higher
*  			 jquery ui 1.8.9 or higher
*/

(function($){
	//TODO:	make all variables into one object and pass this object to a functions instead of passing too many variables
	//		tweak animation with outside labels
	//		disabled state
    $.fn.iswitch = function(options) {
        var settings = $.extend({
           	labelsOutside: false,
			clickable: true,
			draggable: true
        }, options);
		
		this.each(function(){
			
				var s = $(this).css('display', 'none').wrap('<div class="super-switch-wrap'+(settings.labelsOutside ? ' outside':'')+'"></div>').after(
					    '<span class="knob"></span>'+
					    '<div class="label-wrap">'+
					        '<span class="label true">'+ ( (settings.labelsOutside) ? ' ' : $(this).data('true') )+'</span>'+
					        '<span class="label false">'+ ( (settings.labelsOutside) ? ' ' : $(this).data('false') )+'</span>'+
					    '</div>'
					),
					w = s.parent(),
					t =  $('.true', w),
					f =  $('.false', w),
					l = $('.label-wrap', w),
					knob = $('.knob', w);

					if ( settings.labelsOutside ) {
						w.before('<label class="switch-label-false">'+s.data('false')+'</label> ').after(' <label class="switch-label-true">'+s.data('true')+'</label>');
						var lf = w.prev(),
							lt = w.next();
					
					}

					if ( t.text().length > f.text().length ) {
						var offset = t.width() + ( parseInt(t.css('padding-left'))+(parseInt(t.css('padding-right'))-(knob.width()/2)) );
						f.width( t.width() );
					} else {
						var offset =  f.width() + ( parseInt(f.css('padding-right'))+(parseInt(f.css('padding-left'))-(knob.width()/2)) );
						t.width( f.width() );			
					}
					var width = offset + knob.width();
					w.css({
						'width': width,
						'background-size': (width*2 - knob.width()/2)  + 'px 20px'
					})

				//	knob.css({
				//		'left': offset
				//	})
					s.attr('checked') ? toRight(knob, l, offset, s, 1) : toLeft(knob, l, offset, s, 1);
					
				 	if ( settings.labelsOutside ) {
						s.attr('checked') ? lt.addClass('active') : lf.addClass('active');
					
						lf.click(function(){
							toLeft(knob, l, offset, s, 0);
							lt.removeClass('active');
							lf.addClass('active');
						});
					
						lt.click(function(){
							toRight(knob, l, offset, s, 0);
							lf.removeClass('active');
							lt.addClass('active');
						})
					}
				    settings.draggable && knob.draggable({
				        containment: 'parent',
				        axis: 'x',
				        drag: function(event, ui) {
							l.css({'left': - offset + ui.position.left + 'px'});
							w.css({'background-position':- offset + ui.position.left + 'px 0px' })
						},
						stop: function(event, ui) {
							if ( ui.position.left > ( (width)/2 - knob.width()/2 ) ) {
								knob.animate({'left': offset }, 200);
								l.animate({'left': 0}, 200, function() {
									setState(true, s);
									if ( settings.labelsOutside ) {
										lf.removeClass('active');
										lt.addClass('active');
									}
								});
								
							} else {
								knob.animate({'left': 0 }, 200);	
								l.animate({'left': -offset}, 200, function() {
									setState(false, s);									
									if ( settings.labelsOutside ) {
										lt.removeClass('active');
										lf.addClass('active');
									}
								});

							}
						}
				    })
					
					
					settings.clickable && knob.click(function(){
						if ( parseInt($(this).css('left')) > 0 ) {
							toLeft(knob, l, offset, s, 0);
							if ( settings.labelsOutside ) {
								lt.removeClass('active');
								lf.addClass('active');
							}
						} else {
							toRight(knob, l, offset, s, 0);
							if ( settings.labelsOutside ) {
								lf.removeClass('active');
								lt.addClass('active');
							}
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
  $('#inside .js-switch').iswitch();
  $('#outside .js-switch').iswitch({ labelsOutside: true });
  $('#non-clickable .js-switch').iswitch({ clickable: false });
  $('#non-draggable .js-switch').iswitch({ draggable: false });

})
