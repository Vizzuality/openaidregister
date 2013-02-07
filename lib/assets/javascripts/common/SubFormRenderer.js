

  /**
   *  Subform item renderer
   *  - Class to mainly extend
   */
  
  var SubFormRenderer = Backbone.View.extend({

    events: {
      'click a.cancel_subform': '_onCancel',
      'submit':                 '_onSubmit'
    },

    initialize: function() {
      this.children = [];
      this._initViews();
    },

    _initViews: function() {
      var self = this;

      // Custom selects
      this.$el.find('select').not('select[multiple]').each(function(i,el){
        self.children.push(
          new CustomSelect({
            el: $(el)
          })
        )
      });

      // Custom text inputs
      this.$el.find('input[type="text"]').not('.select2-input').each(function(i,el){
        self.children.push(
          new CustomTextInput({
            el: $(el)
          })
        )
      });

      // Custom fieldsets
      this.$el.find('fieldset').each(function(i,el){
        self.children.push(
          new CustomFieldset({
            el: $(el)
          })
        )
      });       

      // Hints
      this.$el.find('span.hint').each(function(i,el){
        self.children.push(
          new FieldHint({
            el: $(el)
          })
        )
      });

      // Show errors if there is any...
      this.$el.find('div.field span.error').each(function(i,el) {
        self.children.push(
          new FieldError({
            el: $(el).closest('div.field')
          })
        )
      });
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