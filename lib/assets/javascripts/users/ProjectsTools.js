/**
   *  Projects tools view
   *  - Exports or share projects
   *  - If there isn't any project, disable it
   */
  
  var ProjectsTools = Backbone.View.extend({
    
    events: {
      "click a.export": "_openExport",
      "click a.share":  "_openShare"
    },

    initialize : function() {
      this.collection.bind("reset", this.render, this);
      this.enabled = false;
      this.render();
    },

    render : function() {
      if (this.collection.size() > 0) {
        this._enableTools();
      } else {
        this._disableTools();
      }

      return this;
    },

    _disableTools: function() {
      this.enabled = false;
      this.$el.find('a').addClass('disabled');
    },

    _enableTools: function() {
      this.enabled = true;
      this.$el.find('a').removeClass('disabled');
    },

    _openExport: function(e) {
      e.preventDefault();
      e.stopPropagation();
      
      if (!this.enabled) return false;

      // Open export window
      var share_dialog = new ExportDialog({
        head: true,
        title: 'EXPORT PROJECTS DATA',
        width: 550,
        modal_type: '',
        modal_class: ''
      });

      share_dialog.appendToBody();
      share_dialog.open();
    },

    _openShare: function(e) {
      e.preventDefault();
      e.stopPropagation();
      
      if (!this.enabled) return false;

      // Open share window
      var share_dialog = new ShareDialog({
        head: true,
        title: 'SHARE YOUR PROJECTS',
        width: 550,
        modal_type: '',
        modal_class: '',
        url: $(e.target).attr('href')
      });

      share_dialog.appendToBody();
      share_dialog.open();
    }
  });