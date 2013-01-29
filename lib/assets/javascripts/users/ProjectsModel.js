
  /**
   *  Projects model
   */

  var ProjectsModel = Backbone.Model.extend({
    defaults: {
      "state":    "outgoing",
      "name":     "wadus",
      "position": "0,0",
      "url":      ""
    }
  });