#jquery.switch.js
Plugin that makes iphone-like checkboxes
  
Requires  

*  jquery 1.4.4 or higher
*  jquery ui 1.8.9 or higher

Default options 

	labelsOutside: false
	clickable : true
	draggable : true
	
Using:

    <input type="chekbox" name="younameit" id="switch" data-true-label="true label" data-true-color="green" data-false-label="false label" data-false-color="red">
	<script type="text/javascript">
    	$('#switch').iswitch();
	</script>

You can also set labels not only from data-attributes, but from javascript too, like

	$('#switch').iswitch({ 
		trueLabel: 'this is a true label',
		trueColor: '#00FF00',
		falseLabel: 'false label',
		falseColor: 'red'
	});

in case you set it both ways, js version have a priority

color attributes are optional, but if set, then they must be set both (you can use `transparent` anyway), see the [demo](http://vxsx.github.com/jquery.iswitch.js)

Note
-------
I just needed the iphonish switch for our company's inner project, and because none of the available on the web solutions worked for me, i did this using css3 and jquery. No, it's not crossbrowser and it's likely never be.



TODO:
-----

* tweak animation with outside labels
* rewrite all js, just too messy :D
* disabled state (really don't want this)
* need nice demo-page :)
