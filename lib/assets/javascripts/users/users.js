

  /**
   *  Entry point for users view (Dashboard)
   */


  $(function() {

    var Users = Backbone.View.extend({

      events: {
        'click a.new':      '_addProject',
        'click a.profile':  '_openProfile'
      },

      el: document.body,

      initialize: function() {
        this._makeCollection();
        this._initViews();
        this._checkFirstTime();
      },

      _makeCollection: function() {
        // Generate collection
        var collection = this.collection = new ProjectsCollection();

        // Get list from view
        this.$el.find('ul#projects_list li').each(function(i,el){
          collection.add({
            name:       $(el).find('p.name').text(),
            status:     $(el).find('p.status').text(),
            positions:  $(el).data('positions'),
            url:        $(el).find('form').attr('action'),
            auth_token: $(el).find('form input[name="authenticity_token"]').val()
          });
        });
      },

      _initViews: function() {

        // Replace placeholders
        this.$el.find('input[placeholder]')
          .filter(function() {
            return this.type.match(/(email|password|text)/)
          })
          .each(function(i,el){
            new TextPlaceholder({
              el: $(el)
            })
          })

        // Projects map
        if (this.$el.find('section.map').length > 0)
          new ProjectsMap({
            el:         this.$el.find('section.map'),
            collection: this.collection
          });

        // Projects list
        if (this.$el.find('.inner.list').length > 0)
          new ProjectsList({
            el:         this.$el.find('.inner.list'),
            collection: this.collection
          });

        // Projects tools
        if (this.$el.find('div.publishing-tools').length > 0)
          new ProjectsTools({
            el:         this.$el.find('div.publishing-tools'),
            collection: this.collection
          })

        // Custom selects
        this.$el.find('select').not('select[multiple]').each(function(i,el){
          new CustomSelect({
            el: $(el)
          })
        });

        // Hints
        this.$el.find('span.hint').each(function(i,el){
          new FieldHint({
            el: $(el)
          });
        });

        // Show errors if there is any...
        this.$el.find('div.field span.error').each(function(i,el) {
          new FieldError({
            el: $(el).closest('div.field')
          })
        });

        // Signup? Let's create something great dude...
        if (this.$el.find('div.signup').length > 0)
          new SignupProcess({
            el: this.$el.find('section.sessions')
          })
      },

      _checkFirstTime: function() {
        // Shit but...
        if (newProjectFormPath) {
          setTimeout(function(){
            $('a.new').first().click()
          },500);
        }
      },

      _openProfile: function(e) {
        e.preventDefault();
        e.stopPropagation();

        var profile_modal = new ProfileModal({
          head: false,
          width: 737,
          url: $(e.target).attr('href'),
          loading_message: 'Loading you profile content...'
        });

        profile_modal.appendToBody();
        profile_modal.open();
      },

      _addProject: function(e) {
        e.preventDefault();
        e.stopPropagation();

        var ajax_modal = new AjaxModal({
          head: false,
          width: 737,
          collection: this.collection,
          url: $(e.target).attr('href'),
          loading_message: 'Loading content to create a new project...'
        });

        ajax_modal.appendToBody();
        ajax_modal.open();
      }
    });

    var users = new Users({
      new_register: newProjectFormPath
    });
  });