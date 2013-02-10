define([
    'jquery.all',
    'underscore',
    'backbone',
    'handlebars',
    // App
    'app/utilities/OnReadyMixin',
    'app/collections/PageCollection',
    'app/views/PageView',
    'app/views/TopNavView',
    'app/views/SidebarView'
], function ($, _, Backbone, HandleBars
    , OnReadyMixin
    , PageCollection
    , PageView
    , TopNavView
    , SidebarView
    ) {
    return Backbone.Router.extendWithMixin([OnReadyMixin],{
        // The pages slugs must be in here so that they openPage command can be delayed until the page slugs (and content) are ready.  Or page will be missed out when starting the url on that page
        routes: {
            ':pageName': 'openPage'
        },
        initialize: function(options) {
            this.sideView = options.sideView;
            this.contentView = options.contentView;
            this.topNavView = options.topNavView;
            this.pageCollection = options.pageCollection;

            if (this.topNavView.collection.length){
                this.setReady();
            }
            else{
                this.topNavView.collection.on('reset', function() {
                    var self = this;
                    setTimeout(function(){ self.setReady();}, 1);
                }, this);
            }
        },
        openPage: function (pageName) {
            // FIXME: Potential bug, if there is a change in url after this from another function, than this might get called after that change in url.
            this.runWhenReady(function() {
                var itemViewDict = this.topNavView.collectionFindItemViewDictByModelSlug(pageName);
                // Do not update sidebar or display group description of this menu nav is the current active one.
                if (this.topNavView.lastActiveView === itemViewDict.view) return;

                this.topNavView.setActiveView(itemViewDict.view);
                var page = itemViewDict.model;
                this.prevSidebarView = this.sidebarView;
                this.sideView.setView(null);

                var view = new PageView({page: page});
                this.contentView.setView(view);

            });
        }
    });
});