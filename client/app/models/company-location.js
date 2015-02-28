import DS from 'ember-data';

export default DS.Model.extend({
	title: DS.attr('string'),
	email: DS.attr('string'),
  city: DS.attr('string'),
  county: DS.attr('string'),
  country: DS.attr('string'),
  lat: DS.attr(''),
  lng: DS.attr(''),
  company: DS.belongsTo('company'),
  jobs: DS.hasMany('job', { async: true })
});
