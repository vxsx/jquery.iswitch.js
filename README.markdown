#jquery.switch.js
Plugin that makes iphone-like checkboxes  
  
Requires  
<ul>
	<li>jquery 1.4.4 or higher</li>
	<li>jquery ui 1.8.9 or higher</li>
</ul>
  	
Default options 

	labelsOutside: false
	clickable : true
	draggable : true
	
Using:

    <input type="chekbox" name="younameit" id="switch" data-true="true label" data-false="false label">

    $('#switch').iswitch();


Note
-------
I just needed the iphonish switch for our company's inner project, and because none of the available on the web solutions worked for me, i did this using css3 and jquery. No, it's not crossbrowser and it's likely never be.
