/*  jQuery.ui.fadeover.js
 *  Ver: 1.0
 *  by Kieran Simkin - http://SlinQ.com/
 *
 *  Copyright (c) 2011-2012, Kieran Simkin
 *  All rights reserved.
 *
 *  Redistribution and use, with or without modification, are permitted provided that the following condition is met:
 *
 *  -  Redistributions of this code must retain the above copyright notice, this condition and the following disclaimer.
 *
 *  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISC
LAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS
 OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EV
EN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 *
 */
(function( jQuery ) {
jQuery.widget( "ui.fadeover", {
        // These options will be used as defaults
        options: {
		disabled: false
	},
	_create: function() { 

	},
	_setOption: function(key, value) { 
		switch( key ) {
			case "disabled":
				// handle enabling and disabling	
				break;
		        case "clear":
				break;
		}

		jQuery.Widget.prototype._setOption.apply( this, arguments );
	},
	destroy: function() { 
		jQuery.Widget.prototype.destroy.call( this );	
	}
});
}(jQuery));
