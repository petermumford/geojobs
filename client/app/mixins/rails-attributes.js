import Ember from 'ember';

export default Ember.Mixin.create({

	keyForAttribute: function(attr) {
		// console.log(this.get('attrs'));
		var option = this.attrsOption(attr);
		if (option && option.railsAttr === true) {
			attr = attr + "Attributes";
		}

		return this._super(attr);
	}

});
