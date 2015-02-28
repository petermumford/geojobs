import Ember from 'ember';

export default Ember.Route.extend({
  beforeModel: function(transition) {
    this.controllerFor('index.location').set('currentTransition', transition);
  },

  setupController: function (controller, model) {
  	this._super(controller, model);
  	controller.set('currentLocation', this.paramsFor(this.routeName));
	}
});
