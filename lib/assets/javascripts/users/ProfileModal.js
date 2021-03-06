
  /**
   *  Dialogs loading ajax content (forms!)
   */

  var ProfileModal = Modal.extend({

    template: '<div class="padding"><p class="center loader light"><%= loading_message || "Loading content" %></p></div>',

    initialize: function() {
      _.bindAll(this, '_renderForm', '_setNewForm');
      
      // To get the new forms magically :S
      $('body').bind('edit_user_loaded', this._setNewForm);

      this.constructor.__super__.initialize.apply(this);
    },

    render_content: function() {
      var template = _.template(this.template)({ loading_message: this.options.loading_message });

      return template;
    },

    open: function() {
      // Scroll to the top
      this._scrollToTop();
      // Check modal window
      this._checkModalHeight();
      this.$el.show();
      this._getContent('GET', {}, this.options.url);
    },

    _getContent: function(type, data, url) {
      var self = this;

      $.ajax({
        type: type,
        data: data,
        url: url,
        success: self._renderForm,
        error: function() {}
      });
    },

    _renderForm: function(html) {
      // Clean and remove previous form
      if (this.form) {
        var previous_form = this.form;
        this._unbindActions(previous_form);
        this._removeForm(previous_form);
      }

      // Add new form
      this.$el.find('div.content').html('').append(html);

      // Move to the top
      this._scrollToTop();

      // Check modal height
      this._checkModalHeight();
    },

    _setNewForm: function(ev,form) {
      this.form = form;
      this._bindActions(form);
    },

    _removeForm: function(form) {
      form.clean();
    },

    _bindActions: function(form) {
      var self = this;

      form.bind('submit', function($form, view){
        // hide window is everything is ok!
        self.hide();
      });

      form.bind('edited changed', function() {
        // if any data is added to the form, let's change the modal height :S
        self._checkModalHeight();
      })
    },

    _unbindActions: function(form) {
      if (form) {
        form.unbind('submit edited changed');
      }
    },

    clean: function() {
      if (this.form) {
        this._removeForm(this.form);
        this._unbindActions(this.form);
      }

      $('body').unbind('edit_user_loaded', this._setNewForm);
      
      this.remove();
    }
  })