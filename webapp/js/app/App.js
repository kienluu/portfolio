define(
    [
        'jquery.all',
        'underscore',
        'backbone',
        // App
        'app/routers/GroupRouter',
        // No return value modules
        'app/globals'
    ],
    function($, _, Backbone
        , GroupRouter
        ) {

        return Backbone.View.extend({
            el: '#app-body',
            initialize: function() {
                this.groupRouter = new GroupRouter({
                    $navBox: this.$('.nav-wrapper'),
                    $sidebarBox: this.$('.sidebar-wrapper'),
                    $contentBox: this.$('.content-wrapper')
                });
                Backbone.history.start();

            }
        });
    }
);