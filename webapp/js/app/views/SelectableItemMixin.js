define([
    'jquery.all',
    'underscore',
    'backbone',
    'handlebars'
], function($, _, Backbone, HandleBars) {
    return {
        isSelected: false,
        onSelectableItemClick: function() {
            if (this.isSelected) return;
            this.isSelected = true;
            this.trigger('selectableitem:selected', this);
        }
    };
});