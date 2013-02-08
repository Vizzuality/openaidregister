

  /**
   *  Loads a new form within other view
   *  - Save subform
   */


  var SubForm = Backbone.View.extend({

    spin_options: {
      lines: 11, length: 0, width: 4, radius: 7, corners: 1, rotate: 0, color: '#FFF',
      speed: 1, trail: 60, shadow: false, hwaccel: true, className: 'spinner', zIndex: 2e9,
      top: 'auto', left: 'auto', position: 'absolute'
    },

    events: {
      'click a.add_form':       '_onAddClick',
      'click a.destroy_item':   '_destroyItem',
      'click a.remove_item':    '_removeItem'
    },

    initialize: function() {
      _.bindAll(this, '_getContent', '_onFormLoaded', '_resetView', '_onAddClick', '_onFormSubmit', '_destroyItem', '_removeItem');
      
      this.spin = new Spinner(this.spin_options);
      this.subform;
    },

    render: function() {},

    _onAddClick: function(e) {
      e.preventDefault();
      e.stopPropagation();
      var $a = $(e.target)
        , url = $a.attr('href');
      this._getContent("GET", url, {});

      // Add loader
      $a.addClass('loading');
      this._createSpin($a, {top:10 , left:20})
    },

    _destroyItem: function(e) {
      e.preventDefault();
      e.stopPropagation();

      $.ajax({
        type: 'DELETE',
        url: $(e.target).attr('href')
      });

      this._removeItem(e);
    },

    _removeItem: function(e) {
      e.preventDefault();
      var $li = $(e.target).closest('li');
      $li.remove();
    },

    _onFormSubmit: function($form, subform) {
      var url = $form.attr('action');
      this._getContent($form.attr('method'), url, $form.serialize(), subform);
    },

    _getContent: function(type, url, data, subform) {
      var self = this;

      $.ajax({
        type: type,
        url: url,
        data: data,
        success: function(r) {
          if (subform) {
            self._appendResult(r)
          } else {
            self._appendForm(r)
          }
        },
        error: function(e) {
          alert("como va esto?");
        }
      })

    },

    _appendForm: function(subform) {
      // Clear previous subform
      if (this.subform) {
        var old_subform = this.subform;
        this._cleanSubform(old_subform);
      }

      // Listener to the new subform
      $('body').bind('subform_loaded', this._onFormLoaded)

      // Append new subform
      this.$('div.form').html(subform);

      // Active form
      this._activeForm();
    },

    _appendResult: function(li) {
      // Clean form
      if (this.subform) this.subform.clean();

      // Append new list, checking if there is empty field and removing it
      var $ul = this.$('ul.results');
      if ($ul.find('li.empty').length > 0) {
        $ul.html(li)
      } else {
        $ul.append(li)
      }

      // Active list
      this._activeList();
    },

    _activeList: function() {
      this.$('div.form').hide();
      this.$('a.add_form').show();
    },

    _activeForm: function() {
      this._removeSpin();
      this.$('div.form').show();
      this.$('a.button.add_form')
        .removeClass('loading')
        .hide();
    },

    _cleanSubform: function(subform) {
      this._unbindSubformEvents(subform);
      subform.clean();
    },

    _onFormLoaded: function(e, new_subform) {
      this.subform = new_subform;
      this._bindSubformEvents(new_subform);
      $('body').unbind('subform_loaded', this._onFormLoaded)
    },

    _resetView: function(e) {
      this._cleanSubform(this.subform);
      this._activeList();
    },

    _bindSubformEvents: function(subform) {
      subform.bind('submit_subform', this._onFormSubmit);
      subform.bind('cancel_subform', this._resetView);
    },

    _unbindSubformEvents: function(subform) {
      subform.unbind('submit_subform', this._onFormSubmit);
      subform.unbind('cancel_subform', this._resetView);
    },

    _createSpin: function($el, offset) {
      this._removeSpin();

      var $parent = $el.parent();

      $parent.css({ position: 'relative' })

      var pos = $el.position()
        , h_  = $el.outerHeight();

      $el.addClass('loading');

      this.spin.spin();
      $(this.spin.el).css({
        left: pos.left + ( offset ? offset.left : 0 ),
        top: pos.top + (h_/2) + ( offset ? offset.top : 0 )
      });

      
      $parent.append(this.spin.el);
    },

    _removeSpin: function() {
      if (this.spin) this.spin.stop();
    },

    clean: function() {
      if (this.subform)
        this._cleanSubform(this.subform);

      this._removeSpin();
      this.remove();
    }
  })