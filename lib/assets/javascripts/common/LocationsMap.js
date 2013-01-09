  
  var LocationsMap = Backbone.View.extend({

    errors: {
      'dom' : 'There is no locations_map DOM element in locations field'
    },

    map_options: {
      zoom: 3,
      center: new google.maps.LatLng(0, 0),
      mapTypeId: google.maps.MapTypeId.ROADMAP
    },
    
    initialize: function() {
      this._renderList();
      this._initMap();
      this._initMapGeocoder();
    },

    _renderList: function() {

    },

    _initMap: function() {
      if (this.$el.find('#locations_map').length < 1) {
        throw(this.errors.dom)
      }

      this.map = new google.maps.Map(this.$el.find('#locations_map')[0], this.map_options);

      // Initialize autocomplete.
      var inputField = this.$el.find('#geocomplete')[0]
        , self = this;

      autocomplete = new google.maps.places.Autocomplete(inputField);
      google.maps.event.addListener(
          autocomplete, 'place_changed', function(e) {
        
        var place = autocomplete.getPlace();
        if (place.geometry) {
          var location = place.geometry.location;
          self.map.panTo(location);
          self.map.setZoom(12);
          // marker.setMap(map);
          // marker.setPosition(location);
        }
      });

      // google.maps.event.addListener(map, 'idle', function() {
      //   autocomplete.setBounds(map.getBounds());
      // });

      // var options = {
      //     map: "#locations_map"
      //   };
        
        //$("#geocomplete").geocomplete()
          // .bind("geocode:result", function(event, result){
          //   //$.log("Result: " + result.formatted_address);
          //   console.log("jamon1");
          // })
          // .bind("geocode:error", function(event, status){
          //   //$.log("ERROR: " + status);
          //   console.log("jamon2");
          // })
          // .bind("geocode:multiple", function(event, results){
          //   //$.log("Multiple: " + results.length + " results found");
          //   console.log("jamon3");
          // });
    },

    _initMapGeocoder: function() {
      //this.geocoder = 
    }
  })