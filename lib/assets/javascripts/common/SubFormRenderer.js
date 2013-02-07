

  /**
   *  Subform item renderer
   *  - Class to mainly extend
   */
  
  var SubFormRenderer = Backbone.View.extend({

    events: {
      'click a.cancel_subform': '_onCancel',
      'submit':                 '_onSubmit'
    },

    _onCancel: function(e) {
      e.preventDefault();
      e.stopPropagation();
      this.trigger('cancel_subform', this);
    },

    _onSubmit: function(e) {
      e.preventDefault();
      e.stopPropagation();
      this.trigger('submit_subform', $(e.target), this);
    },

    clean: function() {
      if (this.children) {
        _.each(this.children, function(v) {
          v.clean;
        })
      }
      this.remove();
    }
  })