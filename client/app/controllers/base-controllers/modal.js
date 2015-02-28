import Ember from 'ember';

export default Ember.Controller.extend({
	needs: ['index/location'],
	locationCtrlBinding: 'controllers.index/location',
	renderedComponent: null,

	actions: {
		closeModal: function() {
			if(this.get('model.formObj.isDirty') === true) {
				this.get('model.formObj').deleteRecord();
			}
			if (this.get('locationCtrl.currentTransition')) {
				this.get('locationCtrl.currentTransition').retry();
			} else {
				this.transitionToRoute('application');
			}

		}
	}
});
