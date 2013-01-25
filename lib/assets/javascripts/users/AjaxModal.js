
  /**
   *  Dialogs loading ajax content
   */

  var AjaxModal = Modal.extend({

    template: '<div class="padding"><p class="center loader light"><%= loading_message|| "Loading content" %></p></div>',

    render_content: function() {
      var template = _.template(this.template)({ loading_message: this.options.loading_message });

      return template;
    },

    open: function() {
      this._checkModalHeight();
      this.$el.show();
      this._getContent();
    },

    _getContent: function() {
      var self = this;
      $.ajax({
        url: this.options.url,
        success: function(r) {
          self.$el.find('div.content')
            .html('')
            .append(r);

          self._checkModalHeight();
        },
        error: function() {}
      });
    }
  })