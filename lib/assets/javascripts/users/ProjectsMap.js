
  var ProjectsMap = Backbone.View.extend({

    events: {},

    errors: {},

    map_options: {
      zoom:               2,
      center:             new google.maps.LatLng(25, 0),
      panControl:         false,
      disableDefaultUI:   true,
      streetViewControl:  false,
      mapTypeId:          google.maps.MapTypeId.ROADMAP
    },

    icon: new google.maps.MarkerImage(
      '/assets/icons/marker.png',
      new google.maps.Size(22, 22),
      new google.maps.Point(0,0),
      new google.maps.Point(11,11)
    ),

    styles: [{
      url: '/assets/icons/cluster1.png',
      height: 39,
      width: 39,
      textColor: '#fff',
      textSize: 17
    }, {
      url: '/assets/icons/cluster2.png',
      height: 47,
      width: 47,
      textColor: '#fff',
      textSize: 17
    }, {
      url: '/assets/icons/cluster3.png',
      height: 55,
      width: 55,
      textColor: '#fff',
      textSize: 17
    }],

    initialize: function() {
      _.bindAll(this, '_changeClusterer');

      this._initMap();
      this._initClusterer();
      this._bindZoomControls();
      this._addLogo();

      this.collection.bind('filtered', this._changeClusterer);
    },

    render: function() {},

    _initMap: function() {
      this.map = new google.maps.Map(this.$el.find("#projects_map")[0], this.map_options);
    },

    _initClusterer: function() {
      var markers = [];
      this.markerClusterer = new MarkerClusterer(this.map, markers, { styles: this.styles });

      if (this.collection.length > 0) {
        this._changeClusterer(this.collection);
      } else {
        this._showEmptyWindow();
      }
    },

    _showEmptyWindow: function() {
      this.$el.find('div.empty_map').show();
    },

    _hideEmptyWindow: function() {
      this.$el.find('div.empty_map').hide();
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
            ),
            icon: self.icon
          })
        )
      });
    },

    _bindZoomControls: function(e) {
      var self = this;
      this.$el.find('.zoom_in').click(function(e){
        e.preventDefault();
        self.map.setZoom(self.map.getZoom() + 1);
      });

      this.$el.find('.zoom_out').click(function(e){
        e.preventDefault();
        self.map.setZoom(self.map.getZoom() - 1);
      });
    },

    _addLogo: function() {
      var container     = this.map.getDiv()
        , cartodb_link  = document.createElement("a"); 

      cartodb_link.setAttribute('id','cartodb_logo');
      container.appendChild(cartodb_link);
      
      setTimeout(function() {
        cartodb_link.setAttribute('style',"position:absolute; bottom:0; left:0; display:block; border:none; z-index:10000;");
        cartodb_link.setAttribute('href','http://www.cartodb.com');
        cartodb_link.setAttribute('target','_blank');
        var protocol = location.protocol.indexOf('https') === -1 ? 'http': 'https';
        cartodb_link.innerHTML = "<img src='" + protocol + "://cartodb.s3.amazonaws.com/static/new_logo.png' style='position:absolute; bottom:7px; left:70px; display:block; border:none; outline:none' alt='CartoDB' title='CartoDB' />";
      },0);
    }
  });