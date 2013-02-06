

  /**
   *  Confirmation tooltip
   */

  var ConfirmationTooltip = Backbone.View.extend({
    
    events: {
      'click a.ok':     '_onOkClick',
      'click a.cancel': '_onCancelClick',
      'click':          '_onTooltipClick'
    },

    className: 'confirmation_tooltip',

    templates: {
      tooltip: '<p class="center"><%= text %></p><p class="margin10 center"><a href="#ok" class="button round inverse upper small ok">yes</a><a href="#cancel" class="button round red small upper cancel">no</a><p><span class="b"></span>'
    },

    initialize: function() {
      _.bindAll(this, '_onCancelClick', '_onOkClick');
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
    },

    active: function(pos) {
      var $tooltip = this.$el;
      
      $('body').on('click', this._onCancelClick);

      var h_ = $tooltip.outerHeight();

      $tooltip.css({
          top: pos.top - 5 - h_,
          right: -25,
          marginTop: 10,
          display: 'block',
          opacity:0
        })
        .animate({
          marginTop:0,
          opacity:1
        }, 300);
    },

    disable: function(animation) {
      var $tooltip = this.$el;
      $('body').off('click', this._onCancelClick);
      
      $tooltip.animate({
          marginTop:10,
          opacity:0
        }, (animation ? 200 : 0), function() {
         $(this).hide();
      });
    }
  });