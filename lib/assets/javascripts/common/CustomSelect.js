  
  var CustomSelect = Backbone.View.extend({

    errors: {},

    events: {
      'active':     '_focusIn',
      'inactive':   '_focusOut'
    },

    defaults: {
      placeholder:              '',
      minimumResultsForSearch:  20
    },

    initialize: function() {
      this.options = _.extend(this.defaults, this.options);
      this._initSelect2();
    },

    _render: function() {},

    _initSelect2: function() {
      this.$el.select2({
        placeholder:              this.options.placeholder,
        minimumResultsForSearch:  this.options.minimumResultsForSearch
      })
    },

    _focusIn: function(e) {
      var select2 =  $(e.target).data('select2').container;
      $(select2).closest('.select_wrapper').addClass('focus')
    },

    _focusOut: function(e) {
      var select2 =  $(e.target).data('select2').container;
      $(select2).closest('.select_wrapper').removeClass('focus')
    },

    clean: function() {
      this.$el.select2("destroy");
      this.remove();
    }
  });