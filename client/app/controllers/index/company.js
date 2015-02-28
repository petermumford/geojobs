import Ember from 'ember';

export default Ember.Controller.extend({
	needs: ['index/location', 'application'],
	locationCtrlBinding: 'controllers.index/location',
	animateViewIn: false,

	actions: {
		closeCompanyView: function () {
			this.get('locationCtrl.currentTransition').retry();
		},
	}
});