import Ember from 'ember';

export default Ember.Route.extend({
  // model: function(params) {
  //   return this.store.find('job', {q: params.location});
  // },

  setupController: function (controller, model) {
  	this._super(controller, model);
  	controller.set('currentLocation', this.paramsFor(this.routeName));
	}
});
