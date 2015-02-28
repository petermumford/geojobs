import Ember from 'ember';

export default Ember.Route.extend({
  renderTemplate: function(controller, model) {
    this.render('index/company', {
      outlet: 'company'
    })
  },

  setupController: function(controller, model) {
  	this._super(controller, model);
    var companySlug = parseInt(this.paramsFor(this.routeName).companySlug);

    this.store.findById('companyLocation', companySlug).then( function(response) {
    	controller.set( "model", response);
    });
  }
});