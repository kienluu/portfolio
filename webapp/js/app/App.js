define(
    [
        'jquery.all',
        'underscore',
        'backbone',
        // App
        'app/routers/GroupRouter',
        'app/views/TransitionView',
        'app/views/transitionViewTransitions',
        // No return value modules
        'app/globals'
    ],
    function($, _, Backbone
        , GroupRouter
        , TransitionView
        , transitionViewTransition
        ) {

        return Backbone.View.extend({
            el: '#app-body',
            initialize: function() {
                var contentView = new TransitionView();
                this.$('.content-wrapper').append(contentView.el);
                var sideView = new TransitionView()
                sideView.duration = 1000;
                sideView.transitionOut = transitionViewTransition.slideUp;
                sideView.transitionIn = transitionViewTransition.slideDown;
                this.$('.sidebar-wrapper').append(sideView.el);
                this.groupRouter = new GroupRouter({
                    $navBox: this.$('.nav-wrapper'),
                    sideView: sideView,
                    contentView: contentView
                });
                Backbone.history.start();

            }
        });
    }
);