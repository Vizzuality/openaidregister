
  /**
   *  Form errors by default
   */

  var FieldError = Backbone.View.extend({
    initialize: function() {
      this.render();
    },

    render: function() {
      this.$el.addClass('error');

      // Add error text to the label if exists
      var $label      = this.$el.find('label').not('label.placeholder')
        , error_text  = this.$el.find('span.error').text();
      if ($label && error_text) {
        $label.append(' <em>' + error_text + '</em>');
      }

      return this;
    },

    clean: function() {
      this.remove();
    }
  });