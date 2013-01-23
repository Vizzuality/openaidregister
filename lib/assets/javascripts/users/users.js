

  /**
   *  Entry point for users view (Dashboard)
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
        var collection = this.collection = new ProjectsCollection();

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
        var projects_map = new ProjectsMap({
          el:         this.$el.find('section.map'),
          collection: this.collection
        });

        // Projects list
        var projects_list = new ProjectsList({
          el:         this.$el.find('.inner.list'),
          collection: this.collection
        });

        // Projects tools
        var projects_tools = new ProjectsTools({
          el:         this.$el.find('div.publishing-tools'),
          collection: this.collection
        })
      }
    });

    var users = new Users();
  });