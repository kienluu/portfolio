define(
    [
        'jquery.all',
        'underscore',
        'backbone',
        // App
        'app/routers/GroupRouter',
        'app/views/TransitionView',
        // No return value modules
        'app/globals'
    ],
    function($, _, Backbone
        , GroupRouter
        , TransitionView
        ) {

        return Backbone.View.extend({
            el: '#app-body',
            initialize: function() {
                var contentView = new TransitionView();
                this.$('.content-wrapper').append(contentView.el);
                this.groupRouter = new GroupRouter({
                    $navBox: this.$('.nav-wrapper'),
                    $sidebarBox: this.$('.sidebar-wrapper'),
                    contentView: contentView
                });
                Backbone.history.start();

            }
        });
    }
);