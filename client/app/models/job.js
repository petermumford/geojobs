import DS from 'ember-data';

export default DS.Model.extend({
  title: DS.attr('string'),
  description: DS.attr('string'),
  slug: DS.attr('string'),
  featured: DS.attr('boolean'),
  created_at: DS.attr('date'),
  jobType: DS.belongsTo('jobType'),
  companyLocation: DS.belongsTo('companyLocation')
});
