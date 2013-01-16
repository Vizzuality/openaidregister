  var ProjectsItem = Backbone.View.extend({
    
    events: {},

    templates: {
      item: '<li data-position="<%= position %>">\
              <p class="name"><a href="#yay"><%= name %></a></p>\
              <p class="status <%= status %>"><%= status %></p>\
            </li>'
    },

    render: function(data) {
      this.$el.html(this.template(this.model.toJSON()));
      return this;
    },

    initialize: function(){
      this.template = _.template(this.templates.item);
    }
  });




  
  var ProjectsView = Backbone.View.extend({
    
    events: {
      "keyup #projects_search":   "_changeSearch",
      "click .filter_selector a": "_changeFilter"
    },

    initialize : function(){
      this.search = '';
      this.status = '';

      this.collection.bind("reset", this.render, this);
    },

    render: function(data) {},

    renderList : function(projects){
      this.$el.find("ul#projects_list").html('');

      var self = this;

      projects.each(function(project){
        var view = new ProjectsItem({
          model: project,
          collection: this.collection
        });
        self.$el.find("ul#projects_list").append(view.render().el);
      });

      this.collection.trigger('filtered', projects);

      return this;
    },

    _changeFilter: function(e) {
      if (e && e.preventDefault)
        e.preventDefault();

      var status = $(e.target).attr('href').replace('#','');

      if (this.status == status) return false;

      $(e.target).closest('div').find('a.selected').removeClass('selected');

      $(e.target).addClass('selected');

      this.status = status;

      this.renderList(this.collection.search(this.search, this.status));
    },

    _changeSearch: function(e){
      this.search = this.$el.find("#projects_search").val();
    
      this.renderList(this.collection.search(this.search, this.status));
    }
  });