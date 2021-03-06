  
  /**
   *  Project item renderer
   */

  var ProjectsItem = Backbone.View.extend({
    
    events: {
      'click a':          '_editProject',
      'click form input': '_deleteProject'
    },

    tagName: 'li',

    templates: {
      item:   '<p class="name"><a href="<%= url %>/edit"><%= name %></a></p>\
              <p class="status <%= status %>"><%= status %></p>\
              <form action="<%= url %>" class="button_to" method="post">\
                <div>\
                  <input name="_method" type="hidden" value="delete" />\
                  <input type="submit" value="x" />\
                  <input name="authenticity_token" type="hidden" value="<%= auth_token %>" />\
                </div>\
              </form>'
    },

    render: function(data) {
      this.$el.html(this.template(this.model.toJSON()));
      this.$el.attr('data-positions', this.model.toJSON().positions)
      return this;
    },

    initialize: function(){
      _.bindAll(this, '_deleteProject');
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
    },

    clean: function() {
      this.remove();
    },

    _deleteProject: function(e) {
      e.stopPropagation();
      e.preventDefault();
      this.trigger('removed', this)
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
      "change select":            "_changeFilter",
      "click a.reset":            "_removeFilters"
    },

    templates: {
      empty: '<li class="empty">\
                <p class="darker bold bigger">Sorry, no <%= status %> projects found for your search <%= search == "" ? "" : "\'" + search + "\'" %></p>\
                <p class="light margin5">Try changing the search & filtering terms or <a href="#all" class="reset">exploring all projects</a>.</p>\
              </li>'
    },

    initialize : function(){
      _.bindAll(this, '_removeProject', '_addProject');

      this.search = '';
      this.status = '';
      this.children = [];

      this.confirmation = this._createConfirmation();

      this.empty_template = _.template(this.templates.empty);
      
      this.collection.bind("reset add remove", this.render, this);

      this.render(this.collection);
    },

    render : function(){
      this.$el.find("ul#projects_list").html('');

      // Remove actual children projects
      this._cleanChildren();

      // Get new projects
      var projects = this.collection.search(this.search, this.status);

      this._checkVisibility();

      if (projects.size() > 0) {
        projects.each(this._addProject);
      } else {
        this._showEmptyList();
      }
      
      this.collection.trigger('filtered', projects);

      return this;
    },

    _createConfirmation: function() {
      var confirmation = new ConfirmationTooltip({
        text: 'Delete this project?'
      });
      this.$el.append(confirmation.render());
      confirmation.$el.hide();
      return confirmation;
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

    _cleanChildren: function() {
      _.each(this.children, function(v) {
        v.clean();
      });

      this.children = [];
    },

    _addProject: function(p) {
      var view = new ProjectsItem({
        model:      p,
        collection: this.collection
      }).bind('removed', this._removeProject)

      this.$el.find("ul#projects_list").append(view.render().el);
      this.children.push(view);
    },

    _removeProject: function(view) {
      // Disable and unbind confirmation
      this.confirmation.disable();
      this.confirmation.unbind('confirmation');

      // Confirm please :)
      // Get position
      var position = view.$el.find('input[type="submit"]').position()
        , self = this;

      this.confirmation.active(position);

      this.confirmation.bind('confirmation', function(bool) {
        if (bool) {
          // Send request
          var $form = view.$el.find('form');
          $.ajax({ url: $form.attr('action'), data: $form.serialize(), type: 'DELETE'});

          self.collection.remove(view.model);
        }

        // Disable and unbind confirmation
        this.disable(true);
        this.unbind('confirmation');
      })
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
      this.render();
    },

    _changeFilter: function(e) {
      if (e && e.preventDefault)
        e.preventDefault();

      // Get value
      var status = (e.val == "All") ? '' : e.val;

      // If it is the same status, don't change anything
      if (this.status == status) return false;

      // Remove old status
      $(e.target).closest('div').find('a.selected').removeClass('selected');

      // Select new one
      $(e.target).addClass('selected');

      // Set new status
      this.status = status;

      // Render
      this.render();
    },

    _changeSearch: function(e){
      var value = this.$el.find("#projects_search").val();

      // Same value? Stop!
      if (this.search == value) return false;

      // New value in other case
      this.search = value;

      // Render as a bitch
      this.render();
    }
  });