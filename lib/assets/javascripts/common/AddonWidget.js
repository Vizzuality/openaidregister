

  
  /**
   *  Addon item renderer
   */

  var ItemView = Backbone.View.extend({
    templates: {
      list:   '<li data-values="<%= values %>">\
                <div class="label">\
                  <% _.each(values.split(","),function(e,i) { %>\
                    <div class="column">\
                      <%= e %>\
                      <% if (i != (values.split(",").length - 1)) { %>\
                        <span class="sptor"></span>\
                      <% } %>\
                    </div>\
                  <% }) %>\
                </div>\
                <a href="#remove" class="button round grey remove">x</a>\
              </li>'
    },

    events: {
      'click a.remove': '_removeView'
    },

    initialize: function() {
      _.bindAll(this, '_removeView');
      this.template = _.template(this.templates.list);
    },
    
    render: function() {
      this.$el.html(this.template(this.model.toJSON()));
      return this;
    },

    _removeView: function(e) {
      e.preventDefault();
      this.model.destroy();
      this.remove();
    }
  });
  


  /**
   *  ADDON widget, default to extend
   */

  var AddonWidget = Backbone.View.extend({

    errors: {
      'targets' : 'There isn\'t any target specified',
      'select'  : 'Main select isn\'t specified',
      'add'     : 'Button/link should be specified'
    },

    templates: {
      'option': '<option value="<%= values %>" selected><%= values %></option>'
    },

    events: {
      "click .add": "_onClickAdd"
    },

    renderer: ItemView,
    
    initialize: function() {
      if (!this.options.targets || this.options.targets.length == 0) {
        throw(this.errors.targets)
      }

      if (!this.options.select) {
        throw(this.errors.select)
      }

      this.itemRenderer = _.extend(this.renderer, this.options.renderer);

      // Create option template
      this.template = _.template(this.templates.option);

      // Bind several functions
      _.bindAll(this, '_add', '_remove', '_onClickAdd');

      // Render necessary components
      this.render();

      // Init collection
      this._init();
    },

    render: function() {
      // Hide select
      $(this.options.select).hide();

      // Generate list
      this.$el.append($('<ul>').addClass('addons_list ' + this.options.fieldClass));
    },

    _setSelect: function() {
      // Reset select
      $(this.options.select).html('');

      // Fill it again with collection values
      var self = this;
      this.collection.each(function(m) {
        $(self.options.select).append(self.template(m.toJSON()));
      });
    },

    // Get value from a target (select, input[type="text"],...)
    _getValue: function(obj) {
      switch (obj.type) {
        // Select
        case 'select': 
          var data = this.$el.find(obj.selector).data('select2').data();
          return data.text;
          break;

        // Input(text)
        default: 
          return this.$el.find(obj.selector).val();
      }
    },

    // Set value to a target (select, input[type="text"],...) && Reset
    _setValue: function(obj, value) {
      switch (obj.type) {
        // Select
        case 'select': 
          this.$el.find(obj.selector).data('select2').data(null);
          break;

        // Input(text)
        default: 
          this.$el.find(obj.selector).val('');
      }
    },

  
    // EVENTS
    _onClickAdd: function(e) {
      if (e && e.preventDefault)
        e.preventDefault();

      // Check if targets have values
      var ready = true
        , values = []
        , self = this;

      _.each(this.options.targets, function(obj) {
        var value = self._getValue(obj);
        if (value != "") {
          values.push(value);
        } else {
          ready = false;
        }
      });

      if (ready) {
        // Add it to the collection
        this.collection.add({values: values.join(',')});
        
        // Reset targets
        _.each(this.options.targets, function(obj) {
          self._setValue(obj,null);
        });
      }
    },


    // COLLECTION ACTIONS
    _init: function() {
      // Create collection
      this.collection = new Backbone.Collection();

      // Collection bindings
      this.collection.bind('add',     this._add);
      this.collection.bind('remove',  this._remove);

      var self = this
        , collection = [];

      // Get values from the multiple select
      $(this.options.select).find('> option').each(function(i,e) {
        var data = { values: $(e).attr('value') };
        collection.push(data);
      });

      // Loop through the new collection to 
      // save it
      _.each(collection, function(data) {
        self.collection.add(data);
      });
    },

    _add: function(m) {
      // Create new item
      var itemView = new this.itemRenderer({ model: m });
      this.$el.find('ul.addons_list').prepend(itemView.render().el);

      // Save in the select to show collection changes
      this._setSelect();
    },

    _remove: function(model,collection,callback) {
      // Change select to show collection changes
      this._setSelect();
    },


    // CLEAN REFERENCES
    clean: function() {
      // Unbind remove collection
      this.collection.unbind('remove', this._remove);
      
      // Remove each collection model
      this.collection.each(function(m){
        m.remove();
      })

      // Remove collection
      delete this.collection;

      this.remove();
    }
  });