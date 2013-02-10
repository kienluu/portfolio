define(
    [
        'jquery.all',
        'underscore',
        'backbone',
        // App
        'app/collections/PageCollection',
        'app/routers/PageRouter',
        'app/collections/GroupCollection',
        'app/routers/GroupRouter',
        'app/views/TransitionView',
        'app/views/transitionViewTransitions',
        'app/views/TopNavView',

        // No return value modules
        'app/globals'
    ],
    function($, _, Backbone
        , PageCollection
        , PageRouter
        , GroupCollection
        , GroupRouter
        , TransitionView
        , transitionViewTransition
        , TopNavView
        ) {

        var createTopNavView = function(pages, groups) {
            var collection = new Backbone.Collection();
            collection.fetch = function() {
                // This class will contain a mixture of model types and has no api endpoint
                throw "Function not supported";
            }
            var topNavView = new TopNavView({
                collection: collection
            });

            var setupWhenReady = function() {
                if (!(pagesReady && groupsReady)){
                    return;
                }
                collection.reset(groups.models.concat([pages.get('contact')]));
            };

            var pagesReady = false, groupsReady = false;
            pages.on('reset', function(){
                pagesReady = true;
                setupWhenReady();
            });
            groups.on('reset', function(){
                groupsReady = true;
                setupWhenReady();
            });

            return topNavView
        };

        return Backbone.View.extend({
            el: '#app-body',
            initialize: function() {
                var contentView = new TransitionView();
                contentView.transitionOut = transitionViewTransition.fadeOut;
                contentView.transitionIn = transitionViewTransition.fadeIn;
                this.$('.content-wrapper').append(contentView.el);
                var sideView = new TransitionView();
                sideView.transitionOut = transitionViewTransition.slideUp;
                sideView.transitionIn = transitionViewTransition.slideDown;
                this.$('.sidebar-wrapper').append(sideView.el);

                var groups = new GroupCollection();
                var pages = new PageCollection();

                var topNavView = createTopNavView(pages, groups);

                pages.fetch();
                groups.fetch();
                this.$('.nav-wrapper').append(topNavView.$el);
                // Backbone pushes routes into the beginning of an array for testing.  The latest pushed routes has priority.  So the PageRouter which takes all routes must go first otherwise other routes will not have a chance.
                this.pageRouter = new PageRouter({
                    sideView: sideView,
                    contentView: contentView,
                    topNavView: topNavView,
                    pageCollection: pages
                });
                this.groupRouter = new GroupRouter({
                    sideView: sideView,
                    contentView: contentView,
                    topNavView: topNavView
                });
                Backbone.history.start();

            }
        });
    }
);