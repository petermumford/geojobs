import Ember from 'ember';

export default Ember.View.extend({
	tagName: 'li',
	context: Ember.computed.alias('content'),
	searchBox: Ember.computed.alias('parentView.parentView'),
	templateName: 'search-box/search-results-collection-item',
	selected: false,

	classNameBindings: [
		'selected'
	],

	registerOptionWithSearchBox: function() {
		this.get('searchBox').registerOption(this);
	}.on('willInsertElement'),

	unregisterOptionWithSearchBox: function() {
		this.get('searchBox').removeOption(this);
	}.on('willDestroyElement'),

	'is-select': function() {
		return this.get('selected') ? 'true' : null;
	}.property('selected'),

	onMouseEnter: function() {
		this.get('searchBox').selectOption(this);
	}.on('mouseEnter'),

	select: function() {
		this.set('selected', true);
	},

	deselect: function() {
		this.set('selected', false);
	},

	click: function(e) {
		this.get('searchBox').optionSelected(this.get('content'));
	}

});