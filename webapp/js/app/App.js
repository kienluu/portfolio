define(
    [
        'jquery.all',
        'underscore',
        'backbone',
        'app/collections/GroupCollection',
        'app/views/TopNavView',
        // No return value modules
        'app/globals'
    ],
    function($, _, Backbone,
        GroupCollection,
        TopNavView) {

        var AppView = Backbone.View.extend({
            el: '#app-body',
            initialize: function() {
                this.groups = new GroupCollection();
                window.groups = this.groups;
                var topNavView = new TopNavView({
                    groups: this.groups
                });
                $('.nav-wrapper').append(topNavView.$el);
                topNavView.on('selectableitem:selected', this.onNavItemSelected)
                this.groups.fetch();
            },
            onNavItemSelected: function(selectedItem) {
                // Change the sidebar here.
                ;
            }
            // TODO: Maybe the app view html & data should be bootstrapped here.
        });
        return AppView;
    }
);