import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
	this.resource('index', {path: '/'}, function () {
		this.route('location', {path: '/:location'});
		this.route('company', { path: '/company/:companySlug' });
    this.resource('job', function() {
    	this.route('index', {path: ':jobSlug'});
    	this.route('new');
    });
  });
});

export default Router;
