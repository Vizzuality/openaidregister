  
  /**
   *  Project item renderer
   */

  var ProjectsItem = Backbone.View.extend({
    
    events: {
      'click a': '_editProject'
    },

    tagName: 'li',

    templates: {
      item: '<p class="name"><a href="<%= url %>"><%= name %></a></p><p class="status <%= status %>"><%= status %></p>'
    },

    render: function(data) {
      this.$el.html(this.template(this.model.toJSON()));
      this.$el.attr('data-position', this.model.toJSON().position)
      return this;
    },

    initialize: function(){
      this.template = _.template(this.templates.item);
    },

    _editProject: function(e) {
      e.preventDefault();
      e.stopPropagation();

      var ajax_modal = new AjaxModal({
        head: false,
        width: 737,
        url: $(e.target).attr('href'),
        loading_message: 'Loading content to edit a the project...'
      });

      ajax_modal.appendToBody();
      ajax_modal.open();
    }
  });



  /**
   *  Projects list view
   *  - Checks if there is any project associated
   *  - Show the projects list applying any kind of filter or search
   */
  
  var ProjectsList = Backbone.View.extend({
    
    events: {
      "keyup #projects_search":   "_changeSearch",
      "click .filter_selector a": "_changeFilter",
      "click a.reset":            "_removeFilters"
    },

    templates: {
      empty: '<li class="empty">\
                <p class="darker bold bigger">Sorry, no <%= status %> projects found for your search <%= search == "" ? "" : "\'" + search + "\'" %></p>\
                <p class="light margin5">Try changing the search & filtering terms or <a href="#all" class="reset">exploring all projects</a>.</p>\
              </li>'
    },

    initialize : function(){
      this.search = '';
      this.status = '';
      this.empty_template = _.template(this.templates.empty);
      this.collection.bind("reset", this.render, this);
      this.render(this.collection);
    },

    render : function(projects){
      this.$el.find("ul#projects_list").html('');

      var self = this;

      this._checkVisibility();

      if (projects.size() > 0) {
        projects.each(function(project){
          var view = new ProjectsItem({
            model: project,
            collection: this.collection
          });
          self.$el.find("ul#projects_list").append(view.render().el);
        });
      } else {
        this._showEmptyList();
      }
      
      this.collection.trigger('filtered', projects);

      return this;
    },

    _checkVisibility: function() {
      if (this.collection.size() > 0) {
        this.$el.show();
      } else {
        this.$el.hide();  
      }
    },

    _showEmptyList: function() {
      var template = this.empty_template({
        search: this.search,
        status: this.status
      });

      this.$el.find("ul#projects_list").append(template);
    },

    _removeFilters: function(e) {
      // Reset search
      this.$el.find("#projects_search").val('');
      this.search = '';

      // Reset filter
      this.$el.find(".filter_selector a.selected")
        .removeClass('selected')
        .parent()
        .find('a[href="#"]')
        .addClass('selected');

      this.status = '';
      this.render(this.collection.search(this.search, this.status));
    },

    _changeFilter: function(e) {
      if (e && e.preventDefault)
        e.preventDefault();

      // Get value
      var status = $(e.target).attr('href').replace('#','');

      // If it is the same status, don't change anything
      if (this.status == status) return false;

      // Remove old status
      $(e.target).closest('div').find('a.selected').removeClass('selected');

      // Select new one
      $(e.target).addClass('selected');

      // Set new status
      this.status = status;

      // Render
      this.render(this.collection.search(this.search, this.status));
    },

    _changeSearch: function(e){
      var value = this.$el.find("#projects_search").val();

      // Same value? Stop!
      if (this.search == value) return false;

      // New value in other case
      this.search = value;

      // Render as a bitch
      this.render(this.collection.search(this.search, this.status));
    }
  });