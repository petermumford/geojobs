import Ember from 'ember';

export default Ember.Component.extend({
	model: null,

	didInsertJobModal: function() {
		// console.log(this);
	}.on('didInsertElement')

});
