import DS from 'ember-data';
// import EmberValidations from 'ember-validations';

export default DS.Model.extend({
  name: DS.attr('string'),
  email: DS.attr('string'),
  url: DS.attr('string'),
  logo: DS.attr('string'),
  slug: DS.attr('string'),
  companyLocations: DS.hasMany('companyLocation')

  // validations: {
  // 	name: {
  // 		presence: true,
  // 		length: { minimum: 5 }
  // 	},
  // 	email: {
  // 		presence: true
  // 	},
  // 	logo: {
  // 		presence: true
  // 	},
  // 	companyLocations: true
  // }

});
