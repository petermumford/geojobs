import Ember from 'ember';
import RailsAttributesMixin from 'geojobs/mixins/rails-attributes';

module('RailsAttributesMixin');

// Replace this with your real tests.
test('it works', function() {
  var RailsAttributesObject = Ember.Object.extend(RailsAttributesMixin);
  var subject = RailsAttributesObject.create();
  ok(subject);
});
