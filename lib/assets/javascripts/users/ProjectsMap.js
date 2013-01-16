
  var ProjectsMap = Backbone.View.extend({

    events: {},

    errors: {},

    map_options: {
      zoom:               2,
      center:             new google.maps.LatLng(25, 0),
      panControl:         false,
      zoomControlOptions: {
        style: google.maps.ZoomControlStyle.SMALL
      },
      streetViewControl:  false,
      mapTypeId:          google.maps.MapTypeId.ROADMAP
    },

    initialize: function() {
      _.bindAll(this, '_changeClusterer');

      this._initMap();
      this._initClusterer();

      this.collection.bind('filtered', this._changeClusterer);
    },

    render: function() {

    },

    _initMap: function() {
      this.map = new google.maps.Map(this.$el[0], this.map_options);
    },

    _initClusterer: function() {
      var markers = [];

      this.markerClusterer = new MarkerClusterer(this.map, markers);
    },

    _resetClusterer: function() {
      if (this.markerClusterer)
        this.markerClusterer.clearMarkers();
    },

    _changeClusterer: function(projects) {
      this._resetClusterer();

      var self = this;

      projects.each(function(project){
        self.markerClusterer.addMarker(
          new google.maps.Marker({
            position: new google.maps.LatLng(
              project.get('position').split(',')[0],
              project.get('position').split(',')[1]
            )
          })
        )
      });
    }
  });