import Ember from 'ember';

export function renderModal(name, context, options) {
	// console.log( this, name, context, options );
	console.log(options);
	// return Ember.Handlebars.helpers.render.call(context, card.get('type'), 'card', options);
  return Ember.Handlebars.helpers.render.helperFunction.call(this, name, context, {helperName: name})
}

export default Ember.Handlebars.makeBoundHelper(renderModal);


// import Ember from 'ember';

// export function renderModal(callingContext, event, options) {
//   return Ember.Handlebars.helpers.render.call(callingContext, options);
// }
// export default Ember.Handlebars.makeBoundHelper(renderModal);