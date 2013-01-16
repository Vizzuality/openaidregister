
  /**
   *  Entry point for new project view
   */


  $(function() {

    var NewProject = Backbone.View.extend({

      el: document.body,

      initialize: function() {
        this._initViews();
      },

      _initViews: function() {

        // Custom selects
        this.$el.find('select').not('select[multiple]').each(function(i,el){
          new CustomSelect({
            el: $(el)
          });
        });

        // Hints
        this.$el.find('a.hint').each(function(i,el){
          new FieldHint({
            el: $(el)
          });
        });

        // Locations map
        this.locationsMap = new LocationsMap({
          el:           this.$el.find('div.field.locations'),
          select:       '#locations_list',
          targets:      [{
                            type:     'input',
                            selector: '#location'
                          }
                        ],
          add:          '',
          fieldClass:   'locations'
        });

        // Sector addon widget
        this.addonWidget = new AddonWidget({
          el:           this.$el.find('div.field.sector'),
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
        });

        // Contact person
        this.contact = new ContactPerson({
          el: this.$el.find('div.field.contact_person')
        })

        // Review errors!
      }
    });

    var new_project = new NewProject();
  });