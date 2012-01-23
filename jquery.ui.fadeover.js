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
(function( $ ) {
$.widget( "ui.fadeover", {
        // These options will be used as defaults
        options: {
		width: null,
		height: null,
		disabled: false,
		images: {
			normal: null,
			over: null,
			disabled: null
		},
		html_fragments: {
			normal: null,
			over: null,
			disabled: null
		}
	},
	_create: function() { 
		if (this.is_image() && (this.options.width === null || this.options.height === null)) { 
			this._determine_image_dimensions();
			return;
		} else if (this.is_html() && (this.options.width === null || this.options.height === null)) { 
			alert('No sized specified for HTML FadeOver widget.');
			return;
		}
		if (typeof(this.options.width)!="number" || parseInt(this.options.width)!=this.options.width || typeof(this.options.height)!="number" || parseInt(this.options.height)!=this.options.height) { 
			alert('FadeOver width and height must be numeric');
			return;
		}
		this._do_html_setup();
	},
	_do_html_setup: function() { 
		$(this.element).	css({display: 'block',position: 'relative'});

	},
	_determine_image_dimensions: function() { 
		var normal = new Image();
		var me=this;
		$(normal).bind("load", function() { 
			me.options.width=this.width();
			me.options.height=this.height();
			me._create();
		});
		normal.src=this.options.images.normal;
	},
	is_image: function() { 
		if (this.options.images.normal !== null && this.options.images.over !== null) { 
			return true;
		} else { 
			return false;
		}
	},
	is_html: function() { 
		return !this.is_image();
	},
	_setOption: function(key, value) { 
		switch( key ) {
			case "disabled":
				// handle enabling and disabling	
				break;
		        case "clear":
				break;
		}

		$.Widget.prototype._setOption.apply( this, arguments );
	},
	destroy: function() { 
		$.Widget.prototype.destroy.call( this );	
	}
});
}(jQuery));
