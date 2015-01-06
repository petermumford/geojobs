import DS from 'ember-data';

export default DS.Model.extend({
  title: DS.attr('string'),
  position: DS.attr('number')
});
