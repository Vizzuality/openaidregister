  
  var FieldHint = Backbone.View.extend({

    errors: {},

    templates: {
      hint: ' <div class="tooltip <%= title.replace(/ /g,"_") %>">\
                <a href="<%= url %>" class="small hint_url" target="_blank" tabIndex="-1">Know more</a>\
                <div class="field">\
                  <label><%= title %></label>\
                  <p class="small lighter margin5"><%= description %></p>\
                </div>\
                <% if (examples != "") { %>\
                  <div class="field margin10">\
                    <label>Value examples</label>\
                    <p class="small lighter margin5"><%= examples %></p>\
                  </div>\
                <% } %>\
                <span class="b"></span>\
              </div>'
    },

    initialize: function() {
      // Set template
      this.template = _.template(this.templates.hint);

      // Get hint label
      this.$label = this.$el.prev('label');

      // Render
      this.render();
    },

    render: function() {
      this.$el.append(this.template(this.$el.data()));
      return this;
    }
  });