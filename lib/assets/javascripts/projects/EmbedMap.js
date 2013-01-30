
  /**
   *  Open Aid embed map showing your projects
   */

  var EmbedMap = Backbone.View.extend({

    map_options: {
      zoom:               3,
      center:             new google.maps.LatLng(25, 0),
      panControl:         false,
      disableDefaultUI:   true,
      streetViewControl:  false,
      scrollwheel:        true,
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
      height: 49,
      width: 49,
      textColor: '#fff',
      textSize: 17
    }, {
      url: '/assets/icons/cluster3.png',
      height: 57,
      width: 57,
      textColor: '#fff',
      textSize: 17
    }],

    initialize: function() {
      _.bindAll(this, '_onMarkerClick');

      this._initMap();
      this._initClusterer();
      this._bindZoomControls();
      this._addLogo();
    },

    render: function() {},

    _initMap: function() {
      this.map = new google.maps.Map(this.$el.find('.map')[0], this.map_options);
      this.infowindow = new OpenAidInfowindow(this.map);
    },

    _initClusterer: function() {
      var markers = [];
      this.markerClusterer = new MarkerClusterer(this.map, markers, { styles: this.styles });
      this._changeClusterer(this.options.projects);
    },

    _changeClusterer: function(projects) {
      var self = this
        , bounds = new google.maps.LatLngBounds();

      for (var i in projects) {
        var project = projects[i];

        if (project.lon && project.lat) {
          var position = new google.maps.LatLng(project.lat,project.lon)
            , marker = new google.maps.Marker({
                position: position,
                data: project,
                icon: self.icon
              });

          google.maps.event.addListener(marker, 'click', function(latlng){
            self._onMarkerClick(this)
          });

          self.markerClusterer.addMarker(marker);
        }
      }

      setTimeout(function(){
        self.markerClusterer.fitMapToMarkers()
      }, 500);
    },

    _onMarkerClick: function(marker) {
      // Set infowindow content
      this.infowindow.setContent(marker.data);

      // Set infowindow latlng
      this.infowindow.setPosition(marker.getPosition());

      // Show it!
      this.infowindow.open();
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
    },

    clean: function() {
      this.$el.find('.zoom_in').unbind();
      this.$el.find('.zoom_out').unbind();

      self.markerClusterer.clearMarkers();

      $(this.map.getDiv()).remove();
      delete this.map;

      this.remove();
    }
  });