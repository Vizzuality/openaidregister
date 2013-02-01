  
  var CustomFieldset = Backbone.View.extend({

    errors: {},

    events: {
      // 'active':     '_focusIn',
      // 'inactive':   '_focusOut'
    },

    templates: {
      'radio': '<a href="#<%= label %>" class="radio"><%= label %></a>'
    },

    defaults: {
      // placeholder:              '',
      // minimumResultsForSearch:  20
    },

    initialize: function() {
      // this.options = _.extend(this.defaults, this.options);
      // this._initSelect2();
      this.template = _.template(this.templates);
      this.render();
    },

    render: function() {

      // var self = this;

      // _.each(this.$el.find('div.radio'), function(i,el) {
      //   var data = {
      //     label 
      //   };

      //   $(el).append(self.template(data));
      // })

      return this;
    },

    // _initSelect2: function() {
    //   this.$el.select2({
    //     placeholder:              this.options.placeholder,
    //     minimumResultsForSearch:  this.options.minimumResultsForSearch
    //   })
    // },

    // _focusIn: function(e) {
    //   var select2 =  $(e.target).data('select2').container;
    //   $(select2).closest('.select_wrapper').addClass('focus')
    // },

    // _focusOut: function(e) {
    //   var select2 =  $(e.target).data('select2').container;
    //   $(select2).closest('.select_wrapper').removeClass('focus')
    // },

    clean: function() {
      //this.$el.select2("destroy");
      this.remove();
    }
  });