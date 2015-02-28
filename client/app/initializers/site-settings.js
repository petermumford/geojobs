export function initialize(container, application) {

	var store = container.lookup('store:main')
	var siteSettingsContainer = container.lookup('service:site-settings')
	// console.log(siteSettingsContainer.get('isReadOnly'));
  application.deferReadiness();

	Ember.$.getJSON(store.adapterFor('application').get('host') + "/site_settings")
		.done(function(json) {
			var results = json.site_settings;

			store.pushMany('jobType', results.job_types)

			application.advanceReadiness();
		})
		.fail(function(error) {
			// TODO need todo something if this fails
			application.advanceReadiness();
		});

}

export default {
  name: 'site-settings',
  after: 'site-settings-service',
  initialize: initialize
};
