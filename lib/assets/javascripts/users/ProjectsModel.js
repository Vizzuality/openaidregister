
  /**
   *  Projects model
   */

  var ProjectsModel = Backbone.Model.extend({
    defaults: {
      "state":      "outgoing",
      "name":       "wadus",
      "positions":  [["0,0"]],
      "url":        "",
      "auth_token": ""
    }
  });