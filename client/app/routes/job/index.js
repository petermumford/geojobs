import Ember from 'ember';

export default Ember.Route.extend({
  // Lets make 'slug' attr the default for
  // job_slug param in the routes
  // the 'id' attr will now be the 'slug' attr
  // this helps with the link_to helper
  serialize: function(model) {
    return {
      jobSlug: model.get('slug')
    };
  },

  setupController: function(controller, model) {
    var jobId = parseInt(this.paramsFor(this.routeName).jobSlug);
    controller.set( "model", this.store.findById('job', jobId));
  },

  renderTemplate: function(controller, model) {
    controller.set('renderedComponent', 'job/show-modal');

    this.render('modal', {
      into: 'application',
      outlet: 'modal',
      controller: 'job/index'
    })
  },
  deactivate: function() {
    this.render('modal', {
      into: 'application',
      outlet: 'modal'
    });
  }
});
