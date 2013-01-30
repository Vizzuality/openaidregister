

  /**
   *  CONTACT PERSON Widget
   */


  var ContactPerson = Backbone.View.extend({

    events: {
      "click .different": "_showForm",
      "click .you":       "_setOwner"
    },
    
    initialize: function() {
      _.bindAll(this, '_setDefault', '_showForm');

      this.owner = this.options.user;
      this.$form = this.$el.find('div.contact_form');
      this.$you = this.$el.find('.select_wrapper')

      // Check if there is any error to show the mini form
      this._checkForm();
    },

    _checkForm: function() {
      // If there is an error or contact person is not the owner
      // show the mini form
      var email = this.$form.find('input#contact_person_email').val()
        , name = this.$form.find('input#contact_person_name').val();
      if (this.$el.find('div.field.error').length > 0
         || (email != this.owner.email || name != this.owner.name)) {
        this._showForm();
      } else {
        this._hideForm();
      }
    },

    _showForm: function(e) {
      if (e && e.preventDefault) {
        e.preventDefault();
        this._resetForm();
      }
      
      this.$you.hide();
      this.$form.show();
      this.$el.find('p.you').show();
    },

    _hideForm: function() {
      this.$you.show();
      this.$form.hide();
      this.$el.find('p.you').hide();
    },

    _setOwner: function(e) {
      e.preventDefault();
      
      // Set owner values
      this._setDefault();

      // Hide form
      this._hideForm();
    },

    _resetForm: function() {
      this.$form.find('input').each(function(i,el){
        $(el).val('')
      })
    },

    _setDefault: function(e) {
      this.$form.find('input#contact_person_email').val(this.owner.email);
      this.$form.find('input#contact_person_name').val(this.owner.name);
    },

    clean: function() {
      this.remove();
    }

  });