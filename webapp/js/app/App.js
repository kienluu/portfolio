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
        'app/models/DividerModel',
        'app/views/TransitionView',
        'app/views/transitionViewTransitions',
        'app/views/TopNavView',
        'app/utilities/simpleImageLoader',
        // No return value modules
        'app/globals'
    ],
    function($, _, Backbone
        , PageCollection
        , PageRouter
        , GroupCollection
        , GroupRouter
        , DividerModel
        , TransitionView
        , transitionViewTransition
        , TopNavView
        , simpleImageLoader
        ) {

        var createTopNavView = function(pages, groups) {
            var collection = new Backbone.Collection();
            collection.fetch = function() {
                // This class will contain a mixture of model types and has no api endpoint
                throw "Function not supported";
            };
            var topNavView = new TopNavView({
                collection: collection
            });

            var setupWhenReady = function() {
                if (!(pagesReady && groupsReady)){
                    return;
                }
                var navModels =  groups.models.concat(new DividerModel({appendClass:"last"}), [pages.get('contact')]);
                navModels.unshift(new DividerModel({appendClass:"first"}));
                navModels.unshift(pages.get('index'));
                collection.reset(navModels);
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
                contentView.on('view:added', function(view){
                    simpleImageLoader(view.$el, '<img src="images/ajax-loader.gif">', {margin: '0 217px'});
                }, this);
                this.$('.content-wrapper').append(contentView.el);
                var sideView = new TransitionView();
                sideView.transitionOut = transitionViewTransition.slideUp;
                sideView.transitionIn = transitionViewTransition.slideDown;
                this.$('.sidebar-wrapper').append(sideView.el);

                var groups = new GroupCollection();
                var pages = new PageCollection();

                var topNavView = createTopNavView(pages, groups);
                topNavView.collection.once('reset change', function() {
                    this.$('.content-wrapper').removeClass('hidden');
                    this.$('.sidebar-wrapper').removeClass('hidden');
                    this.$('.loader-box').remove();
                }, this);

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
                this.pageRouter.on('pagechange', this.onRouteChange, this);
                this.groupRouter = new GroupRouter({
                    sideView: sideView,
                    contentView: contentView,
                    topNavView: topNavView
                });
                this.groupRouter.on('pagechange', this.onRouteChange, this);
                Backbone.history.start();
            },
            onRouteChange: function(routeHash) {
                _gaq.push(['_trackPageview', '/' + routeHash]);
            }
        });
    }
);