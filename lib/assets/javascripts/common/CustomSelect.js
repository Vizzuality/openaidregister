  
  var CustomSelect = Backbone.View.extend({

    errors: {},

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
      var $select = this.$el.select2({
        placeholder:              this.options.placeholder,
        minimumResultsForSearch:  this.options.minimumResultsForSearch
      })
    }
  });