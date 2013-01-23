
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

        // Embed map?
        if (this.$el.find('#embed_map').length > 0 && projects)
          this.embedMap = new EmbedMap({
            el:           this.$el.find('#embed_map'),
            projects:     projects
          });

        // Custom selects
        this.$el.find('select').not('select[multiple]').each(function(i,el){
          new CustomSelect({
            el: $(el)
          });
        });

        // Hints
        this.$el.find('span.hint').each(function(i,el){
          new FieldHint({
            el: $(el)
          });
        });

        // Locations map
        if (this.$el.find('div.field.locations').length > 0)
          this.locationsMap = new LocationsMap({
            el:           this.$el.find('div.field.locations'),
            select:       '#locations_list',
            targets:      [{
                            type:     'input',
                            selector: '#location'
                          }],
            add:          '',
            fieldClass:   'locations'
          });

        // Sector addon widget
        if (this.$el.find('div.field.sector').length > 0)
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
        if (this.$el.find('div.field.contact_person').length > 0)
          this.contact = new ContactPerson({
            el: this.$el.find('div.field.contact_person')
          })

        // Review errors!
      }
    });

    var new_project = new NewProject();
  });