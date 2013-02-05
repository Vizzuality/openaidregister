

  /**
   *  Confirmation tooltip
   */


  var ConfirmationTooltip = Backbone.View.extend({
    
    events: {
      'click a.ok':     '_onOkClick',
      'click a.cancel': '_onCancelClick',
      'click':          '_onTooltipClick'
    },

    templates: {
      tooltip: '<div class="confirmation_tooltip"><p class="center"><%= text %></p><p class="margin10 center"><a href="#ok" class="button round inverse upper small ok">yes</a><a href="#cancel" class="button round red small upper cancel">no</a><p><span class="b"></span></div>'
    },

    initialize: function() {
      this.template = _.template(this.templates.tooltip);
    },

    render: function() {
      this.$el.html(this.template(this.options));
      return this.$el;
    },

    _onCancelClick: function(e) {
      e.preventDefault();
      e.stopPropagation();
      this.trigger('confirmation', false);
    },

    _onOkClick: function(e) {
      e.preventDefault();
      e.stopPropagation();
      this.trigger('confirmation', true);
    },

    _onTooltipClick: function(e) {
      e.preventDefault();
      e.stopPropagation();
    }
  });