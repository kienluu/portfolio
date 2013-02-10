define([
    'jquery.all',
    'underscore',
    'backbone',
    'handlebars'
], function($, _, Backbone, HandleBars) {
    return {
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
        },
        setActiveView: function(targetView) {
            this.lastActiveView = targetView;
            _.each(this.getSelectableItemViews(), function(view) {
                view.setIsActive(false);
            },this);
            targetView.setIsActive(true);
        }
    };
});