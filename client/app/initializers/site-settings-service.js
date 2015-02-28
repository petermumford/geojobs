export function initialize(container, application) {
  application.inject('component', 'siteSettingsService', 'service:site-settings');
  application.inject('controller', 'siteSettingsService', 'service:site-settings');
  application.inject('model', 'siteSettingsService', 'service:site-settings');
  application.inject('route', 'siteSettingsService', 'service:site-settings');
}

export default {
  name: 'site-settings-service',
  after: 'store',
  initialize: initialize
};
