import Ember from 'ember';

export default Ember.Component.extend({
	queryParam: Em.computed.alias('query'),
	store: null,
	map: null,
	markers: null,

	actions: {
		moveMap: function	() {
			// var map = this.get('leaflet').get('map');
			this.get('map').panTo([42.35, -71.551]);
		},
		getBounds: function () {
			// var map = this.get('leaflet').get('map');
			alert( this.get('map').getBounds().toBBoxString() );
		}
	},

	initMapBox: function() {
		var map, self=this;
		L.mapbox.accessToken = this.Mapbox.config.accessToken;
		map = L.mapbox.map(this.Mapbox.config.divId, this.Mapbox.config.tileLayer)
									.setView(this.Mapbox.config.center, this.Mapbox.config.zoom);

		map.on('moveend', function(e) {
			self.refreshMarkers();
		});

		this.set('map', map);

		this.currentQueryParam();
	}.on('didInsertElement'),

	currentQueryParam: function() {
    this.changeMapPosition(this.get('queryParam'));
  }.observes('queryParam'),

  refreshMarkers: function() {
		// var bounds = self.get('map').getBounds();
		var host = this.get('store').adapterFor('application').get('host');
		var markerUrl = [ host, 'jobs/markers' ].join('/');
		var bounds = this.get('map').getBounds();
		var boxString = [bounds.getSouth(), bounds.getWest(), bounds.getNorth(), bounds.getEast()].join(',');

		this.set('markers', Ember.ObjectProxy.extend(Ember.PromiseProxyMixin).create({
			promise: Ember.$.getJSON(markerUrl, {bounds: boxString})
		}));
		// self.get('markers').set('promise', Ember.$.getJSON(markerUrl, {bounds: 'hello'}));
	  // var marker;
	  // marker = L.marker(result.latlng);
	  // return marker.addTo(map);
  },

  drawMarkers: function() {
		var layerIndex = 0, self=this, markers=this.get('markers'), map = this.get('map');
		var markerCluster = new L.MarkerClusterGroup();

		map.eachLayer(function(layer) {
			if (layerIndex === 0) {
				layerIndex++;
				return;
			}
			map.removeLayer(layer);
			layerIndex++;
		});

  	if(markers.get('length') > 0) {
			markers.get('content').forEach( function(m) {
				var marker, anchorHeight, markerHtml = '';
				// anchorHeight = (28 * m.jobs.length) + 7;
				// m.jobs.forEach( function(j) {
				// 	markerHtml += '<li><div>'+j.title+'</div></li>';
				// })
				marker = L.marker([m.lat, m.lng], {
					icon: L.AwesomeMarkers.icon({
						icon: '',
						markerColor: 'darkblue',
						prefix: 'fa',
						html: m.jobs.length
					})
					// icon: L.divIcon({
					// 	className: 'marker-stack',
					// 	iconSize: null,
					// 	iconAnchor:[43, anchorHeight],
					// 	html: '<ul>'+markerHtml+'</ul>'
					// })
				});
				// marker.addTo( map );
				markerCluster.addLayer(marker);
			});

			map.addLayer(markerCluster);
		};
  }.observes('markers.content.[]'),

  changeMapPosition: function(address) {
    var geocoder = L.mapbox.geocoder('mapbox.places'), self=this;

    if (address) {
			geocoder.query(address, function(error, result) {
				self.get('map').setView(result.latlng, self.Mapbox.config.zoom);
			});
    }
  }

});
