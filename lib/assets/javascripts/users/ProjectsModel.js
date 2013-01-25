
  /**
   *  Projects model
   */

  var ProjectsModel = Backbone.Model.extend({
    default: {
      state:    "outgoing",
      name:     "",
      position: "0,0",
      url:      ""
    }
  });