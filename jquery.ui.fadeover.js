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

var        baseClasses = "ui-button ui-widget ui-state-default ui-corner-all",
var        otherClasses = "ui-state-hover ui-state-active " +
		                "ui-button-icons-only ui-button-icon-only ui-button-text-icons ui-button-text-icon ui-button-text-only";

$.widget( "ui.fadeover", {
        // These options will be used as defaults
        options: {
		width: null,
		height: null,
		alt: '',
		title: null,
		disabled: false,
		clickable: true,
		loading_img: 'ajaxloader.gif',
		over_duration: 200,
		out_duration: 600,
		autosize_slide_animate_duration: 200,
		autosize_fade_animate_duration: 600,
		images: {
			normal: null,
			over: null,
			disabled: null,
			active: null
		},
		html_fragments: {
			normal: null,
			over: null,
			disabled: null,
			active: null
		},
		ui_button: { 
			enabled: false,
			text: true,
			label: null,
			icons: {
				primary: null,
				secondary: null
			}
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
		this.element.bind('mouseenter.'+this.widgetName, this._mouseenter());
		this.element.bind('mouseleave.'+this.widgetName, this._mouseleave());
		this.element.bind('click.'+this.widgetName, this._mouseclick());
	},
	_mouseenter: function() { 
		var me = this;
		return function(event) { 
			if (typeof(me.current_effect)!='undefined' && me.current_effect!==null) { 
				me.current_effect.stop();
				me.current_effect=null;
			}
			me.current_effect=me.overdiv.animate({opacity: 1.0, duration: me.options.over_duration, complete: function() { 
				me.current_effect=null;
			}});
		}
	},
	_mouseleave: function() { 
		var me = this;
		return function(event) { 
			if (typeof(me.current_effect)!='undefined' && me.current_effect!==null) { 
				me.current_effect.stop();
				me.current_effect=null;
			}
			me.current_effect=me.overdiv.animate({opacity: 0.0, duration: me.options.out_duration, complete: function() { 
				me.current_effect=null;
			}});
		}
	},
	_mouseclick: function() { 
		var me = this;
		return function(event) {
			if (me.options.clickable && !me.options.disabled) { 
				return true;
			} else {
				// Don't bubble
				return false;
			}
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
					.addClass('ui-widget-fadeover-loader');
		this.loader_image = $('<img />');
		this.loader_image		.attr('src',this.options.loading_img)
						.addClass('ui-widget')
						.addClass('ui-widget-fadeover-loader-image')
						.appendTo(this.loaderdiv);
	},
	_do_html_setup: function() { 
		this.element.empty();
		this._do_loader_setup();
		this.element.		css({
						display: 'block',
						position: 'relative'
					})
					.width(this.options.width)
					.height(this.options.height)
					.addClass('ui-widget')
					.addClass('ui-widget-fadeover');
		if (this.options.clickable && !this.options.disabled) { 
			this.element.css({cursor: 'pointer'});
			this.element.attr('role','button');
		}
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
		this.activediv=$('<div></div>')
					.css({
						display: 'block',
						position: 'absolute',
						opacity: '0.0'
					})
					.width(this.options.width)
					.height(this.options.height)
					.addClass('ui-widget')
					.addClass('ui-widget-fadeover-active')
					.appendTo(this.element);
		if (this.is_image()) { 
			this._setup_content_image();
		} else if (this.is_html()) { 
			this._setup_content_html();
		} else if (this.is_button()) { 
			this._setup_content_ui_button();
		}

	},
	_setup_content_image: function() { 
		this.normal_image_is_loaded=false;
		this.normal_image = $('<img />');
		this.normal_image	.bind('load',this._normal_image_loaded());
		this.normal_image	.attr('src',this.options.images.normal)
					.attr('alt',this.options.alt)
					.attr('title',this.options.title)
					.addClass('ui-widget')
					.addClass('ui-widget-fadeover-normal-image')
					.appendTo(this.element);
		this.over_image_is_loaded=false;
		this.over_image = $('<img />');
		this.over_image		.bind('load',this._over_image_loaded());
		this.over_image		.attr('src',this.options.images.over)
					.attr('alt',this.options.alt)
					.attr('title',this.options.title)
					.addClass('ui-widget')
					.addClass('ui-widget-fadeover-over-image')
					.appendTo(this.overdiv);
		if (this.options.images.disabled!==null) { 
			this.disabled_image_is_loaded=false;
			this.disabled_image = $('<img />');
			this.disabled_image	.bind('load',this._disabled_image_loaded());
			this.disabled_image	.attr('src',this.options.images.disabled)
						.attr('alt',this.options.alt)
						.attr('title',this.options.title)
						.addClass('ui-widget')
						.addClass('ui-widget-fadeover-disabled-image')
						.appendTo(this.disableddiv);

		}
		if (this.options.images.active!==null) { 
			this.active_image_is_loaded=false;
			this.active_image = $('<img />');
			this.active_image	.bind('load',this._active_image_loaded());
			this.active_image	.attr('src',this.options.images.active)
						.attr('alt',this.options.alt)
						.attr('title',this.options.title)
						.addClass('ui-widget')
						.addClass('ui-widget-fadeover-active-image')
						.appendTo(this.activediv);
		}
	},
	_setup_content_html: function() { 
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
		// Nothing to load, no need to wait - trigger 'ready' now:
		this._loaded();
	},
	_loaded: function() {
		this._trigger('ready');
	},
	_disabled_image_loaded: function() { 
		var me = this;
		return function() { 
			me.disabled_image_is_loaded=true;
			if (me.over_image_is_loaded && me.normal_image_is_loaded && (me.options.images.active===null || me.active_image_is_disabled)) { 
				me._loaded();
			}
		}
	},
	_active_image_loaded: function() { 
		var me = this;
		return function() { 
			me.active_image_is_loaded=true;
			if (me.over_image_is_loaded && me.normal_image_is_loaded && (me.options.images.disabled===null || me.disabled_image_is_loaded)) { 
				me._loaded();
			}
		}
	}
	_normal_image_loaded: function() { 
		var me = this;
		return function() { 
			me.normal_image_is_loaded=true;
			if (me.over_image_is_loaded && (me.options.images.disabled===null || me.disabled_image_is_loaded) && (me.options.images.active===null || me.active_image_is_loaded)) { 
				me._loaded();
			}
		}
	},
	_over_image_loaded: function() { 
		var me = this;
		return function() { 
			me.over_image_is_loaded=true;
			if (me.normal_image_is_loaded && (me.options.images.disabled===null || me.disabled_image_is_loaded) && (me.options.images.active===null || me.active_image_is_loaded)) { 
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
			me.element.css({opacity: '0.0'});
			me.element.animate({width: this.width+'px', height: this.height+'px'},{duration: me.options.autosize_slide_animate_duration, complete: function() { 
				me._create();
				me.element.animate({opacity: '1.0'},{duration: me.options.autosize_fade_animate_duration});
			}});
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
		if (this.is_image()) { 
			return false;
		} else if (this.options.html_fragments.normal !== null && this.options.html_fragments.over !== null) { 
			return true;
		} else {
			return false;
		}
	},
	is_button: function() { 
		if (this.is_image()) { 
			return false;
		} else if (this.is_html()) { 
			return false;
		} else if (this.options.ui_button.enabled) { 
			return true;
		} else { 
			return false;
		}
	},
	is_anything: function() { 
		if (this.is_image() || this.is_html() || this.is_button()) { 
			return true;
		} else { 
			return false;
		}
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
