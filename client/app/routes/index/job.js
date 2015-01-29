import Ember from 'ember';

export default Ember.Route.extend({
  // model: function(params) {
  //   return this.store.find('job', params.job_id);
  // },
  renderTemplate: function() {
    this.render({
      into: 'application',
      outlet: 'modal'
    })
  },
  deactivate: function() {
    this.render('index.job', {
      into: 'application',
      outlet: 'modal'
    });
  }
	// actions: {
 //    closeModel: function() {
 //      this.transitionTo('user');
 //    }
 //  }
});
