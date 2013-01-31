define(
    [
        'jquery.all',
        'underscore',
        'backbone',
        // App
        'app/collections/GroupCollection',
        'app/views/TopNavView',
        'app/views/SidebarView',
        // No return value modules
        'app/globals'
    ],
    function($, _, Backbone
        , GroupCollection
        , TopNavView
        , SidebarView
        ) {

        var AppView = Backbone.View.extend({
            el: '#app-body',
            initialize: function() {
                this.groups = new GroupCollection();
                window.groups = this.groups;
                var topNavView = new TopNavView({
                    groups: this.groups
                });
                $('.nav-wrapper').append(topNavView.$el);
                topNavView.on('selectableitem:selected', this.onNavItemSelected);
                this.groups.fetch();

                // DEBUG
                this.groups.on('reset', function(){
                    $('.nav-wrapper li').eq(0).click();
                });
            },
            onNavItemSelected: function(selectedItemView) {
                // Change the sidebar here.
                var sidebar = new SidebarView({collection:selectedItemView.group.get('projects')});
                $('.sidebar-wrapper').html('').append(sidebar.$el);
            }
            // TODO: Maybe the app view html & data should be bootstrapped here.
        });
        return AppView;
    }
);