
  
  var Modal = Backbone.View.extend({

    tagName: 'div',
    className: 'dialog',

    events: {
      'click .cancel':  '_cancel',
      'click .close':   '_cancel'
    },

    templates: {
      base: '<div class="mamufas">\
              <section class="block modal <%= modal_type %>">\
                <a href="#close" class="close">x</a>\
                <% if (head) { %>\
                  <div class="head block">\
                    <h3 class="center"><span class="title_line"></span><%= title %><span class="title_line"></span></h3>\
                  </div>\
                <% } %>\
                <div class="content"></div>\
              </section>\
            </div>'
    },

    default_options: {
      head: true,
      title: 'title',
      width: 550,
      clean_on_hide: true,
      modal_type: '',
      modal_class: ''
    },


    initialize: function() {
      _.defaults(this.options, this.default_options);

      _.bindAll(this, 'render', '_keydown');

      // Keydown bindings for the dialog
      $(document).bind('keydown', this._keydown);

      // After removing the dialog, cleaning other bindings
      this.bind("clean", this._reClean);

      this.template_base = _.template(this.templates.base);
    },


    render: function() {
      var $el = this.$el;

      $el.html(this.template_base(this.options));

      $el.find(".modal").css({
        width: this.options.width
      });

      if(this.render_content) {
        this.$('.content').append(this.render_content());
      }

      if(this.options.modal_class) {
        this.$el.addClass(this.options.modal_class);
      }

      return this;
    },


    _keydown: function(e) {
      // If clicks esc, goodbye!
      if (e.keyCode === 27) {
        e.stopPropagation();
        this._cancel();
      } 
    },


    appendToBody: function() {
      $('body').append(this.render().el);
      return this;
    },


    _cancel: function(e) {
      if (e) {
        e.preventDefault();
        e.stopPropagation();
      }
      if (this.cancel) {
        this.cancel();
      }
      this.hide();
    },


    hide: function() {
      this.$el.hide();

      if (this.options.clean_on_hide) {
        this.clean();
      }
    },

    
    clean: function() {
      this.remove();
    },


    open: function() {
      // Scroll to the top
      this._scrollToTop();
      // Calculate document and black zone
      this._checkModalHeight();
      this.$el.show();
    },

    
    _scrollToTop: function() {
      $('body').animate({
        scrollTop: 0
      }, 300)
    },


    _checkModalHeight: function() {
      // Reset mamufas height to calculate properly
      var $mamufas = this.$el.find('.mamufas');
      $mamufas.height(0);

      // Calculate document and black zone
      var page_height = $('body')[0].scrollHeight
        , $modal = this.$el.find('.modal')
        , mamufas_padding = parseInt($mamufas.css('paddingTop').replace('px','')) + parseInt($mamufas.css('paddingBottom').replace('px',''))
        , modal_height = $modal.outerHeight();

      if (modal_height < page_height) {
        $mamufas.height(page_height - mamufas_padding);
      } else {
        $mamufas.height(modal_height + 100 - mamufas_padding);
      }
    },


    _reClean: function() {
      $(document).unbind('keydown', this._keydown);
    }
  })