  

  /**
   *  Edit users view
   */

  $(function() {
    var EditUser = Backbone.View.extend({

      el: $('div.edit_user'),

      events: {
        'click a.organization_data':  '_showOrganization',
        'click a.account_data':       '_showAccount',
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

        // Hints
        this.$el.find('span.hint').each(function(i,el){
          self.children.push(
            new FieldHint({
              el: $(el)
            })
          )
        });

        // Subforms (Yes, more ajax forms within ajax forms... inception)
        this.$el.find('div.subform').each(function(i,el) {
          self.children.push(
            new SubForm({
              el: $(el).closest('div.field')
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


      _showAccount: function(e) {
        e.preventDefault();
        this.$('a.account_data').addClass('selected');
        this.$('a.organization_data').removeClass('selected');
        this.$('.edit_user_forms .organization').hide();
        this.$('.edit_user_forms .user').show();

        this.trigger('changed', this);
      },

      _showOrganization: function(e) {
        e.preventDefault();
        this.$('a.account_data').removeClass('selected');
        this.$('a.organization_data').addClass('selected');
        this.$('.edit_user_forms .organization').show();
        this.$('.edit_user_forms .user').hide();

        this.trigger('changed', this);
      },

      clean: function() {
        if (this.children) {
          _.each(this.children, function(v) {
            v.clean();
          })
        }

        this.remove();
      }

    });

    var edit_user = new EditUser();

    // Save the form
    $('body').trigger('edit_user_loaded', edit_user);
  })