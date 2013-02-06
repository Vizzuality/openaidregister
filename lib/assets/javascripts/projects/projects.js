
  /**
   *  Entry point for new project view
   */


  $(function() {

    var NewProject = Backbone.View.extend({

      el: $('.form_inner'),

      spin_options: {
        lines: 11,
        length: 0,
        width: 4,
        radius: 7,
        corners: 1,
        rotate: 0,
        color: '#FFF',
        speed: 1,
        trail: 60,
        shadow: false,
        hwaccel: true,
        className: 'spinner',
        zIndex: 2e9,
        top: 'auto',
        left: 'auto',
        position: 'absolute'
      },

      events: {
        'submit form.new_basic':  '_onSubmitBasic',
        'click a.continue_form':  '_moveToForm',
        'click a.new_project':    '_redirect',
        'click a.cancel':         '_onCancel'
      },

      initialize: function() {
        _.bindAll(this, '_onSubmitBasic', '_redirect');

        this.children = [];
        this._initViews();
        this.spin = new Spinner(this.spin_options);
      },

      _initViews: function() {
        var self = this;

        // Embed map?
        if ($('#embed_map').length > 0 && this.options.projects) {
          self.children.push(
            new EmbedMap({
              el:           $('#embed_map'),
              projects:     this.options.projects
            })
          )
        }
          
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

        // Locations map
        if (this.$el.find('div.field.locations').length > 0) {
          self.children.push(
            new LocationsMap({
              el:           self.$el.find('div.field.locations'),
              select:       '#locations_list',
              targets:      [{
                              type:     'input',
                              selector: '#location'
                            }],
              add:          '',
              fieldClass:   'locations'
            })
          )
        }

        // Sector addon widget
        if (this.$el.find('div.field.sector').length > 0) {
          self.children.push(
            new AddonWidget({
              el:           self.$el.find('div.field.sector'),
              select:       '#sectors_list',
              targets:      [{
                              type:     'select',
                                selector: '#project_sector'
                              },{
                                type:     'select',
                                selector: '#project_subsector'
                              }
                            ],
              add:          'div.field.sector a.add',
              fieldClass:   'sector'
            })
          )
        }

        // Contact person
        if (this.$el.find('div.field.contact_person').length > 0) {
          self.children.push(
            new ContactPerson({
              el: self.$el.find('div.field.contact_person'),
              user: this.options.user
            })
          )
        }
          
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

      _validateBasicErrors: function() {
        var $project_name = this.$el.find('input#project_name')
          , $project_id = this.$el.find('input#project_id_in_organization')
          , $contact_name = this.$el.find('input#contact_person_name')
          , $contact_email = this.$el.find('input#contact_person_email');
        
        if ($project_name.val() == '') {
          this._setError($project_name, 'can\'t be blank');
          return false;
        } else {
          this._setError($project_name)
        }

        if ($project_id.val() == '') {
          this._setError($project_id, 'can\'t be blank');
          return false;
        } else {
          this._setError($project_id)
        }

        if ($contact_name.val() == '') {
          this._setError($contact_name, 'can\'t be blank');
          return false;
        } else {
          this._setError($contact_name)
        }

        if (!this._isValidEmail($contact_email.val())) {
          this._setError($contact_email, 'must be valid');
          return false;
        } else {
          this._setError($contact_email)
        }

        return true;
      },


      _onSubmitBasic: function(e) {
        e.preventDefault();

        if (!this._validateBasicErrors()) {  
          this._moveToError();
          return false;
        }

        this._createSpin($(e.target).find('input[name="commit"]'), { left: 0, top: 2 });
        this.trigger('submit', $(e.target), this);
      },


      _setError: function($el, text) {
        if (text) {
          $el
            .closest('div.field')
            .addClass('error')
            .find('label:eq(0) em')
            .remove()

          $el
            .closest('div.field')
            .find('label:eq(0)').not('label.placeholder')
            .append(' <em>' + text + '</em>');
        } else {
          $el
            .closest('div.field')
            .removeClass('error')
            .find('label:eq(0) em')
            .remove()
        }
      },

      _moveToForm: function(e) {
        e.preventDefault();
        var pos = this.$el.find('form').offset().top;
        this.$el.closest('body').animate({
          scrollTop: (pos-20)
        },450);
      },

      _moveToError: function() {
        var pos = this.$el.find('div.field.error').offset().top;
        this.$el.closest('body').animate({
          scrollTop: (pos-20)
        },450);
      },

      _redirect: function(e) {
        e.preventDefault();
        e.stopPropagation();
        this._createSpin($(e.target), { left: 10, top: 0 } );
        this.trigger('redirect', $(e.target).attr('href'));
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
        // Clean children
        _.each(this.children, function(view) {
          view.clean();
        });

        // Clean spin.js if it has been generated
        this._removeSpin();

        // remove this view
        this.remove();
      },

      _onCancel: function(e) {
        e.preventDefault();
        this.trigger('close', this);
      }
    });

    // Trying to connect this (modal-form == shit) with the main view
    var new_project = new NewProject({
      user: current_user,
      projects: projects
    });

    // Hacky -> packy
    $('body').trigger('completed', new_project);
    $('body').trigger('completed', new_project);
  });