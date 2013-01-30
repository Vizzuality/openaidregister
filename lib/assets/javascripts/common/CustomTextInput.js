
  /**
   *  Simulate a focus area for inputs without border
   */
  
  var CustomTextInput = Backbone.View.extend({

    events: {
      'focusin':    '_focusIn',
      'focusout':   '_focusOut'
    },

    initialize: function() {},

    _focusIn: function(e) {
      this.$el.closest('.select_wrapper').addClass('focus');
    },

    _focusOut: function(e) {
      this.$el.closest('.select_wrapper').removeClass('focus');
    },

    clean: function() {
      this.remove();
    }
  });