import Ember from 'ember';

export default Ember.Controller.extend({
  // queryParams: ['q'],
  needs: ['application'],
  newLocationBinding: 'controllers.application.newLocation',
  selectedCompanyLocation: null,

  onNewLocation: function() {
    var self=this;
    this.transitionToRoute('index.location', this.get('newLocation.place_name'));
  }.observes('newLocation'),

  actions: {
    addJob: function(e) {
      this.transitionToRoute('job.new');
    },
    selectedMarkerAction: function(e) {
      this.transitionToRoute('index.company', e.markerDetails.slug);
    },
    searchJobs: function(map) {
      var self=this;
      var bounds = map.bounds
      var boxString = [bounds.getSouth(), bounds.getWest(), bounds.getNorth(), bounds.getEast()].join(',');

      this.store.find('job', {bounds: boxString}).then(function(locations) {
        self.set('content', locations );
      });
    }
  }
});
