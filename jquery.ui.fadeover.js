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
		alt: '',
		title: null,
		disabled: false,
		loading_img: 'ajaxloader.gif',
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
		if (this.options.title===null) { 
			this.options.title=this.options.alt;
		}
		var preload_loader = new Image();
		preload_loader.src=this.options.loading_img;
		if (this.is_image() && (this.options.width === null || this.options.height === null)) { 
			this._determine_image_dimensions();
			return;
		} else if (this.is_html() && (this.options.width === null || this.options.height === null)) { 
			alert('No size specified for HTML FadeOver widget.');
			return;
		}
		if (parseInt(this.options.width)!=this.options.width || parseInt(this.options.height)!=this.options.height) { 
			alert('FadeOver width and height must be numeric');
			return;
		}
		this.options.width=parseInt(this.options.width);
		this.options.height=parseInt(this.options.height);
		this._do_html_setup();
		this._bind_events();
	},
	_bind_events: function() { 
		this.element.bind('mouseover.'+this.widgetName, this._mouseover());
		this.element.bind('mouseout.'+this.widgetName, this._mouseout());
		this.element.bind('click.'+this.widgetName, this._mouseclick());
	},
	_mouseover: function() { 
		var me = this;
		return function(event) { 
			me.overdiv.animate({opacity: 1.0});
		}
	},
	_mouseout: function() { 
		var me = this;
		return function(event) { 
			me.overdiv.animate({opacity: 0.0});
		}
	},
	_mouseclick: function() { 
		var me = this;
		return function(event) {
			alert('clicked');
		}
	},
	_do_loader_setup: function() { 
		this.loaderdiv=$('<div></div>')
					.css({
						display: 'block',
						position: 'absolute'
					})
					.width(this.options.width)
					.height(this.options.height)
					.addClass('ui-widget')
					.addClass('ui-widget-loader');
		this.loader_image = $('<img />');
		this.loader_image		.attr('src',this.options.loading_img)
						.addClass('ui-widget')
						.addClass('ui-widget-loader-image')
						.appendTo(this.loaderdiv);
	},
	_do_html_setup: function() { 
		this.element.html('');
		this._do_loader_setup();
		this.element.		css({
						display: 'block',
						position: 'relative',
					})
					.width(this.options.width)
					.height(this.options.height)
					.addClass('ui-widget')
					.addClass('ui-widget-fadeover');
		this.hotspot=$('<div></div>')
					.css({
						display: 'block',
						position: 'absolute'
					})
					.width(this.options.width)
					.height(this.options.height)
					.addClass('ui-widget')
					.addClass('ui-widget-fadeover-hotspot')
					.appendTo(this.element);
		this.overdiv=$('<div></div>')
					.css({
						display: 'block',
						position: 'absolute',
						opacity: '0.0'
					})
					.width(this.options.width)
					.height(this.options.height)
					.addClass('ui-widget')
					.addClass('ui-widget-fadeover-over')
					.appendTo(this.element);
		this.disableddiv=$('<div></div>')
					.css({
						display: 'block',
						position: 'absolute',
						opacity: '0.0'
					})
					.width(this.options.width)
					.height(this.options.height)
					.addClass('ui-widget')
					.addClass('ui-widget-fadeover-disabled')
					.appendTo(this.element);
		if (this.is_image()) { 
			this.normal_image_is_loaded=false;
			this.normal_image = $('<img />');
			this.normal_image	.bind('load',this._normal_image_loaded(this));
			this.normal_image	.attr('src',this.options.images.normal)
						.attr('alt',this.options.alt)
						.attr('title',this.options.title)
						.addClass('ui-widget')
						.addClass('ui-widget-normal-image')
						.appendTo(this.element);
			this.over_image_is_loaded=false;
			this.over_image = $('<img />');
			this.over_image		.bind('load',this._over_image_loaded(this));
			this.over_image		.attr('src',this.options.images.over)
						.attr('alt',this.options.alt)
						.attr('title',this.options.title)
						.addClass('ui-widget')
						.addClass('ui-widget-over-image')
						.appendTo(this.overdiv);
			if (this.options.images.disabled!==null) { 

				this.disabled_image_is_loaded=false;
				this.disabled_image = $('<img />');
				this.disabled_image	.bind('load',this._disabled_image_loaded(this));
				this.disabled_image	.attr('src',this.options.images.disabled)
							.attr('alt',this.options.alt)
							.attr('title',this.options.title)
							.addClass('ui-widget')
							.addClass('ui-widget-disabled-image')
							.appendTo(this.disableddiv);

			}
		} else { 
			this.normal_html = $('<div></div>')
						.addClass('ui-widget')
						.addClass('ui-widget-fadeover-html-content')
						.html(this.options.html_fragments.normal)
						.appendTo(this.element);
			this.over_html = $('<div></div>')
						.addClass('ui-widget')
						.addClass('ui-widget-fadeover-over-html-content')
						.html(this.options.html_fragments.over)
						.appendTo(this.overdiv);
		}
		this._loaded();

	},
	_loaded: function() {
		this._trigger('ready');
	},
	_disabled_image_loaded: function(me) { 
		return function() { 
			me.disabled_image_is_loaded=true;
			if (me.over_image_is_loaded && me.normal_image_is_loaded) { 
				me._loaded();
			}
		}
	},
	_normal_image_loaded: function(me) { 
		return function() { 
			me.normal_image_is_loaded=true;
			if (me.over_image_is_loaded && (me.options.images.disabled===null || me.disabled_image_is_loaded)) { 
				me._loaded();
			}
		}
	},
	_over_image_loaded: function(me) { 
		return function() { 
			me.over_image_is_loaded=true;
			if (me.normal_image_is_loadedi && (me.options.images.disabled===null || me.disabled_image_is_loaded)) { 
				me._loaded();
			}
		}
	},
	_determine_image_dimensions: function() { 
		var normal = new Image();
		var me=this;
		$(normal).bind("load", function() { 
			me.options.width=this.width;
			me.options.height=this.height;
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
		}

		$.Widget.prototype._setOption.apply( this, arguments );
	},
	destroy: function() { 
		$.Widget.prototype.destroy.call( this );	
	}
});
}(jQuery));
