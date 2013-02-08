  

  /**
   *  Edit users view
   */

  $(function() {

    var spin_options = {
      lines: 11, length: 0, width: 4, radius: 7, corners: 1, rotate: 0, color: '#FFF',
      speed: 1, trail: 60, shadow: false, hwaccel: true, className: 'spinner', zIndex: 2e9,
      top: 'auto', left: 'auto', position: 'absolute'
    };


    /**
     *  Basic user view
     */

    var BasicEditUser = Backbone.View.extend({

      events: {
        'submit': '_onSubmit'
      },

      initialize: function() {
        _.bindAll(this, '_onSubmit', '_sendForm', '_resetForm');

        this.children = [];
        this.spin = new Spinner(spin_options);

        this._initViews();
      },

      _initViews: function() {
        var self = this;

        // Show errors if there is any...
        this.$el.find('div.field span.error').each(function(i,el) {
          self.children.push(
            new FieldError({
              el: $(el).closest('div.field')
            })
          )
        });
      },

      _isValidEmail: function(email) {
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
      },

      _validateUser: function() {
        var $name = this.$el.find('input#user_name')
          , $password = this.$el.find('input#user_password')
          , $email = this.$el.find('input#user_email');
        
        if ($name.val() == '') {
          this._setError($name, 'can\'t be blank');
          return false;
        } else {
          this._setError($name)
        }

        if ($password.val() == '') {
          this._setError($password, 'can\'t be blank');
          return false;
        } else {
          this._setError($password)
        }

        if (!this._isValidEmail($email.val())) {
          this._setError($email, 'must be valid');
          return false;
        } else {
          this._setError($email)
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

      _onSubmit: function(e) {
        e.preventDefault();
        e.stopPropagation();

        // Check if user can save this form
        if (!this._validateUser()) {
          return false;
        }

        this._createSpin($(e.target).find('button[type="submit"]'), { left: 263, top: 2 });

        var self = this;

        $.ajax({
          type: this.$el.attr('method'),
          url: this.$el.attr('action'),
          data: this.$el.serialize(),
          success: self._sendForm,
          error: self._resetForm
        });
      },

      _sendForm: function() {
        // Trigger form saved and close window
        this.trigger('submit', self);
      },

      _resetForm: function(e) {
        // Remove loading
        // Clean form
        // Show again form
        // Init views again
      },

      _createSpin: function($el, offset) {
        this._removeSpin();

        var $parent = $el.parent();

        $parent.css({ position: 'relative' })

        var pos = $el.position()
          , h_  = $el.outerHeight();

        $el.addClass('loading');

        this.spin.spin();
        $(this.spin.el).css({
          left: pos.left + ( offset ? offset.left : 0 ),
          top: pos.top + (h_/2) + ( offset ? offset.top : 0 )
        });

        $parent.append(this.spin.el);
      },

      _removeSpin: function() {
        if (this.spin) this.spin.stop();
      },

      clean: function() {
        if (this.children) {
          _.each(this.children, function(v) {
            v.clean();
          })
        }

        this._removeSpin();

        this.remove();
      }
    });




    /**
     *  Organization user view
     */

    var OrganizationEditUser = Backbone.View.extend({

      events: {
        'submit': '_onSubmit'
      },

      initialize: function() {
        _.bindAll(this, '_onSubmit');

        this.children = [];
        this.spin = new Spinner(spin_options);

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


      _validateOrganization: function() {
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

      _moveToError: function() {
        var pos = this.$el.find('div.field.error').offset().top;
        this.$el.closest('body').animate({
          scrollTop: (pos-20)
        },450);
      },

      _onSubmit: function(e) {
        e.preventDefault();
        e.stopPropagation();

        // Check if user can save this form
        if (!this._validateOrganization()) {
          this._moveToError();
          return false;
        }

        this._createSpin($(e.target).find('input[type="submit"]'), { left: 263, top: 2 });

        var self = this;

        $.ajax({
          type: this.$el.attr('method'),
          url: this.$el.attr('action'),
          data: this.$el.serialize(),
          success: function(r) {
            // Trigger form saved and close window
            self.trigger('submit', self);
          },
          error: function(e) {
            console.log(e);
            alert("submit error, what to do here? -> edit_users.js");
            // Remove loading
            // Show again form
          }
        });
      },

      _createSpin: function($el, offset) {
        this._removeSpin();

        var $parent = $el.parent();

        $parent.css({ position: 'relative' })

        var pos = $el.position()
          , h_  = $el.outerHeight();

        $el.addClass('loading');

        this.spin.spin();
        $(this.spin.el).css({
          left: pos.left + ( offset ? offset.left : 0 ),
          top: pos.top + (h_/2) + ( offset ? offset.top : 0 )
        });

        $parent.append(this.spin.el);
      },

      _removeSpin: function() {
        if (this.spin) this.spin.stop();
      },

      clean: function() {
        if (this.children) {
          _.each(this.children, function(v) {
            v.clean();
          })
        }

        this._removeSpin();

        this.remove();
      }
    });








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

        this.children.push(
          new BasicEditUser({
            el: this.$('div.user').closest('form')
          }).bind('submit', function() {
            self.trigger('submit')
          })
        )

        this.children.push(
          new OrganizationEditUser({
            el: this.$('div.organization').closest('form')
          }).bind('submit', function() {
            self.trigger('submit')
          })
        )
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