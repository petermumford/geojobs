import SiteSettings from '../utils/site-settings'

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

	// register our logger
  application.register('site-settings:main', SiteSettings);
  // inject siteSettings
  application.inject('component', 'siteSettings', 'site-settings:main');
  application.inject('controller', 'siteSettings', 'site-settings:main');
  application.inject('model', 'siteSettings', 'site-settings:main');
  application.inject('route', 'siteSettings', 'site-settings:main');
}

export default {
  name: 'site-settings',
  after: 'store',
  initialize: initialize
};
