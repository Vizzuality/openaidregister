
  /**
   *  Projects collection
   */

  var ProjectsCollection = Backbone.Collection.extend({
    
    search : function(letters, status){
      if (letters == "" && status == "") return this;

      var pattern = new RegExp(letters,"gi");
      return _(this.filter(function(data) {

        if (status == '' && pattern.test(data.get("name"))) {
          return true;
        }

        if (status == data.get("status") && letters == '') {
          return true;
        }        

        if (status == data.get("status") && pattern.test(data.get("name"))) {
          return true;
        }        

        return false;
      }));
    }
  });