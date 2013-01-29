define([
    'jquery.all',
    'underscore',
    'backbone',
    'handlebars'
], function($, _, Backbone, HandleBars) {
    var SelectableItemParentMixin = {
        getSelectableItemViews: function () {
            throw "Please override this abstract method.";
        },
        onSelectableItemSelected: function(selectedItem) {
            // Make this itemView the selected item and load the sidebar view from it
            var selectableItemViews = this.getSelectableItemViews();
            _.each(selectableItemViews, function(selectableItemView){
                if (selectableItemView !== selectedItem){
                    selectableItemView.isSelected = false;
                }
            }, this);
            // Retrigger event.
            this.trigger('selectableitem:selected', selectedItem);
        }
    };
    return SelectableItemParentMixin;
});