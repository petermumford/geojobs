import Ember from 'ember';
import customMarker from '../helpers/custom-marker'

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
		// console.log(this.get('markers').all('job').get('firstObject.title'));
		// console.log(this.get('queryParam'));
		var map, self=this;
		L.mapbox.accessToken = this.Mapbox.config.accessToken;
		map = L.mapbox.map(this.Mapbox.config.divId, this.Mapbox.config.tileLayer)
									.setView(this.Mapbox.config.center, this.Mapbox.config.zoom);

		map.on('moveend', function(e) {
			self.refreshMarkers();
			// var bounds = self.get('map').getBounds();
			// var boxString = [bounds.getSouth(), bounds.getWest(), bounds.getNorth(), bounds.getEast()].join(',');
			// console.log(boxString);
			// self.sendAction('refreshMarkers', {
			// 	boundingBox: boxString
			// });
		});

		this.set('map', map);
		this.currentQueryParam();
	}.on('didInsertElement'),

  onInit: function() {
    this.get('map').setView(this.get('newLocation').center.reverse(), this.Mapbox.config.zoom);
  }.observes('newLocation'),

	currentQueryParam: function() {
    this.changeMapPosition(this.get('queryParam'));
  },//.observes('queryParam'),

  refreshMarkers: function() {
		// var bounds = self.get('map').getBounds();
		var host = this.get('store').adapterFor('application').get('host');
		var markerUrl = [ host, 'jobs/markers' ].join('/');
		var bounds = this.get('map').getBounds();
		var boxString = [bounds.getSouth(), bounds.getWest(), bounds.getNorth(), bounds.getEast()].join(',');

		// this.sendAction('refreshMarkers', {
		// 	boundingBox: boxString
		// });
		this.set('markers', Ember.ObjectProxy.extend(Ember.PromiseProxyMixin).create({
			promise: Ember.$.getJSON(markerUrl, {bounds: boxString})
		}));
  },

  drawMarkers: function() {
  	// console.log( this.get('markers') );
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
				marker = new customMarker([m.lat, m.lng], {
					company_location_id: m.id,
					icon: L.AwesomeMarkers.icon({
						icon: '',
						markerColor: 'darkblue',
						prefix: 'fa',
						html: m.jobs_count
					})
					// icon: L.divIcon({
					// 	className: 'marker-stack',
					// 	iconSize: null,
					// 	iconAnchor:[43, anchorHeight],
					// 	html: '<ul>'+markerHtml+'</ul>'
					// })
				});
				marker.on('click', function(e) {
					self.sendAction('toggleQuickview', {
						companyLocationId: e.target.options.company_location_id
					});
				})
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
