import Ember from 'ember';
import SearchResultsCollectionItem from './search-results-collection-item';

export default Ember.CollectionView.extend({
	tagName: 'ul',
	classNames: ['search-results'],
	itemViewClass: SearchResultsCollectionItem,

	// setFocus: function() {
	// 	console.log('set focus');
	//   // brings the view into focus in order to capture keyUps.
	//   // there are a few ways to handle this, this is just one.
	//   return this.$().attr({ tabindex: 1 }), this.$().focus();
	// }.on('didInsertElement'),

	// handleKeyPress: function() {
	// 	console.log('hello');
	// }.on('keyDown')
});