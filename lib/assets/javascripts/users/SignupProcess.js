
  /**
   *  Signup process view :)
   */

  var SignupProcess = Backbone.View.extend({
    
    events: {
      'click button.continue':  '_next',
      'submit form':            '_onSubmit',

    },

    initialize: function() {
      _.bindAll(this, '_onSubmit');
      this.step = 0;
    },

    _onSubmit: function(e) {
      if (this.step == 0) {
        e.preventDefault();
        e.stopPropagation();
        this._next(e);
      } else if (this.step == 1) {
        this._last(e);
      }
    },

    _isValidEmail: function(email) {
      var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    },

    _validateUser: function() {
      var $name = this.$el.find('input#user_name')
        , $password = this.$el.find('input#user_password')
        , $email = this.$el.find('input#user_email')
      
      if ($name.val() == '') {
        this._setError($name, 'can\'t be blank');
        return false;
      } else {
        this._setError($name)
      }

      if (!this._isValidEmail($email.val())) {
        this._setError($email, 'must be valid');
        return false;
      } else {
        this._setError($email)
      }

      if ($password.val() == '') {
        this._setError($password, 'can\'t be blank');
        return false;
      } else {
        this._setError($password)
      }

      return true;
    },


    _validateOrg: function() {
      var $name = this.$el.find('input#user_organization_name')
        , $type = this.$el.find('select#user_organization_type_id')
        , $country = this.$el.find('select#user_organization_country_id')
      
      if ($name.val() == '') {
        this._setError($name, 'can\'t be blank');
        return false;
      } else {
        this._setError($name)
      }

      if ($type.val() == '') {
        this._setError($type, ' ');
        return false;
      } else {
        this._setError($type)
      }

      if ($country.val() == '') {
        this._setError($country, ' ');
        return false;
      } else {
        this._setError($country)
      }

      return true;
    },


    _setError: function($el, text) {
      if (text) {
        $el
          .closest('div.field')
          .addClass('error')
          .find('label em')
          .remove()

        $el
          .closest('div.field')
          .find('label').not('label.placeholder')
          .append(' <em>' + text + '</em>');
      } else {
        $el
          .closest('div.field')
          .removeClass('error')
          .find('label em')
          .remove()
      }
    },

    _next: function() {
      // Check if user can go to organization
      if (!this._validateUser()) {
        return false;
      }

      // Move user block to the top
      var $user = this.$el.find('div.user')
        , top_move = $user.outerHeight();

      $user.animate({'marginTop': -top_move}, 300);


      // Resize signup block to show all organization content
      var $org = this.$el.find('div.organization')
        , height = $org.outerHeight() + 50;

      this.$el.find('div.signup').animate({'height': height}, 300);

      // Move bar :)
      this.$el.find('div.progress span.bar').animate({
        width: '100%'
      },300);

      // Focus in organizations name
      $org.find('input:eq(0)').focus();

      this.step = 1;
    },

    _last: function(e) {

      // Check if user can send form
      if (!this._validateOrg()) {
        e.preventDefault();
        e.stopPropagation();
      }
    }
  });