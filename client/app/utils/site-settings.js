import Ember from 'ember';

export default Ember.Object.extend({
	isReadOnly: 'yes it is!!',

	foo: function() {
		// testing
		return 'good morning'
	}
});
