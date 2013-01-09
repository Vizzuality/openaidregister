
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
          el: this.$('div.field.locations')
        });
      }
    });

    var new_project = new NewProject();
  });