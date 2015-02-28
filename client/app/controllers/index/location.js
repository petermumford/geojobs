import Ember from 'ember';

export default Ember.Controller.extend({
	needs: ['application'],
	locationParamBinding: 'controllers.application.locationParam',
  currentLocation: null,
  currentTransition: null,

  modelReloadNeeded: function() {
  	// console.log(this.get('siteSettingsService'));
  	// if (this.get('locationParam') === null) {
		this.set('locationParam', this.get('currentLocation.location'));
  	// };
  }.observes('currentLocation')
});
