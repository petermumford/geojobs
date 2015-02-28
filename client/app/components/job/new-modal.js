import Ember from 'ember';

export default Ember.Component.extend({
	model: null,

	actions: {
		submit: function() {
			var _this = this;

			if(this.get('model.errors')) {
				this.set('model.errors', null);
			}

			this.get('model.formObj').save().then( function(response) {
				console.log('success', response);
			}, function(error) {
				_this.set('model.errors', error.errors);
			});
		},

		cancel: function() {
			this.get('model.formObj').deleteRecord();
			this.sendAction('closeAction');
		}
	},

	didInsertJobModal: function() {
		// console.log(this.get('model.formObj'));
		// console.log(this);
	}.on('didInsertElement')

});
