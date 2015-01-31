import Ember from 'ember';

export default Ember.TextField.extend({
	classNames: [
		'search-box-input'
	],

	searchBox: Ember.computed.alias('parentView'),

	registerTextFieldWithSearchBox: function() {
		this.get('searchBox').registerTextFieldComponent(this);
	}.on('willInsertElement')
});