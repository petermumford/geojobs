import Ember from 'ember';

export default Ember.Route.extend({

  model: function() {
    var newCompany = this.store.createRecord('company')
    var newCompanyLocation = this.store.createRecord('companyLocation')
    var newJob = this.store.createRecord('job')

    newCompanyLocation.get('jobs').pushObject(newJob);
    newCompany.get('companyLocations').pushObject(newCompanyLocation);

    return Ember.RSVP.hash({
      formObj: newCompany,
      errors: null,
      jobTypes: this.store.all('jobType')
    });
  },
  // setupController: function(controller, model) {s
  //   this._super(controller, model);
  //   controller.set('content', model);
  // },

  renderTemplate: function(controller, model) {
    controller.set('renderedComponent', 'job/new-modal');

    this.render('modal', {
      into: 'application',
      outlet: 'modal',
      controller: 'job/new'
    })
  },
  deactivate: function() {
    this.render('modal', {
      into: 'application',
      outlet: 'modal'
    });
  }

});
