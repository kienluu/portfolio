define(
    [
        'jquery.all',
        'underscore',
        'backbone',
        'app/collections/GroupCollection',
        'app/views/TopNavView'
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
                    groups: this.groups,
                    container: $('.nav-wrapper')
                });
                this.groups.fetch();
            }
            // TODO: Maybe the app view html & data should be bootstrapped here.
        });
        return AppView;
    }
);