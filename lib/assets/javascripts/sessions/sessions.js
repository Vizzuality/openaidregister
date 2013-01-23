

  /**
   *  Entry point for sessions (login and signup) view
   */


  $(function() {

    var Sessions = Backbone.View.extend({

      el: document.body,

      initialize: function() {
        this._initViews();
      },

      _initViews: function() {
        // Show errors if there is any...
        this.$el.find('div.field span.error').each(function(i,el) {
          $(el).closest('div.field').addClass('error');
        });

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
      }
    });

    var Sessions = new Sessions();
  });