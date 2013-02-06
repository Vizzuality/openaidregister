

  /**
   *  LOCATION MAP Widget
   *  It extends from AddonWidget
   */


  // Item renderer
  
  var LocationItemView = ItemView.extend({
    templates: {
      list:   '<li data-values="<%= values %>">\
                <div class="label">\
                  <%= text %>\
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
      scrollwheel:        false,
      mapTypeId:          google.maps.MapTypeId.ROADMAP
    },

    initialize: function() {
      AddonWidget.prototype.initialize.apply(this, arguments);

      _.bindAll(this, '_initMap', '_add', '_remove', '_onMapGeocoder', '_onMapClick', '_addNewPoint', '_addMarker');

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

    _addMarker: function(pos) {
      var marker = new google.maps.Marker({
        position: pos,
        map: this.map,
        icon: new google.maps.MarkerImage(
          '/assets/icons/marker.png',
          new google.maps.Size(22,22),
          new google.maps.Point(0,0),
          new google.maps.Point(11,11)
        )
      });
      return marker;
    },

    _removeMarker: function(marker) {
      marker.setMap(null);
      delete marker;
    },

    _onMapGeocoder: function(e) {
      var place = this.autocomplete.getPlace();
      if (place.geometry) {
        var location = place.geometry.location;
        this.map.panTo(location);

        this._addNewPoint({
          values: place.geometry.location.lat() + ',' + place.geometry.location.lng(),
          text: place.formatted_address
        });

        if (place.geometry.viewport) {
          this.map.fitBounds(place.geometry.viewport);
        } else {
          this.map.setZoom(12);
        }
      }

      return;
    },

    _onMapClick: function(e) {
      var position = e.latLng.lat().toFixed(6) + ',' + e.latLng.lng().toFixed(6);
      this._addNewPoint({
        values: position,
        text: position
      });
    },

    _addNewPoint: function(data) {
      // Position, text
      this.collection.add({values: data.values, text: data.text});
    },


    // COLLECTION ACTIONS
    _init: function() {
      // Create collection
      this.collection = new Backbone.Collection();

      // Collection bindings
      this.collection.bind('add',     this._add);
      this.collection.bind('remove',  this._remove);

      var self = this
        , collection = [];

      // Get values from the multiple select
      $(this.options.select).find('> option').each(function(i,e) {
        var data = { values: $(e).attr('value'), text: $(e).attr('text') };
        collection.push(data);
      });

      // Loop through the new collection to 
      // save it
      _.each(collection, function(data) {
        self.collection.add(data);
      });
    },

    _add: function(m) {
      // Create new item
      var itemView = new this.itemRenderer({ model: m });
      this.$el.find('ul.addons_list').prepend(itemView.render().el);

      // Add marker
      m.set(
        'marker',
        this._addMarker(
          new google.maps.LatLng(
            m.get('values').split(',')[0],
            m.get('values').split(',')[1]
          )
        )
      );
    },

    _remove: function(model,collection,callback) {
      // Remove marker
      this._removeMarker(model.get('marker'))
    },


    clean: function() {
      google.maps.event.clearListeners(this.map);
      google.maps.event.clearListeners(this.autocomplete);

      $('.pac-container').first().remove();
      $(this.map.getDiv()).remove();
      delete this.autocomplete;
      delete this.map;

      this.constructor.__super__.clean.apply(this);
    }
  });