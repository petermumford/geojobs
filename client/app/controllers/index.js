import Ember from 'ember';

export default Ember.Controller.extend({
  // queryParams: ['q'],
  needs: ['application', 'location'],
  newLocationBinding: 'controllers.application.newLocation',
  currentLocationBinding: 'controllers.location.currentLocation.location',
  isQuickviewOpen: false,
  selectedCompanyLocation: null,

  onInit: function() {
    // console.log( this.get('newLocation') );
    this.transitionToRoute('location', this.get('newLocation').place_name);
  }.observes('newLocation'),

  modelReloadNeeded: function() {
    var self=this;
    this.store.find('job', {q: this.get('currentLocation')}).then(function(locations) {
      self.set('content', locations );
    });
  }.observes('currentLocation'),

  actions: {
    openQuickview: function (e) {
      self=this;
      // if (! this.get('isQuickviewOpen') ) {
        // var selectedCompanyLocation = this.store.all('companyLocation', 1);
        this.store.findById('companyLocation', e.companyLocationId).then( function (companyLocation) {
          self.set('selectedCompanyLocation', companyLocation);
        });
        // console.log( this.store.hasRecordForId('companyLocation', e.companyLocationId) );
        this.set('isQuickviewOpen', true);
      // };
    },
    closeQuickview: function () {
      this.set('isQuickviewOpen', false);
    }
  }
});
