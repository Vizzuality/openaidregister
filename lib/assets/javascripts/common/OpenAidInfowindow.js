function OpenAidInfowindow(map) {
  this.latlng_ = null;
  this.offsetHorizontal_ = -100;
  this.width_ = 160;
  this.div_ = null;
  this.map_ = map;
  this.setMap(map);
}

OpenAidInfowindow.prototype = new google.maps.OverlayView();


OpenAidInfowindow.prototype.draw = function() {
  var me = this;

  var div = this.div_;
  if (!div) {
    div = this.div_ = document.createElement('DIV');
    div.className = "openaid_infowindow";

    div.innerHTML = '<a href="#close" class="close"></a>'+
                    '<div class="content">'+
                      '<h3></h3>'+
                      '<p class="small margin5"></p>'+
                    '</div>'+
                    '<div class="tail">'+
                      '<span class="border"></span>'+
                      '<span class="over"></span>'+
                    '</div>';

    var a = this.getElementsByClassName("close", div)[0];

    google.maps.event.addDomListener(a, 'click', function (ev) {
      ev.preventDefault ? ev.preventDefault() : ev.returnValue = false;
      me._hide();
    });

    google.maps.event.addDomListener(a, 'touchend', function (ev) {
      ev.preventDefault ? ev.preventDefault() : ev.returnValue = false;
      me._hide();
    });

    google.maps.event.addDomListener(div, 'touchstart', function (ev) {
      ev.preventDefault ? ev.preventDefault() : ev.returnValue = false;
    });

    google.maps.event.addDomListener(div, 'touchend', function (ev) {
      ev.preventDefault ? ev.preventDefault() : ev.returnValue = false;
    });

    google.maps.event.addDomListener(div, 'dblclick', function (ev) {
      ev.preventDefault ? ev.preventDefault() : ev.returnValue = false;
    });
    google.maps.event.addDomListener(div, 'mousedown', function (ev) {
      ev.preventDefault ? ev.preventDefault() : ev.returnValue = false;
      ev.stopPropagation ? ev.stopPropagation() : window.event.cancelBubble = true;
    });
    google.maps.event.addDomListener(div, 'mouseup', function (ev) {
      ev.preventDefault ? ev.preventDefault() : ev.returnValue = false;
    });
    google.maps.event.addDomListener(div, 'mousewheel', function (ev) {
      ev.stopPropagation ? ev.stopPropagation() : window.event.cancelBubble = true;
    });
    google.maps.event.addDomListener(div, 'DOMMouseScroll', function (ev) {
      ev.stopPropagation ? ev.stopPropagation() : window.event.cancelBubble = true;
    });

    var panes = this.getPanes();
    panes.floatPane.appendChild(div);

    div.style.opacity = 0;
  }

  this.setPosition();
};


OpenAidInfowindow.prototype.setContent = function(content){
  if (this.div_) {
    var div = this.div_;
    $(div).find('h3').text(content.name);
    $(div).find('p').text(content.start_date + " - " + content.end_date);
  }
};


OpenAidInfowindow.prototype.setPosition = function(latlng) {
  if (latlng) {
    this.latlng_ = latlng;
    // Adjust pan
    this._adjustPan();
  }

  if (this.div_) {
    var div = this.div_
      , pixPosition = this.getProjection().fromLatLngToDivPixel(this.latlng_);
    if (pixPosition) {
      div.style.width = this.width_ + 'px';
      div.style.left = (pixPosition.x + this.offsetHorizontal_) + 'px';
      var actual_height = - div.clientHeight;
      div.style.top = (pixPosition.y + actual_height - 15) + 'px';
    }
  }
};


OpenAidInfowindow.prototype.open = function(){
  this._show();
};


OpenAidInfowindow.prototype.close = function(){
  this._hide();
};


OpenAidInfowindow.prototype.destroy = function() {
  // Check if the overlay was on the map and needs to be removed.
  if (this.div_) {
    this.div_.parentNode.removeChild(this.div_);
    this.div_ = null;
  }
  this.setMap(null);
};


OpenAidInfowindow.prototype._hide = function() {
  if (this.div_) {
    var div = this.div_;
    $(div).animate({
      top: '+=' + 10 + 'px',
      opacity: 0
    }, 250, function() {
      div.style.visibility = "hidden";
    });
  }
};


OpenAidInfowindow.prototype._show = function() {
  if (this.div_) {
    var div = this.div_;
    div.style.opacity = 0;
    div.style.visibility = "visible";
    $(div).animate({
      top: '-=' + 10 + 'px',
      opacity: 1
    }, 250);
  }
};


OpenAidInfowindow.prototype._adjustPan = function() {
  var left = 0
    , top = 0
    , pixPosition = this.getProjection().fromLatLngToContainerPixel(this.latlng_)
    , container = this.map_.getDiv()
    , div_height = this.div_.clientHeight;

  if ((pixPosition.x - 65) < 0) {
    left = (pixPosition.x + this.offsetHorizontal_ - 20);
  }

  if ((pixPosition.x + 180) >= container.clientWidth) {
    left = (pixPosition.x + 180 - container.clientWidth);
  }

  if ((pixPosition.y - div_height) < 0) {
    top = (pixPosition.y - div_height - 50);
  }

  this.map_.panBy(left,top);
};


OpenAidInfowindow.prototype.getElementsByClassName = function(classname, node)  {
    if(!node) node = document.getElementsByTagName("body")[0];
    var a = [];
    var re = new RegExp('\\b' + classname + '\\b');
    var els = node.getElementsByTagName("*");
    for(var i=0,j=els.length; i<j; i++)
        if(re.test(els[i].className))a.push(els[i]);
    return a;
  }