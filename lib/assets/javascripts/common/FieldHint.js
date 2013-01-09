  
  var FieldHint = Backbone.View.extend({

    errors: {},

    defaults: {
      fade: true,
      offset: 5,
      gravity: "s"
    },

    events: {
      "click": "_killEvent"
    },

    initialize: function() {
      this.options = _.extend(this.defaults, this.options);

      // Get hint input
      this.$input = this.$el.prev('input');

      this._initTipsy();
      this._editHintInput();
      this._positionateHint();
    },

    _render: function() {},

    _initTipsy: function() {
      this.$el.tipsy({
        fade:     this.options.fade,
        offset:   this.options.offset,
        gravity:  this.options.gravity,
        title: function() {
          return this.getAttribute('data-hint')
        }
      });
    },

    // Positionate correctly the hint
    _positionateHint: function() {
      var long_input = this.$input.innerWidth()
        , top_input = this.$input.position().top;
      
      this.$el.css({
        left: long_input - 28,
        top: top_input + 20
      })
    },    

    // Edit the near input to change the right padding
    _editHintInput: function() {

      this.$input.css({
        paddingRight: "+=16",
        width: "-=16"
      })
    },

    _killEvent: function(e) {
      e.stopPropagation();
      e.preventDefault();
    }
  })