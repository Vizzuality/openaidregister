

  /**
   *  CONTACT PERSON Widget
   */


  var ContactPerson = Backbone.View.extend({

    errors: {
      //'targets' : 'There isn\'t any target specified',
      //'select'  : 'Main select isn\'t specified',
      //'add'     : 'Button/link should be specified'
    },

    templates: {
      //'option': '<option value="<%= values %>" selected><%= values %></option>'
    },

    events: {
      //"click .add": "_onClickAdd"
    },
    
    initialize: function() {
      // if (!this.options.targets || this.options.targets.length == 0) {
      //   throw(this.errors.targets)
      // }

      // if (!this.options.select) {
      //   throw(this.errors.select)
      // }

      // this.itemRenderer = _.extend(this.renderer, this.options.renderer);

      // // Create option template
      // this.template = _.template(this.templates.option);

      // // Bind several functions
      // _.bindAll(this, '_add', '_remove', '_onClickAdd');

      // // Render necessary components
      // this.render();

      // // Init collection
      // this._init();
    },

    render: function() {
      // Hide select
      //$(this.options.select).hide();

      // Generate list
      //this.$el.append($('<ul>').addClass('addons_list ' + this.options.fieldClass));
    },

    clean: function() {
      //this.remove();
    }

  });