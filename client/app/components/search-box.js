import Ember from 'ember';
import customMarker from '../helpers/custom-marker'

export default Ember.Component.extend({
	isOpen: false,
	searchText: null,
	searchResults: [],
	options: [],
	selectedOption: null,
	attributeBindings: [
    'is-open'
  ],
  classNames: [
  	'search-box'
  ],
  keyMap: {
  	27: 'close', /* esc */
    40: 'selectNext', /* down */
    38: 'selectPrevious', /*up*/
    13: 'selectOnEnter' /*enter*/
  },

  'is-open': function() {
    return this.get('isOpen') ? 'true' : null;
  }.property('isOpen'),

  open: function() {
    if (this.get('isOpen')) return;
    this.set('isOpen', true);
  },

  close: function() {
    if (!this.get('isOpen')) return;
    this.set('isOpen', false);

		if (this.get('selectedOption')) {
			this.get('selectedOption').deselect();
			this.set('selectedOption', null);
		};
  },

  handleKeydown: function(event) {
    var map = this.get('keyMap');
    var method = map[event.keyCode];
    if (this[method]) {
      return this[method](event);
    }
  }.on('keyDown'),

	setSearchResults: function() {
		var self=this;
		var searchText = encodeURIComponent( this.get('searchText') );
		var url = 'http://api.tiles.mapbox.com/v4/geocode/mapbox.places/'+
							 searchText +
							 '.json?access_token='+
							 this.Mapbox.config.accessToken;

		Ember.$.getJSON(url).then(function(data) {
			self.set('searchResults', data.features);
		});
	},

	searchTextChanged: function() {
    this.open();

		if (this.get('searchText.length') < 3) {
			this.set('searchResults', []);
			return;
		}

		Ember.run.debounce(this, this.setSearchResults, 500);
	}.observes('searchText'),

	onFocusIn: function() {
		if ((this.get('options.length') > 0) && (this.get('searchText.length') > 3)) {
			this.open();
		};
	}.on('focusIn'),

	onFocusOut: function() {
		// console.log('hello 1');
		// Ember.run.later(this, function() {
			if (!this.get('selectedOption')) {
				this.close();
		// 	// 	this.get('selectedOption').deselect();
		// 	// 	this.set('selectedOption', null);
			};
		// 	this.close();
		// }, 20);
		// this.close();
	}.on('focusOut'),

	//
	// Option Methods
	//
  selectNext: function(event) {
    event.preventDefault();
    var index = 0;
    var selectedOption = this.get('selectedOption');
    if (selectedOption) {
      index = this.get('options').indexOf(selectedOption);
      index = index + 1;
    }
    this.selectOptionAtIndex(index);
  },

  selectPrevious: function(event) {
    event.preventDefault();
    var selectedOption = this.get('selectedOption');
    if (!selectedOption) return;

    var index = this.get('options').indexOf(selectedOption);
    if (this.get('isOpen')) {
      index = index - 1;
    }
    this.selectOptionAtIndex(index);
  },

  selectOnEnter: function(event) {
  	event.preventDefault();
  	var selectedOption = null;

  	if (this.get('selectedOption')) {
  		selectedOption = this.get('selectedOption.content');
  	} else if (this.get('options.length') > 0) {
  		selectedOption = this.get('options.0.content');
  	};

  	if (selectedOption) {
  		this.optionSelected( selectedOption );
  	} else {
  		this.close();
  	};
  },

  selectOptionAtIndex: function(index) {
		var option = this.get('options').objectAt(index);
		if (!option) return;
		this.selectOption(option);
  },

	selectOption: function(option) {
		if (this.get('selectedOption')) {
			this.get('selectedOption').deselect();
		};
		this.set('selectedOption', option)
		option.select()
	},

	optionSelected: function(option) {
		// this.get('currentController').transitionToRoute('location', option.place_name);
		// console.log( this.get('changedLocation') );
		this.set('changedLocation', option)
		this.close();
	},

	registerOption: function(option) {
		this.get('options').pushObject(option);
	},

	removeOption: function(option) {
		if (this.get('selectedOption') === option ) {
			this.set('selectedOption', null);
		};
		this.get('options').removeObject(option);
	}

	// actions: {
	// 	search: function(msg) {
	// 		// console.log( this.get('currentController') );
	// 		// console.log(msg);
	// 		this.get('currentController').transitionToRoute('location', msg);
	// 	}
	// 	// submit: function(event) {
	// 	// 	// console.log(event);
	// 	// 	this.get('currentController');
	// 	// }
	// }
});
