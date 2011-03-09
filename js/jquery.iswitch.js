/**
*  @author Vadim Sikora ( http://vxsx.ru )
*  NO COPYRIGHTS, DO WHAT YOU WANT
*  @requires jquery 1.4.4 or higher
*  			 jquery ui 1.8.9 or higher
*/

(function($){
    $.fn.iswitch = function(options) {
        var settings = $.extend({
           	labelsOutside: false,
			clickable: true,
			draggable: true
        }, options);
		
		
		this.each(function(){
				if (!$(this).is(':checkbox')) 
					return;
			
				if (!($.ui && $.ui.draggable))
					settings.draggable = false; //if we don't have jquery ui - we cannot drag things like that
				
                var s = $(this).css('display', 'none').wrap('<div class="super-switch-wrap'+(settings.labelsOutside ? ' switch-labels-outside':'')+'"></div>').after(
					    '<span class="knob"></span>'+
					    '<div class="label-wrap">'+
					        '<span class="label true"></span>'+
					        '<span class="label false"></span>'+
					    '</div>'
					),
					labelTrue  = settings.trueLabel ? settings.trueLabel : s.data('true-label'),
					labelFalse = settings.falseLabel ? settings.falseLabel : s.data('false-label'),
					colorTrue  = settings.trueColor ? settings.trueColor : s.data('true-color'),
					colorFalse = settings.falseColor ? settings.falseColor : s.data('false-color'),
					w = s.parent(),
					t =  $('.true', w),
					f =  $('.false', w),
					l = $('.label-wrap', w),
					knob = $('.knob', w);

					if ( settings.labelsOutside ) {
						w.before('<label class="switch-label-false">'+labelFalse+'</label> ').after(' <label class="switch-label-true">'+labelTrue+'</label>');
						var lf = w.prev(),
							lt = w.next();
					} else {
						f.text(labelFalse);
						t.text(labelTrue);
					}

					if ( t.text().length > f.text().length ) {
						var offset = t.width() + ( parseInt(t.css('padding-left'))+(parseInt(t.css('padding-right'))-(knob.width()/2)) );
						f.width( t.width() );
					} else {
						var offset =  f.width() + ( parseInt(f.css('padding-right'))+(parseInt(f.css('padding-left'))-(knob.width()/2)) );
						t.width( f.width() );			
					}
					var width = offset + knob.width();
					
					if ( colorTrue && colorFalse) {
						w.css(
							$.browser.mozilla ? //too dirty
							{ 'background': '-moz-linear-gradient(left, '+ colorTrue +' 0%, '+ colorTrue +' 50%, '+ colorFalse +' 51%, '+ colorFalse +' 100%)' } : 
							{ 'background': '-webkit-gradient(linear, left top, right top, color-stop(0%,'+ colorTrue +'), color-stop(50%,'+ colorTrue +'), color-stop(51%,'+ colorFalse +'), color-stop(100%,'+ colorFalse +'))' }
						)
					}
					
					w.css({
						'width': width,
						'background-size': (width*2 - knob.width())  + 'px 20px',
						'-moz-background-size': (width*2 - knob.width())  + 'px 20px'
					})

				//	knob.css({
				//		'left': offset
				//	})
					s.attr('checked') ? toRight(w, knob, l, offset, s, 1) : toLeft(w, knob, l, offset, s, 1);
					
				 	if ( settings.labelsOutside ) {
						s.attr('checked') ? lt.addClass('active') : lf.addClass('active');
					
						lf.click(function(){
							toLeft(w, knob, l, offset, s, 0);
							lt.removeClass('active');
							lf.addClass('active');
						});
					
						lt.click(function(){
							toRight(w, knob, l, offset, s, 0);
							lf.removeClass('active');
							lt.addClass('active');
						})
					}
				    settings.draggable && knob.draggable({
				        containment: 'parent',
				        axis: 'x',
				        drag: function(event, ui) {
							l.css({'left': - offset + ui.position.left + 'px'});
							w.css({'background-position':- offset + ui.position.left + 'px 0px' });
						},
						stop: function(event, ui) {
							if ( ui.position.left > ( (width)/2 - knob.width()/2 ) ) {
								knob.animate({'left': offset }, 200);
								w.animate({'background-position': '0px 0px'}, 200);
								l.animate({'left': 0}, 200, function() {
									setState(true, s);
									if ( settings.labelsOutside ) {
										lf.removeClass('active');
										lt.addClass('active');
									}
								});
								
							} else {
								knob.animate({'left': 0 }, 200);	
								w.animate({'background-position': - offset + 'px 0px'}, 200);
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
							toLeft(w, knob, l, offset, s, 0);
							if ( settings.labelsOutside ) {
								lt.removeClass('active');
								lf.addClass('active');
							}
						} else {
							toRight(w, knob, l, offset, s, 0);
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

		function toRight(w, knob, l, offset, s, first) {
			if ( first ) {
				knob.css({	'left': offset	});
				w.css({'background-position': '0px 0px'});
				l.css({'left': 0});
				setState(true, s);
			} else {
				knob.animate({	'left': offset	});
				w.animate({'background-position': '0px 0px'});
				l.animate({'left': 0}, function() {
					setState(true, s);
				});
			}

		}

		function toLeft(w, knob, l, offset, s, first) {
			if ( first ) {
				knob.css({	'left': 0	});
				w.css({'background-position': - offset + 'px 0px'});			
				l.css({'left': -offset });
				setState(false, s);
			} else {
				knob.animate({	'left': 0	});
				w.animate({'background-position': - offset + 'px 0px'})				
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
