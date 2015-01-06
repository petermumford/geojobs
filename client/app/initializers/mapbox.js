import Ember from 'ember';

var mapbox = Ember.Object.extend({
  config: {
  	divId: 'map',
    accessToken: 'pk.eyJ1IjoicGV0ZXJtdW1mb3JkIiwiYSI6ImJNWllhVWcifQ.xh5ebkciFazKrPHw5HjmDQ',
    tileLayer: 'petermumford.ki2eme1o',
    center: [42.35, -71.051],
    zoom: 10
  }
});

export default {
	name: 'globals',

  initialize: function (container, application) {
  	container.register('globals:mapbox', mapbox, { singleton: true });
  	application.inject('component', 'Mapbox', 'globals:mapbox');
  }
};

// import Ember from 'ember';

// var LeafletInit = Ember.Object.extend({
//   map: null,
//   initMap: function (options) {
//     var $container = Ember.$('<div/>'),
//       map;

//     options = options || {};

//     $container.attr('id', options.containerId || 'map');
//     map = L.map($container.get(0), {
//       center: new L.LatLng(41, -72),
//       zoom: 5
//     });

//     L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
//       attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
//     }).addTo(map);

//     this.set('map', map);
//     this.set('$container', $container);
//   }.on('init'),

//   attachTo: function ($el) {
//     var $container = this.get('$container'),
//       map = this.get('map');

//     $container.appendTo($el);
//     map.invalidateSize(true);
//   }
// });

// export default {
//   name: 'map',

//   initialize: function (container, application) {
//     container.register('leaflet:main', LeafletInit);
//     application.inject('view', 'leaflet', 'leaflet:main');
//   }
// };
