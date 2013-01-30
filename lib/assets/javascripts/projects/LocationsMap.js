

  /**
   *  LOCATION MAP Widget
   *  It extends from AddonWidget
   */


  // Item renderer
  
  var LocationItemView = ItemView.extend({
    templates: {
      list:   '<li data-values="<%= values %>">\
                <div class="label">\
                  (<% _.each(values.split(","),function(e,i) { %>\
                    <%= e %><% if (i != (values.split(",").length - 1)) { %>,<% } %>\
                  <% }) %>)\
                </div>\
                <a href="#remove" class="button round grey remove">x</a>\
              </li>'
    }
  });



  // Location addon widget

  var LocationsMap = AddonWidget.extend({
    errors: function(){
      return _.extend({},AddonWidget.prototype.errors,{
        'dom' : 'There is no locations_map DOM element in locations field'
      });
    },

    events: {
      "keydown input[type='text']": "_onKeyDown"
    },

    renderer: LocationItemView,

    map_options: {
      zoom:               1,
      center:             new google.maps.LatLng(30, 0),
      streetViewControl:  false,
      mapTypeId:          google.maps.MapTypeId.ROADMAP
    },

    initialize: function() {
      AddonWidget.prototype.initialize.apply(this, arguments);

      _.bindAll(this, '_initMap', '_add', '_remove', '_onClickAdd', '_onMapGeocoder', '_onMapClick');

      // Hack to prevent render correctly map due to
      // it appears with an effect
      setTimeout(this._initMap, 350);
    },

    _initMap: function() {
      if (this.$el.find('#locations_map').length < 1) {
        throw(this.errors.dom)
      }

      this.map = new google.maps.Map(this.$el.find('#locations_map')[0], this.map_options);

      // Initialize autocomplete.
      var geocomplete = this.$el.find('#geocomplete')[0];
      this.autocomplete = new google.maps.places.Autocomplete(geocomplete);

      google.maps.event.addListener(this.autocomplete,  'place_changed',  this._onMapGeocoder);
      google.maps.event.addListener(this.map,           'click',          this._onMapClick);
    },


    // EVENTS
    _onKeyDown: function(e) {
      var code = (e.keyCode ? e.keyCode : e.which);
      if (code == 13) {
        e.preventDefault();
        e.stopPropagation();
      }
    },

    _onMapGeocoder: function(e) {
      var place = this.autocomplete.getPlace();
      if (place.geometry) {
        var location = place.geometry.location;
        this.map.panTo(location);

        if (place.geometry.viewport) {
          this.map.fitBounds(place.geometry.viewport);
        } else {
          this.map.setZoom(12);
        }
      }

      return;
    },

    _onMapClick: function(e) {
      this.$el.find(this.options.targets[0].selector).val(e.latLng.lat() + ',' + e.latLng.lng());
      this._onClickAdd(e);
    },

    clean: function() {
      google.maps.event.clearListeners(this.map, 'click');
      google.maps.event.clearListeners(this.autocomplete, 'blur');
      google.maps.event.clearListeners(this.autocomplete, 'focus');
      google.maps.event.clearListeners(this.autocomplete, 'keydown');

      $('.pac-container').first().remove();
      $(this.map.getDiv()).remove();
      delete this.map;

      this.constructor.__super__.clean.apply(this);
    }
  });