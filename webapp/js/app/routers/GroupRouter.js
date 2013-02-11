define([
    'jquery.all',
    'underscore',
    'backbone',
    'handlebars',
    // App
    'app/utilities/OnReadyMixin',
    'app/collections/GroupCollection',
    'app/views/TopNavView',
    'app/views/SidebarView',
    'app/views/GroupView',
    'app/views/ProjectView'
], function ($, _, Backbone, HandleBars
    , OnReadyMixin
    , GroupCollection
    , TopNavView
    , SidebarView
    , GroupView
    , ProjectView
    ) {
    return Backbone.Router.extendWithMixin([OnReadyMixin],{
        routes: {
            'group/:groupname': 'openGroup',
            'group/:groupname/:projectname': 'openProject'
        },
        openGroup: function (groupName, isOpenProjectCall) {
            if (isOpenProjectCall==undefined) isOpenProjectCall = false;
            this.runWhenReady(function() {
                var itemViewDict = this.topNavView.collectionFindItemViewDictByModelSlug(groupName);
                // Do not update sidebar or display group description of this menu nav is the current active one.
                if (this.topNavView.lastActiveView === itemViewDict.view) return;

                this.topNavView.setActiveView(itemViewDict.view);
                var group = itemViewDict.model;
                this.prevSidebarView = this.sidebarView;
                this.sidebarView = new SidebarView({group: group});
                this.sidebarView.on('selectableitem:selected', this.onSidebarItemSelected, this);
                // FIXME: jquery empty remove events.  Will this remove Backbone events?
                this.sideView.setView(this.sidebarView);
                this.trigger('sidebar:created', this.sidebarView);

                // If this root group url then show the project content
                if (isOpenProjectCall) return;

                var view = new GroupView({group: group});
                this.contentView.setView(view);
                this.trigger('pagechange', groupName);
            });
        },
        openProject: function (groupName, projectName) {
            this.runWhenReady(function() {
                this.openGroup(groupName, true);
                var itemViewDict = this.sidebarView.collectionFindItemViewDictByModelSlug(projectName);
                this.sidebarView.setActiveView(itemViewDict.view);
                var project = itemViewDict.model;
                var projectView = new ProjectView({project:project});
                this.contentView.setView(projectView);
                this.trigger('pagechange', _.sprintf('%s/%s', groupName, projectName));
            });
        },
        initialize: function(options) {
            this.$navBox = options.$navBox;
            this.sideView = options.sideView;
            this.contentView = options.contentView;
            this.topNavView = options.topNavView;

            this.topNavView.on('selectableitem:selected', this.onNavItemSelected, this);
            this.topNavView.collection.once('reset', function(){
                this.setReady();
            },this);
        },
        onNavItemSelected: function(selectedItemView) {
            // Change the sidebar here.
//            this.navigate('group/'+selectedItemView.getModel().getSlug(), {trigger:true, replace:true});
        },
        onSidebarItemSelected: function(selectedItemView) {
        }
    });
});