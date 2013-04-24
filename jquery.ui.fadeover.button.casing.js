/* jQuery.ui.fadeover.button.casing.js
 * Ver: 1.1.0
 * by Kieran Simkin - http://SlinQ.com/
 *
 * Copyright (c) 2011-2013, Kieran Simkin
 * All rights reserved.
 *
 *
 * This program is a wrapper, to allow you to use FadeOver in place of 
 * standard jQuery UI buttons without having to rewrite all your code. 
 * With this script loaded, you can call .button(), and you'll get a 
 * FadeOver button instead of the standard jQuery UI one. 
 *
 */
(function( $ ) {
	$.widget("ui.button", $.extend({}, $.ui.button.prototype, $.slinq.fadeover.prototype));
	console.log($.slinq.fadeover.prototype);

})(jQuery);

