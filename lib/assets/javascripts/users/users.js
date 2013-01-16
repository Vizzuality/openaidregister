

  /**
   *  Entry point for users view
   */


  $(function() {

    var Users = Backbone.View.extend({

      el: document.body,

      initialize: function() {
        this._makeCollection();
        this._initViews();
      },

      _makeCollection: function() {
        // Generate collection
        this.collection = collection = new ProjectsCollection();

        // Get list from view
        this.$el.find('ul#projects_list li').each(function(i,el){
          collection.add({
            name:     $(el).find('p.name').text(),
            status:   $(el).find('p.status').text(),
            position: $(el).data('position')
          });
        });
      },

      _initViews: function() {

        // Projects map
        var projectsMap = new ProjectsMap({
          el:         this.$('#projects_map'),
          collection: this.collection
        });


        // Projects view
        var projectsView = new ProjectsView({
          el:         this.el,
          collection: this.collection
        });
      }
    });

    var users = new Users();
  });