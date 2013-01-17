
  
  var Modal = Backbone.View.extend({

    tagName: 'div',
    className: 'dialog',

    events: {
      'click .cancel':  '_cancel',
      'click .close':   '_cancel'
    },

    default_options: {
      title: 'title',
      description: 'description',
      ok_title: 'Ok',
      cancel_title: 'Cancel',
      width: 300,
      clean_on_hide: false,
      enter_to_confirm: false,
      template_name: 'common/views/dialog_base',
      ok_button_classes: 'button green',
      cancel_button_classes: '',
      modal_type: '',
      modal_class: '',
      include_footer: true,
      additionalButtons: []
    },


    initialize: function() {
      _.defaults(this.options, this.default_options);

      _.bindAll(this, 'render', '_keydown');

      // Keydown bindings for the dialog
      $(document).bind('keydown', this._keydown);

      // After removing the dialog, cleaning other bindings
      this.bind("clean", this._reClean);

      this.template_base = this.options.template_base ? _.template(this.options.template_base) : cdb.templates.getTemplate(this.options.template_name);
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
        this._cancel();
      } 
    },


    appendToBody: function() {
      $('body').append(this.render().el);
      return this;
    },


    _cancel: function(e) {
      if (ev) {
        ev.preventDefault();
        ev.stopPropagation();
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


    open: function() {
      this.$el.show();
    },


    _reClean: function() {
      $(document).unbind('keydown', this._keydown);
    }
  })