
  /**
   *  Simulate placeholder for all browsers
   */

  var TextPlaceholder = Backbone.View.extend({

    events: {
      'keyup': '_checkInput'
    },

    initialize: function() {
      _.bindAll(this, '_checkInput');

      this.placeholder = this.$el.attr('placeholder');
      this._removeDefault();
      this.render();
      setTimeout(this._checkInput, 200);
    },

    render: function() {
      var $label = $('<label>').addClass('placeholder');
      $label.text(this.placeholder);

      this.$el.after($label);
      this.$el.data('placeholder', $label);

      // Copy styles to positionate correctly
      var top = this.$el.position().top
        , paddingTop = parseInt(this.$el.css('padding-top').replace('px',''))
        , marginTop = parseInt(this.$el.css('margin-top').replace('px',''))
        , lineHeight = this.$el.css('line-height')
        , fontSize = this.$el.css('font-size');

      $label.css({
        top: top + marginTop + paddingTop - 1,
        lineHeight: lineHeight,
        fontSize: fontSize
      })

      return this;
    },

    _removeDefault: function() {
      this.$el.removeAttr('placeholder');
    },

    _checkInput: function() {
      if (this.$el.val().length > 0) {
        this.$el.data('placeholder').hide();
      } else {
        this.$el.data('placeholder').show();
      }
    }
  });