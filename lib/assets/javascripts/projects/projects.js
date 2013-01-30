
  /**
   *  Entry point for new project view
   */


  $(function() {

    var NewProject = Backbone.View.extend({

      el: $('.form_inner'),

      events: {
        'submit form.new_basic':  '_onSubmitBasic',
        'click a.cancel':         '_onCancel'
      },

      initialize: function() {
        _.bindAll(this, '_onSubmitBasic');

        this.siblings = [];
        this._initViews();
      },

      _initViews: function() {
        var self = this;

        // Embed map?
        if (this.$el.find('#embed_map').length > 0 && projects) {
          self.siblings.push(
            new EmbedMap({
              el:           this.$el.find('#embed_map'),
              projects:     projects
            })
          )
        }
          
        // Custom selects
        this.$el.find('select').not('select[multiple]').each(function(i,el){
          self.siblings.push(
            new CustomSelect({
              el: $(el)
            })
          )
        });

        // Custom text inputs
        this.$el.find('input[type="text"]').not('.select2-input').each(function(i,el){
          console.log(el);
          self.siblings.push(
            new CustomTextInput({
              el: $(el)
            })
          )
        });        

        // Hints
        this.$el.find('span.hint').each(function(i,el){
          self.siblings.push(
            new FieldHint({
              el: $(el)
            })
          )
        });

        // Locations map
        if (this.$el.find('div.field.locations').length > 0) {
          self.siblings.push(
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
          self.siblings.push(
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
          self.siblings.push(
            new ContactPerson({
              el: self.$el.find('div.field.contact_person')
            })
          )
        }
          

        // Review errors!
        // Show errors if there is any...
        this.$el.find('div.field span.error').each(function(i,el) {
          self.siblings.push(
            new FieldError({
              el: $(el).closest('div.field')
            })
          )
        });
      },


      _validateBasicErrors: function() {
        var $name = this.$el.find('input#project_name')
          , $id = this.$el.find('input#project_id_in_organization');
        
        if ($name.val() == '') {
          this._setError($name, 'can\'t be blank');
          return false;
        } else {
          this._setError($name)
        }

        if ($id.val() == '') {
          this._setError($id, 'can\'t be blank');
          return false;
        } else {
          this._setError($id)
        }

        return true;
      },



      _onSubmitBasic: function(e) {
        e.preventDefault();

        if (!this._validateBasicErrors()) {  
          this._moveToError();
          return false;
        }

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
            .find('llabel:eq(0) em')
            .remove()
        }
      },

      _moveToError: function() {
        var pos = this.$el.find('div.field.error').offset().top;
        this.$el.closest('body').animate({
          scrollTop: (pos-20)
        },450);
      },


      clean: function() {
        // Clean siblings
        _.each(this.siblings, function(view) {
          view.clean();
        })

        // remove this view
        this.remove();
      },

      _onCancel: function(e) {
        e.preventDefault();
        this.trigger('close', this);
      }
    });

    // Trying to connect this (modal-form == shit) with the main view
    new_project = new NewProject();
  });