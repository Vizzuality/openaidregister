  
  var CustomFieldset = Backbone.View.extend({

    events: {
      'click a.radio': '_onRadioClick'
    },

    templates: {
      'radio': '<a href="#<%= label %>" data-value="<%= value %>" class="radio"><%= label %></a>'
    },

    initialize: function() {
      _.bindAll(this, '_onRadioClick');
      this.template = _.template(this.templates.radio);
      this.render();
    },

    render: function() {

      var self = this;

      this.$el.find('div.radio').each(function(i,el) {

        var $label = $(el).find('label')
          , $input = $(el).find('input')
          , data = { label: $label.text(), value: $input.val() };

        $label.hide();
        $input.hide();

        $(el).append(self.template(data));
      })

      return this;
    },

    _onRadioClick: function(e) {
      e.preventDefault();
      var $radio    = $(e.target)
        , $content  = $radio.closest('div.radio')
        , $input    = $radio.siblings('input');

      if ($input.is(':checked')) return false;

      // Remove previous selected radio and input
      this.$el.find('div.radio.selected')
        .removeClass('selected')
        .find('input')
        .removeAttr('checked')

      // Set new one selected
      $content.addClass('selected')

      // Set checked to this input->radio
      $input.attr('checked','');
    },

    clean: function() {
      this.remove();
    }
  });