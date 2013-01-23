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
      if (!this.enabled) return false;

      // Open export window
    },

    _openShare: function(e) {
      e.preventDefault();
      if (!this.enabled) return false;

      // Open share window
    }
  });