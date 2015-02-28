import DS from 'ember-data';
import RailsAttributesMixin from '../mixins/rails-attributes'

export default DS.ActiveModelSerializer.extend(DS.EmbeddedRecordsMixin, RailsAttributesMixin, {
	attrs: {
		companyLocations:{ embedded: 'always', railsAttr: true }
	}
});
